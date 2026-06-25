# Thin async HTTP client for the ObjectService (https://object.freischule.info).
# Used for internal (server-to-server) calls authenticated via X-API-Key, which is
# never gated by the ObjectService namespace ACL.
import os
from typing import Any, Optional

import httpx


def extract_object_id(doc: dict) -> Optional[str]:
    """Return the ObjectService document id regardless of the field name used."""
    for key in ("_id", "id", "objectId"):
        value = doc.get(key)
        if value:
            return value
    return None


def _extract_list(body: Any) -> list:
    """Normalise list responses across possible envelope shapes."""
    if isinstance(body, list):
        return body
    if isinstance(body, dict):
        for key in ("data", "items", "objects", "results"):
            value = body.get(key)
            if isinstance(value, list):
                return value
    return []


class ObjectServiceClient:
    """Async client. Use as an async context manager so the underlying
    httpx.AsyncClient is reused across the whole migration run."""

    def __init__(
        self,
        base_url: Optional[str] = None,
        api_key: Optional[str] = None,
        timeout: float = 30.0,
    ):
        self.base_url = (
            base_url or os.getenv("OBJECT_SERVICE_URL", "https://object.freischule.info")
        ).rstrip("/")
        self.api_key = api_key or os.getenv("OBJECT_SERVICE_API_KEY", "")
        self.timeout = timeout
        self._client: Optional[httpx.AsyncClient] = None

    async def __aenter__(self) -> "ObjectServiceClient":
        self._client = httpx.AsyncClient(timeout=self.timeout)
        return self

    async def __aexit__(self, *exc) -> None:
        if self._client is not None:
            await self._client.aclose()
            self._client = None

    @property
    def _http(self) -> httpx.AsyncClient:
        if self._client is None:
            raise RuntimeError("ObjectServiceClient must be used as an async context manager")
        return self._client

    def _headers(self) -> dict:
        return {"X-API-Key": self.api_key, "Content-Type": "application/json"}

    async def find_by_self_id(self, collection: str, self_id: str) -> Optional[dict]:
        """Return the existing document for a legacy id (via the wildcard-indexed
        refs.selfId), or None if it has not been migrated yet."""
        resp = await self._http.get(
            f"{self.base_url}/objects/{collection}",
            params={"ref[selfId]": self_id, "limit": 1},
            headers=self._headers(),
        )
        resp.raise_for_status()
        docs = _extract_list(resp.json())
        return docs[0] if docs else None

    async def create(self, collection: str, payload: dict) -> dict:
        resp = await self._http.post(
            f"{self.base_url}/objects/{collection}",
            json=payload,
            headers=self._headers(),
        )
        resp.raise_for_status()
        return resp.json()

    async def replace(self, collection: str, object_id: str, payload: dict) -> dict:
        resp = await self._http.put(
            f"{self.base_url}/objects/{collection}/{object_id}",
            json=payload,
            headers=self._headers(),
        )
        resp.raise_for_status()
        return resp.json()
