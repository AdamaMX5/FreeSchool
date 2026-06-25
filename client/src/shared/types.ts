export type Role =
  | "STUDENT"
  | "TEACHER"
  | "TUTOR"
  | "PROJECTMANAGER"
  | "SCHOOLDIRECTOR"
  | "MODERATOR"
  | "ADMIN";

/** Authenticated user as held in the session store. */
export interface SessionUser {
  id: number;
  email: string;
  accessToken: string;
  roles: Role[];
  permissions: Record<string, unknown>;
}

/** Response shape of AuthService login / register-complete. */
export interface AuthSession {
  id: number;
  email: string;
  roles: Role[];
  access_token: string;
  status: string;
  last_login?: string;
}

export interface JwtPayload {
  sub?: string;
  email?: string;
  roles?: Role[];
  permissions?: Record<string, unknown>;
  exp?: number;
}

/** Category as used by the UI (mapped from an ObjectService document). */
export interface Category {
  id: string;
  name: string;
  background_link: string;
  parents: string[];
  children: string[];
}

export interface Lesson {
  id: string;
  name: string;
  description: string;
  display_order: string;
  position_x: number;
  position_y: number;
}

export interface Content {
  id: string;
  language: string;
  text: string;
  youtube_id: string;
  internal_video: string;
  teacherId?: string;
}
