// fetch wrapper that attaches the bearer access token and transparently refreshes
// it once on a 401 before retrying. URL-agnostic: works for any microservice that
// trusts the AuthService-issued RS256 JWT.
import { getAccessToken, clearSession } from "./session";
import { refresh, applyToken, isExpired } from "./authApi";

export async function authFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const build = (token: string): RequestInit => ({
    ...init,
    headers: token
      ? { ...(init.headers ?? {}), Authorization: `Bearer ${token}` }
      : { ...(init.headers ?? {}) },
  });

  let token = getAccessToken();

  // Proactive refresh: the 15-min access token expires while the tab stays open,
  // so a stored-but-expired token would otherwise guarantee a 401 on the next
  // request (e.g. adding content). Refresh up front instead of failing first.
  if (token && isExpired(token)) {
    const refreshed = await refresh();
    if (refreshed) {
      applyToken(refreshed);
      token = getAccessToken();
    }
  }

  let res = await fetch(input, build(token));
  if (res.status !== 401) return res;

  // Reactive fallback: an unexpected 401 (e.g. token revoked) – refresh once and retry.
  const newToken = await refresh();
  if (!newToken) {
    clearSession();
    return res;
  }
  applyToken(newToken);
  res = await fetch(input, build(getAccessToken()));
  return res;
}
