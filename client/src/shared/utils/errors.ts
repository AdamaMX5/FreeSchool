// Normalise an unknown thrown value to a human-readable message.
export function errMessage(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}
