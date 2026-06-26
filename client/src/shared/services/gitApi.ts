// GitService client (https://git.freischule.info). Lets logged-in users file an
// improvement issue from the category toolbar. Uses the JWT-authenticated frontend
// endpoints; the creator e-mail is taken from the JWT server-side for notifications.
import { GIT_BASE_URL } from "../config";
import { authFetch } from "./authFetch";

export interface GitRepo {
  name: string;
  fullName: string;
  url: string;
}

export interface CreatedIssue {
  number: number;
  url: string;
}

/** List all repositories of the configured git provider. */
export async function listRepos(): Promise<GitRepo[]> {
  const res = await authFetch(`${GIT_BASE_URL}/repos`);
  if (!res.ok) throw new Error(`GitService ${res.status}`);
  const body = await res.json();
  return Array.isArray(body) ? (body as GitRepo[]) : [];
}

/**
 * Create a new issue. `repo` must be a valid repo name (GitService validates
 * /^[a-zA-Z0-9_.-]{1,100}$/ and caps body at 64 KiB). Title and body are required.
 */
export async function createIssue(
  repo: string,
  title: string,
  body: string,
  labels?: string[]
): Promise<CreatedIssue> {
  const res = await authFetch(`${GIT_BASE_URL}/issue`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ repo, title, body, labels }),
  });
  if (!res.ok) throw new Error(`GitService ${res.status}`);
  return (await res.json()) as CreatedIssue;
}
