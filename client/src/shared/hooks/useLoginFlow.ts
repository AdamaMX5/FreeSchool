// Behaviour of the email-first login flow, shared by the (visually separate)
// desktop and mobile login components. Keeps verhalten decoupled from darstellung.
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export type LoginStep = "email" | "login" | "register";

export function useLoginFlow() {
  const { isLoggedIn, isAdmin, user, checkEmail, login, register, logout } = useAuth();
  const [step, setStep] = useState<LoginStep>("email");
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

  // Advances the flow: email -> (login | register), then authenticates.
  function submit() {
    if (step === "email") {
      return run(async () => {
        const status = await checkEmail(email.trim());
        setStep(status === "register" ? "register" : "login");
      });
    }
    if (step === "login") {
      return run(async () => {
        await login(email.trim(), password);
        setInfo("Erfolgreich eingeloggt!");
      });
    }
    return run(async () => {
      await register(email.trim(), password, repassword);
      setInfo("Registriert & eingeloggt.");
    });
  }

  function doLogout() {
    return run(async () => {
      await logout();
      reset();
    });
  }

  const submitLabel = step === "email" ? "Weiter" : step === "login" ? "Anmelden" : "Registrieren";

  return {
    isLoggedIn,
    isAdmin,
    user,
    step,
    email,
    setEmail,
    password,
    setPassword,
    repassword,
    setRepassword,
    error,
    info,
    busy,
    submitLabel,
    submit,
    doLogout,
    reset,
  };
}
