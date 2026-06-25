import { useState } from "react";
import { useLoginFlow } from "../../shared/hooks/useLoginFlow";

// Desktop login: dropdown panel. Behaviour comes from the shared useLoginFlow hook;
// this file only owns the desktop markup.
export default function LoginMenu() {
  const f = useLoginFlow();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="rounded px-3 py-1 text-xl hover:bg-neutral-700"
        onClick={() => setOpen((o) => !o)}
        aria-label="Login"
      >
        👤
      </button>

      {open && (
        <div className="absolute right-0 top-11 flex w-72 flex-col gap-2 rounded border border-neutral-700 bg-neutral-800 p-4 shadow-xl">
          {!f.isLoggedIn ? (
            <>
              <input
                type="email"
                className="rounded border border-neutral-600 bg-neutral-900 px-2 py-2 text-sm"
                placeholder="Email"
                value={f.email}
                readOnly={f.step !== "email"}
                onChange={(e) => f.setEmail(e.target.value)}
              />
              {f.step !== "email" && (
                <input
                  type="password"
                  className="rounded border border-neutral-600 bg-neutral-900 px-2 py-2 text-sm"
                  placeholder="Passwort"
                  value={f.password}
                  onChange={(e) => f.setPassword(e.target.value)}
                />
              )}
              {f.step === "register" && (
                <input
                  type="password"
                  className="rounded border border-neutral-600 bg-neutral-900 px-2 py-2 text-sm"
                  placeholder="Passwort wiederholen"
                  value={f.repassword}
                  onChange={(e) => f.setRepassword(e.target.value)}
                />
              )}
              <button
                className="rounded bg-sky-600 py-2 text-sm font-medium hover:bg-sky-500 disabled:opacity-50"
                disabled={f.busy}
                onClick={f.submit}
              >
                {f.submitLabel}
              </button>
            </>
          ) : (
            <>
              <div className="text-sm">Angemeldet als: {f.user.email}</div>
              <button
                className="rounded bg-sky-600 py-2 text-sm font-medium hover:bg-sky-500 disabled:opacity-50"
                disabled={f.busy}
                onClick={f.doLogout}
              >
                Abmelden
              </button>
            </>
          )}
          {f.error && <div className="whitespace-pre-line text-sm text-red-400">{f.error}</div>}
          {f.info && <div className="text-sm text-green-400">{f.info}</div>}
        </div>
      )}
    </div>
  );
}
