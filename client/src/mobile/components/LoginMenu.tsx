import { useEffect, useState } from "react";
import { useLoginFlow } from "../../shared/hooks/useLoginFlow";

// Mobile login: full-width bottom sheet. Behaviour from the shared useLoginFlow hook;
// this file only owns the mobile markup.
export default function LoginSheet() {
  const f = useLoginFlow();
  const [open, setOpen] = useState(false);

  // Close the sheet once a login/registration succeeds.
  useEffect(() => {
    if (f.isLoggedIn) setOpen(false);
  }, [f.isLoggedIn]);

  return (
    <>
      <button className="px-2 text-2xl" onClick={() => setOpen(true)} aria-label="Login">
        👤
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex flex-col justify-end bg-black/50"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex flex-col gap-3 rounded-t-2xl bg-neutral-800 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-1 h-1 w-10 rounded-full bg-neutral-600" />
            {!f.isLoggedIn ? (
              <>
                <input
                  type="email"
                  className="rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-3 text-base"
                  placeholder="Email"
                  value={f.email}
                  readOnly={f.step !== "email"}
                  onChange={(e) => f.setEmail(e.target.value)}
                />
                {f.step !== "email" && (
                  <input
                    type="password"
                    className="rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-3 text-base"
                    placeholder="Passwort"
                    value={f.password}
                    onChange={(e) => f.setPassword(e.target.value)}
                  />
                )}
                {f.step === "register" && (
                  <input
                    type="password"
                    className="rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-3 text-base"
                    placeholder="Passwort wiederholen"
                    value={f.repassword}
                    onChange={(e) => f.setRepassword(e.target.value)}
                  />
                )}
                <button
                  className="rounded-lg bg-sky-600 py-3 text-base font-medium active:bg-sky-500 disabled:opacity-50"
                  disabled={f.busy}
                  onClick={f.submit}
                >
                  {f.submitLabel}
                </button>
              </>
            ) : (
              <>
                <div className="text-base">Angemeldet als: {f.user.email}</div>
                <button
                  className="rounded-lg bg-sky-600 py-3 text-base font-medium active:bg-sky-500 disabled:opacity-50"
                  disabled={f.busy}
                  onClick={f.doLogout}
                >
                  Abmelden
                </button>
              </>
            )}
            {f.error && <div className="whitespace-pre-line text-sm text-red-400">{f.error}</div>}
          </div>
        </div>
      )}
    </>
  );
}
