<script>
  import { onMount } from 'svelte';
  import { user } from '../lib/global';
  import {
    checkEmail,
    login,
    registerComplete,
    logout,
    ensureValidToken,
    applySession,
    clearSession,
    isExpired
  } from '../lib/authApi';

  export const Roles = Object.freeze({
    STUDENT: 'STUDENT',
    TEACHER: 'TEACHER',
    TUTOR: 'TUTOR',
    PROJECTMANAGER: 'PROJECTMANAGER',
    SCHOOLDIRECTOR: 'SCHOOLDIRECTOR',
    MODERATOR: 'MODERATOR',
    ADMIN: 'ADMIN'
  });

  let {
    currentPath,
    onNavigate = () => {},
    onToggleMenu = () => {}
  } = $props();

  let pathLoaded = false;
  let showLogin = $state(false);

  // Email-first flow: 'email' -> ('login' | 'register')
  let step = $state('email');
  let emailInput = $state(null);
  let passwordInput = $state(null);
  let passwordRepeatInput = $state(null);
  let loginButton = $state(null);
  let errorMessage = $state('');
  let infoMessage = $state('');

  // Email currently being authenticated (preserved across the flow steps).
  let pendingEmail = $state('');

  // Mirror the auth store into local state so the template reacts to login/refresh/logout.
  let email = $state('');
  let jwt = $state('');
  user.subscribe((value) => {
    email = value.email;
    jwt = value.jwt;
  });

  onMount(async () => {
    // Restore a still-valid session from localStorage; otherwise try a silent refresh.
    const storedId = Number(localStorage.getItem('user.id')) || 0;
    const storedEmail = localStorage.getItem('user.email') ?? '';
    const storedJwt = localStorage.getItem('user.jwt') ?? '';
    const storedRolesRaw = localStorage.getItem('user.roles');
    const storedRoles = storedRolesRaw ? JSON.parse(storedRolesRaw) : [];

    pendingEmail = storedEmail;

    if (storedJwt && !isExpired(storedJwt)) {
      // Re-use the persisted session and let the store mirror it.
      applySession({
        id: storedId,
        email: storedEmail,
        roles: storedRoles,
        access_token: storedJwt,
        status: 'login'
      });
    }

    // If the stored token is missing/expired, this refreshes via the HttpOnly cookie.
    await ensureValidToken();

    // Restore the saved navigation path.
    if (currentPath != null && currentPath.length === 0) {
      const savedPath = localStorage.getItem('user.path');
      if (savedPath) {
        try {
          const parsedPath = JSON.parse(savedPath);
          if (Array.isArray(parsedPath) && parsedPath.length > 0) {
            onNavigate(parsedPath);
          }
        } catch (e) {
          console.warn('Fehler beim Parsen des gespeicherten Pfads:', e);
        }
      }
    }
    pathLoaded = true;
  });

  function handleLoginClick() {
    showLogin = !showLogin;
    errorMessage = '';
    infoMessage = '';
    step = 'email';
  }

  function handleMenuToggle() {
    onToggleMenu();
  }

  // Step 1: decide whether this email logs in or registers.
  async function submitEmail() {
    loginButton.disabled = true;
    errorMessage = '';
    infoMessage = '';
    try {
      pendingEmail = emailInput.value.trim();
      const status = await checkEmail(pendingEmail);
      step = status === 'register' ? 'register' : 'login';
    } catch (err) {
      errorMessage = 'Prüfung fehlgeschlagen\n' + err.message;
    }
    loginButton.disabled = false;
  }

  // Step 2a: existing user -> login.
  async function submitLogin() {
    loginButton.disabled = true;
    errorMessage = '';
    infoMessage = '';
    try {
      const session = await login(pendingEmail, passwordInput.value);
      if (session.status === 'login' || session.status === 'login_with_verify_email_send') {
        applySession(session);
        infoMessage = 'Erfolgreich eingeloggt!';
        if (session.status === 'login_with_verify_email_send') {
          infoMessage += '\nVerifikationsemail versendet';
        }
      } else if (session.status === 'register') {
        step = 'register';
        infoMessage = 'Bitte Passwort zur Registrierung bestätigen.';
      }
    } catch (err) {
      errorMessage = 'Login fehlgeschlagen\n' + err.message;
    }
    loginButton.disabled = false;
  }

  // Step 2b: new user -> register-complete.
  async function submitRegister() {
    loginButton.disabled = true;
    errorMessage = '';
    infoMessage = '';
    try {
      const session = await registerComplete(
        pendingEmail,
        passwordInput.value,
        passwordRepeatInput.value
      );
      applySession(session);
      infoMessage = 'Registrierung abgeschlossen. Du bist eingeloggt.';
    } catch (err) {
      errorMessage = 'Registrierung fehlgeschlagen\n' + err.message;
    }
    loginButton.disabled = false;
  }

  async function submitLogout() {
    loginButton.disabled = true;
    errorMessage = '';
    infoMessage = '';
    try {
      await logout();
      infoMessage = 'Erfolgreich abgemeldet!';
    } catch (err) {
      errorMessage = 'Abmeldung fehlgeschlagen\n' + err.message;
    } finally {
      clearSession();
      step = 'email';
      onHomeButton([]);
      loginButton.disabled = false;
    }
  }

  $effect(() => {
    if (!pathLoaded) return;

    if (currentPath.length === 0) {
      const savedPath = JSON.parse(localStorage.getItem('user.path'));
      if (savedPath && savedPath.length > 0) {
        onNavigate(savedPath);
      }
    } else {
      localStorage.setItem('user.path', JSON.stringify(currentPath));
    }
  });

  function onHomeButton(path) {
    localStorage.setItem('user.path', JSON.stringify(path));
    onNavigate(path);
  }
