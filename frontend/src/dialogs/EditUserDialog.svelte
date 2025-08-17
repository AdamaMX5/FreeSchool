<script lang="ts">
  import Dialog from './Dialog.svelte';
  import { user } from '../lib/global';

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  let {
    userEdit = null,
    onsuccess = () => {},
    oncancel = () => {},
    onerror = () => {}
  } = $props();

  // Verfügbare Rollen
  const availableRoles = ['STUDENT', 'MODERATOR', 'ADMIN'];
  
  let roles = $state([...userEdit.roles]);
  let error = $state("");

  function close() {
    oncancel();
  }

  function toggleRole(role) {
    if (roles.includes(role)) {
      roles = roles.filter(r => r !== role);
    } else {
      roles = [...roles, role];
    }
  }

  async function submit() {
    try {
      const headers = { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${$user.jwt}`
      };
      
      // Nur Rollen aktualisieren
      const payload = {
        roles: roles
      };

      const res = await fetch(`${API_BASE_URL}/user/${userEdit.id}/roles`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Fehler beim Aktualisieren");
      }

      onsuccess();
    } catch (e) {
      error = e.message;
    }
  }
</script>

<Dialog onclose={close}>
  <h2>Benutzer bearbeiten</h2>

  <div class="form-grid">
    <label>ID:</label>
    <input type="text" value={userEdit?.id} readonly />

    <label>Email:</label>
    <input type="text" value={userEdit?.email} readonly />

    <label>Rollen:</label>
    <div class="roles-container">
      {#each availableRoles as role}
        <label class="role-checkbox">
          <input 
            type="checkbox" 
            checked={roles.includes(role)}
            onchange={() => toggleRole(role)}
          />
          {role}
        </label>
      {/each}
    </div>
  </div>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <div class="actions">
    <button onclick={submit}>Speichern</button>
    <button onclick={close}>Abbrechen</button>
  </div>
</Dialog>

<style>
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 0.5rem 1rem;
    align-items: center;
    margin-bottom: 1rem;
  }

  label {
    font-weight: bold;
    text-align: right;
    padding-right: 0.5rem;
  }

  input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    background-color: #3a3a3a;
    color: white;
    border: 1px solid #555;
    border-radius: 4px;
  }

  .roles-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .role-checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #4a4a4a;
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
  }

  .error {
    color: #ff6b6b;
    margin: 1rem 0;
  }
</style>
