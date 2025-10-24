<script>
  import { onMount } from 'svelte';
  import { user, setUser, unsetUser } from '../lib/global';
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
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

  let step = $state('login'); // login | register
  let emailInput = $state(null);
  let passwordInput = $state(null);
  let passwordRepeatInput = $state(null);
  let loginButton = $state(null);
  let errorMessage = $state('');
  let infoMessage = $state('');

  let id = $state(0);
  let email = $state("");
  let jwt = $state("");
  let roles = $state([]);

  onMount(() => {
    id = Number(localStorage.getItem('user.id')) ?? 0;
    email = localStorage.getItem('user.email') ?? '';
    jwt = localStorage.getItem('user.jwt') ?? '';
    roles = [];
    const storedRoles = localStorage.getItem('user.roles');
    const parsedRoles = storedRoles ? JSON.parse(storedRoles) : [];

    // JWT prüfen
      if (jwt) {
        try {
          const payloadBase64 = jwt.split('.')[1];
          const payload = JSON.parse(atob(payloadBase64));

          const now = Math.floor(Date.now() / 1000); // aktuelle Zeit in Sekunden
          if (payload.exp && payload.exp < now) {
            // Token ist abgelaufen
            jwt = "";
            localStorage.removeItem('user.jwt');
          }else{ 
            roles = parsedRoles;
          }
        } catch (e) {
          // Ungültiger Token, lieber entfernen
          jwt = "";
          localStorage.removeItem('user.jwt');
        }
      }

      // Path aus localStorage holen
      if (currentPath != null && currentPath.length === 0) {
        const savedPath = localStorage.getItem('user.path');
        if (savedPath) {
          try {
            const parsedPath = JSON.parse(savedPath);
            if (Array.isArray(parsedPath) && parsedPath.length > 0) {
              onNavigate(parsedPath);
            }
          } catch (e) {
            console.warn("Fehler beim Parsen des gespeicherten Pfads:", e);
          }
        }
      }
      pathLoaded = true; // Pfad wurde initial geladen

      if(jwt && jwt.trim() !== '') setUser(id, email, jwt, roles);

  });

  function handleLoginClick() {
    showLogin = !showLogin;
    errorMessage = '';
    infoMessage = '';
    step = 'login';
  }

  function handleMenuToggle() {
    onToggleMenu();
  }

  async function submitLogin() {
    loginButton.disabled = true; // Button deaktivieren
    errorMessage = '';
    infoMessage = '';
    // Werte aus den HTML-Inputs holen
    
    email = emailInput.value;
    
    try {
      const res = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: passwordInput.value
        })
      });

      const data = await res.json();

      if (!res.ok) {
        const details = Array.isArray(data.detail)
        ? data.detail.map(d => d.msg).join(', ')
        : data.detail;

        throw new Error('Login fehlgeschlagen<br>' + details);
      }
      if (data.status === 'login' || data.status === 'login_with_verify_email_sended') {
        infoMessage = 'Erfolgreich eingeloggt!';
        if(data.status === 'login_with_verify_email_sended')
          infoMessage += '<br>Verifikationsemail versendet';
        id = data.id;
        email = data.email;
        jwt = data.jwt;
        roles = data.roles;
        if(jwt && jwt.trim() !== '') setUser(id, email, jwt, roles);
        localStorage.setItem('user.id', data.id);
        localStorage.setItem('user.email', data.email);
        localStorage.setItem('user.jwt', data.jwt);
        localStorage.setItem('user.roles', JSON.stringify(data.roles ?? []));
      } else if (data.status === 'register') {
        infoMessage = 'Benutzer registriert. Bitte Passwort erneut eingeben zur Bestätigung.';
        id = data.id;
        step = 'register';
      }
    } catch (err) {
      errorMessage = err.message;
    }
    loginButton.disabled = false; // Button aktivieren
  }

  async function submitRegister() {
    loginButton.disabled = true; // Button deaktivieren
    errorMessage = '';
    infoMessage = '';
    // Werte aus den HTML-Inputs holen
    try {
      const res = await fetch(`${API_BASE_URL}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: id,
          repassword: passwordRepeatInput.value
        })
      });

      const data = await res.json();

      if (!res.ok) {
        const details = Array.isArray(data.detail)
        ? data.detail.map(d => d.msg).join(', ')
        : data.detail;

        throw new Error('Registrierung fehlgeschlagen<br>' + details);
      }

      infoMessage = 'Verifizierungs-E-Mail wurde gesendet. Du bist eingeloggt.';
      localStorage.setItem('user.id', data.id);
      localStorage.setItem('user.jwt', data.jwt);
      
      id = data.id;
      jwt = data.jwt;
      email = data.email;
      roles = data.roles;

      if(jwt && jwt.trim() !== '') setUser(id, email, jwt, roles);
    } catch (err) {
      errorMessage = err.message;
    }
    loginButton.disabled = false; // Button aktivieren
  }

  async function submitLogout() {
    loginButton.disabled = true; // Button deaktivieren
    errorMessage = '';
    infoMessage = '';
    try {
      const res = await fetch(`${API_BASE_URL}/user/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }
      });

      const data = await res.json();

      if (!res.ok) {
        const details = Array.isArray(data.detail)
        ? data.detail.map(d => d.msg).join(', ')
        : data.detail;

        clearUser();
        onHomeButton([]);
        throw new Error('Abmeldung fehlgeschlagen<br>' + details);
      }else{
        infoMessage = 'Erfolgreich abgemeldet!';
        clearUser();
        onHomeButton([]);
      }
    } catch (err) {
      errorMessage = err.message;
    }
    loginButton.disabled = false; // Button aktivieren
  }

  function clearUser(){
    id = 0;
    email = '';
    jwt = '';
    roles = [];
    unsetUser();
    localStorage.removeItem('user.jwt');
    localStorage.removeItem('user.id');
    localStorage.removeItem('user.email');
    localStorage.removeItem('user.roles');
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
        <input type="email" bind:this={emailInput} value={email} placeholder="Email" />
        <input type="password" bind:this={passwordInput} value="" placeholder="Passwort" />

        {#if step === 'register'}
          <input type="password" bind:this={passwordRepeatInput} value="" placeholder="Passwort wiederholen" />
        {/if}

        {#if step === 'login'}
          <button onclick={submitLogin} bind:this={loginButton}>Anmelden / Registrieren</button>
        {:else if step === 'register'}
          <button onclick={submitRegister} bind:this={loginButton}>Registrieren abschließen</button>
        {/if}
      {:else}
        <div class="login-info">Angemeldet als: {email} [später Name aus dem Profil]</div>
        <button onclick={submitLogout} bind:this={loginButton}>Abmelden</button>
      {/if}
      {#if errorMessage}
        <div class="error-message">{@html errorMessage}</div>
      {/if}
      {#if infoMessage}
        <div class="info-message">{@html infoMessage}</div>
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
  }

  .info-message {
    color: #72d572;
    font-size: 14px;
  }

  .login-info {
    color: #fff;
    font-size: 14px;
  }
</style>