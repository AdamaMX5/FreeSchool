import { useState } from "react";
import { useAuth } from "../../shared/context/AuthContext";

type Step = "email" | "login" | "register";

// Desktop login: dropdown panel with the email-first flow.
export default function LoginMenu() {
  const { isLoggedIn, user, checkEmail, login, register, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  function reset() {
    setStep("email");
    setError("");
    setInfo("");
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
      setInfo("Erfolgreich eingeloggt!");
      setOpen(false);
    });
  const submitRegister = () =>
    run(async () => {
      await register(email.trim(), password, repassword);
      setInfo("Registriert & eingeloggt.");
      setOpen(false);
    });
  const doLogout = () =>
    run(async () => {
      await logout();
      reset();
    });

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
          {!isLoggedIn ? (
            <>
              <input
                type="email"
                className="rounded border border-neutral-600 bg-neutral-900 px-2 py-2 text-sm"
                placeholder="Email"
                value={email}
                readOnly={step !== "email"}
                onChange={(e) => setEmail(e.target.value)}
              />
              {step !== "email" && (
                <input
                  type="password"
                  className="rounded border border-neutral-600 bg-neutral-900 px-2 py-2 text-sm"
                  placeholder="Passwort"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
              {step === "register" && (
                <input
                  type="password"
                  className="rounded border border-neutral-600 bg-neutral-900 px-2 py-2 text-sm"
                  placeholder="Passwort wiederholen"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                />
              )}
              <button
                className="rounded bg-sky-600 py-2 text-sm font-medium hover:bg-sky-500 disabled:opacity-50"
                disabled={busy}
                onClick={step === "email" ? submitEmail : step === "login" ? submitLogin : submitRegister}
              >
                {step === "email" ? "Weiter" : step === "login" ? "Anmelden" : "Registrieren"}
              </button>
            </>
          ) : (
            <>
              <div className="text-sm">Angemeldet als: {user.email}</div>
              <button
                className="rounded bg-sky-600 py-2 text-sm font-medium hover:bg-sky-500 disabled:opacity-50"
                disabled={busy}
                onClick={doLogout}
              >
                Abmelden
              </button>
            </>
          )}
          {error && <div className="whitespace-pre-line text-sm text-red-400">{error}</div>}
          {info && <div className="text-sm text-green-400">{info}</div>}
        </div>
      )}
    </div>
  );
}
