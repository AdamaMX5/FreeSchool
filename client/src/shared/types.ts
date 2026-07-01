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

/**
 * Full user object as returned by AuthService GET /admin/users (admin user management).
 * Only the fields the UI renders are typed; the untouched server object is kept in `raw`
 * so the client-side JSON export mirrors AuthService 1:1.
 */
export interface AdminUser {
  id: number;
  email: string;
  roles: Role[];
  permissions: Record<string, unknown>;
  is_email_verify: boolean;
  last_login: string | null;
  raw: Record<string, unknown>;
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
  /** ObjectService document _id — needed to PATCH the category. */
  docId: string;
  /** Legacy id used as the foreign key in refs.selfId / parents / children. */
  id: string;
  name: string;
  background_link: string;
  parents: string[];
  children: string[];
}

export interface Lesson {
  /** ObjectService document _id — needed to PATCH the lesson (e.g. position). */
  docId: string;
  id: string;
  name: string;
  description: string;
  display_order: string;
  /** Pixel coordinates on the *original* (unscaled) category background image. */
  position_x: number;
  position_y: number;
}

export interface Content {
  /** ObjectService document _id — needed to PATCH/DELETE the content. */
  docId: string;
  id: string;
  /** The lesson this content belongs to (refs.lessonId, scalar = single lesson). */
  lessonId: string;
  language: string;
  text: string;
  youtube_id: string;
  internal_video: string;
  teacherId?: string;
}