</script>

<nav class="navigation-bar">
  <!-- Menü-Toggle-Button -->
  <div class="menu-toggle-area">
    <button class="menu-toggle-button" onclick={handleMenuToggle}>
      ☰
    </button>
  </div>

  <!-- Breadcrumb-Navigation -->
  <div class="breadcrumbs">
      <button class="home-button" onclick={() => onHomeButton([])}>🏠</button>
      {#each currentPath as category, index}
        {#if category}
          <span class="breadcrumb-separator">&gt;</span>
          {#if index < currentPath.length - 1}
            <button
              class="breadcrumb"
              onclick={() => onNavigate(currentPath.slice(0, index + 1))}>
              {category.name}
            </button>
          {:else}
            <span class="current-category">{category.name}</span>
          {/if}
        {/if}
      {/each}
  </div>

  <!-- Login-Bereich -->
  <div class="login-area">
    <button class="login-icon" onclick={handleLoginClick}>
        👤
    </button>


    <div class="login-dropdown" class:visible={showLogin}>
      {#if !jwt || jwt.trim() === ''}
        <input type="email" bind:this={emailInput} value={pendingEmail} placeholder="Email" readonly={step !== 'email'} />

        {#if step !== 'email'}
          <input type="password" bind:this={passwordInput} value="" placeholder="Passwort" />
        {/if}
        {#if step === 'register'}
          <input type="password" bind:this={passwordRepeatInput} value="" placeholder="Passwort wiederholen" />
        {/if}

        {#if step === 'email'}
          <button onclick={submitEmail} bind:this={loginButton}>Weiter</button>
        {:else if step === 'login'}
          <button onclick={submitLogin} bind:this={loginButton}>Anmelden</button>
        {:else if step === 'register'}
          <button onclick={submitRegister} bind:this={loginButton}>Registrieren</button>
        {/if}
      {:else}
        <div class="login-info">Angemeldet als: {email} [später Name aus dem Profil]</div>
        <button onclick={submitLogout} bind:this={loginButton}>Abmelden</button>
      {/if}
      {#if errorMessage}
        <div class="error-message">{errorMessage}</div>
      {/if}
      {#if infoMessage}
        <div class="info-message">{infoMessage}</div>
      {/if}
    </div>

  </div>
</nav>

<style>
  .navigation-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #252526;
    display: flex;
    align-items: center;
    padding: 0 20px;
    z-index: 1000;
    border-bottom: 1px solid #333;
    gap: 15px; /* Abstand zwischen den Elementen */
  }

  .menu-toggle-area {
    display: flex;
    align-items: center;
    flex-shrink: 0; /* Verhindert, dass der Button schrumpft */
  }

  .menu-toggle-button {
    background: none;
    border: none;
    color: #ddd;
    font-size: 20px;
    cursor: pointer;
    padding: 5px 10px;
  }

  .menu-toggle-button:hover {
    color: #fff;
    background-color: #333;
    border-radius: 3px;
  }

  .breadcrumbs {
    display: flex;
    align-items: center;
    color: #ddd;
    flex-grow: 1; /* Nimmt den verfügbaren Platz ein */
    min-width: 0; /* Erlaubt das Schrumpfen bei Bedarf */
  }

  .home-button, .breadcrumb {
    background: none;
    border: none;
    color: #ddd;
    cursor: pointer;
    padding: 5px 10px;
    font-size: 14px;
    white-space: nowrap; /* Verhindert Zeilenumbrüche */
  }

  .home-button:hover, .breadcrumb:hover {
    color: #fff;
    text-decoration: underline;
  }

  .breadcrumb-separator {
    margin: 0 5px;
    color: #666;
    flex-shrink: 0; /* Verhindert, dass die Trennzeichen schrumpfen */
  }

  .current-category {
    padding: 5px 10px;
    color: #fff;
    font-weight: bold;
    white-space: nowrap; /* Verhindert Zeilenumbrüche */
  }

  .login-area {
    position: relative;
    flex-shrink: 0; /* Verhindert, dass der Login-Bereich schrumpft */
  }

  .login-icon {
    background: none;
    border: none;
    color: #ddd;
    font-size: 20px;
    cursor: pointer;
    padding: 5px;
  }

  .login-dropdown {
    position: absolute;
    right: 0;
    top: 40px;
    background: #252526;
    padding: 15px;
    border: 1px solid #333;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 250px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
  }

  .login-dropdown.visible {
    opacity: 1;
    visibility: visible;
  }

  .login-dropdown input {
    padding: 8px;
    background: #1e1e1e;
    border: 1px solid #333;
    color: #fff;
    border-radius: 3px;
  }

  .login-dropdown button {
    padding: 8px;
    background: #007acc;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  .error-message {
    color: #ff6b6b;
    font-size: 14px;
    white-space: pre-line; /* render \n as line breaks without @html */
  }

  .info-message {
    color: #72d572;
    font-size: 14px;
    white-space: pre-line;
  }

  .login-info {
    color: #fff;
    font-size: 14px;
  }
</style>
