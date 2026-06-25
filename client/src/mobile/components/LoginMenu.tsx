import { useState } from "react";
import { useAuth } from "../../shared/context/AuthContext";

type Step = "email" | "login" | "register";

// Mobile login: full-width bottom sheet with the email-first flow.
export default function LoginSheet() {
  const { isLoggedIn, user, checkEmail, login, register, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function reset() {
    setStep("email");
    setError("");
    setPassword("");
    setRepassword("");
  }

  async function run(fn: () => Promise<void>) {
    setBusy(true);
    setError("");
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  const submitEmail = () =>
    run(async () => {
      const status = await checkEmail(email.trim());
      setStep(status === "register" ? "register" : "login");
    });
  const submitLogin = () =>
    run(async () => {
      await login(email.trim(), password);
      setOpen(false);
    });
  const submitRegister = () =>
    run(async () => {
      await register(email.trim(), password, repassword);
      setOpen(false);
    });
  const doLogout = () =>
    run(async () => {
      await logout();
      reset();
    });

  return (
    <>
      <button className="px-2 text-2xl" onClick={() => setOpen(true)} aria-label="Login">
        👤
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end bg-black/50" onClick={() => setOpen(false)}>
          <div
            className="flex flex-col gap-3 rounded-t-2xl bg-neutral-800 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-1 h-1 w-10 rounded-full bg-neutral-600" />
            {!isLoggedIn ? (
              <>
                <input
                  type="email"
                  className="rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-3 text-base"
                  placeholder="Email"
                  value={email}
                  readOnly={step !== "email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {step !== "email" && (
                  <input
                    type="password"
                    className="rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-3 text-base"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                )}
                {step === "register" && (
                  <input
                    type="password"
                    className="rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-3 text-base"
                    placeholder="Passwort wiederholen"
                    value={repassword}
                    onChange={(e) => setRepassword(e.target.value)}
                  />
                )}
                <button
                  className="rounded-lg bg-sky-600 py-3 text-base font-medium active:bg-sky-500 disabled:opacity-50"
                  disabled={busy}
                  onClick={step === "email" ? submitEmail : step === "login" ? submitLogin : submitRegister}
                >
                  {step === "email" ? "Weiter" : step === "login" ? "Anmelden" : "Registrieren"}
                </button>
              </>
            ) : (
              <>
                <div className="text-base">Angemeldet als: {user.email}</div>
                <button
                  className="rounded-lg bg-sky-600 py-3 text-base font-medium active:bg-sky-500 disabled:opacity-50"
                  disabled={busy}
                  onClick={doLogout}
                >
                  Abmelden
                </button>
              </>
            )}
            {error && <div className="whitespace-pre-line text-sm text-red-400">{error}</div>}
          </div>
        </div>
      )}
    </>
  );
}
