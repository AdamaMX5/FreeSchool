<script lang="ts">
  import { X } from "lucide-svelte";
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import { user } from "../lib/global";
  import EditUserDialog from '../dialogs/EditUserDialog.svelte';

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const dispatch = createEventDispatcher();

  let users = [];
  let error = null;
  let showEditDialog = false;
  let selectedUser = null;

  function close() {
    dispatch("close");
  }

  async function fetchUsers() {
    try {
      const headers = {};
      if ($user?.jwt) {
        headers['Authorization'] = `Bearer ${$user.jwt}`;
      }

      const response = await fetch(`${API_BASE_URL}/user/all/`, { headers });
      if (!response.ok) throw new Error("Fehler beim Laden der Benutzer");
      users = await response.json();
      error = null;
    } catch (err) {
      error = err.message;
    }
  }

  function openEditDialog(user) {
    selectedUser = user;
    showEditDialog = true;
  }

  function handleUserUpdated() {
    showEditDialog = false;
    fetchUsers();
  }

  onMount(async () => {
    await fetchUsers();
  });
</script>

<div class="admin-view">
  <button on:click={close} title="Zurück zur normalen Ansicht">
    <X size="20" />
  </button>
  <h2>👑 Admin-Ansicht</h2>

  <div class="users-list">
    <h3>Benutzerverwaltung</h3>

    {#if error}
      <div class="error">{error}</div>
    {/if}

    {#if users.length === 0}
      <p>Keine Benutzer gefunden.</p>
    {:else}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Rollen</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {#each users as user}
            <tr>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.roles.join(', ')}</td>
              <td>
                <button on:click={() => openEditDialog(user)}>Bearbeiten</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</div>

{#if showEditDialog}
  <EditUserDialog 
    user={selectedUser} 
    onsuccess={handleUserUpdated}
    oncancel={() => showEditDialog = false}
  />
{/if}

<style>
  .admin-view {
    flex: 1;
    background-color: #2c2c2c;
    color: white;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
  }

  .users-list {
    background-color: #3a3a3a;
    padding: 1rem;
    border-radius: 8px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #4a4a4a;
  }

  th {
    background-color: #4a4a4a;
  }

  .error {
    color: #ff6b6b;
    margin-bottom: 1rem;
  }
</style>
