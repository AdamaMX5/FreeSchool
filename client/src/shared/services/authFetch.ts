// fetch wrapper that attaches the bearer access token and transparently refreshes
// it once on a 401 before retrying. URL-agnostic: works for any microservice that
// trusts the AuthService-issued RS256 JWT.
import { getAccessToken, clearSession } from "./session";
import { refresh, applyToken } from "./authApi";

export async function authFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const build = (token: string): RequestInit => ({
    ...init,
    headers: token
      ? { ...(init.headers ?? {}), Authorization: `Bearer ${token}` }
      : { ...(init.headers ?? {}) },
  });

  let res = await fetch(input, build(getAccessToken()));
  if (res.status !== 401) return res;

  const newToken = await refresh();
  if (!newToken) {
    clearSession();
    return res;
  }
  applyToken(newToken);
  res = await fetch(input, build(getAccessToken()));
  return res;
}
