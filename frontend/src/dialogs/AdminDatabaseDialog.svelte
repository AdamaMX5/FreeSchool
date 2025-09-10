<script lang="ts">
  import Dialog from './Dialog.svelte';
  import { user } from '../lib/global';
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  let {
    onsuccess = () => {},
    oncancel = () => {}
  } = $props();
  let activeTab = $state('backup');
  let sqlContent = $state('');
  let fileInput = $state(null);
  let statusMessage = $state('');
  let isLoading = $state(false);
  let importStats = $state(null);
  function close() {
    oncancel();
  }
  async function downloadBackup() {
    isLoading = true;
    statusMessage = 'Backup wird erstellt...';
    importStats = null;
    
    try {
      const response = await fetch(`${API_BASE_URL}/admin/backup`, {
        headers: {
          'Authorization': `Bearer ${$user.jwt}`
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Backup fehlgeschlagen');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `freeschool_backup_${new Date().toISOString().slice(0, 10)}.sql`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      statusMessage = 'Backup erfolgreich heruntergeladen';
      
    } catch (error) {
      statusMessage = `Fehler: ${error.message}`;
    } finally {
      isLoading = false;
    }
  }
  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        sqlContent = e.target.result; 
        statusMessage = `Datei "${file.name}" geladen (${file.size} Bytes)`;
      };
      reader.onerror = () => {
        statusMessage = 'Fehler beim Lesen der Datei';
      };
      reader.readAsText(file);
    }
  }
  async function executeImport() {
    if (!sqlContent.trim()) {
      statusMessage = 'Bitte SQL-Inhalt eingeben oder Datei auswählen';
      return;
    }
    isLoading = true;
    statusMessage = 'Import wird durchgeführt...';
    importStats = null;
    try {
      const response = await fetch(`${API_BASE_URL}/admin/import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${$user.jwt}`
        },
        body: JSON.stringify({ sql_content: sqlContent })
      });
      const result = await response.json();
      
      if (!response.ok) throw new Error(result.detail || 'Import fehlgeschlagen');
      statusMessage = `Import erfolgreich: ${result.message}`;
      onsuccess();
      
    } catch (error) {
      statusMessage = `Fehler: ${error.message}`;
    } finally {
      isLoading = false;
    }
  }
  function clearContent() {
    sqlContent = '';
    statusMessage = 'Eingabe geleert';
    importStats = null;
    if (fileInput) {
      fileInput.value = '';
    }
  }
</script>

<Dialog onclose={close}>
  <h2>Datenbank Verwaltung</h2>

  <div class="tabs">
    <button 
      class:active={activeTab === 'backup'} 
      onclick={() => { activeTab = 'backup'; clearContent(); }}
    >
      Backup
    </button>
    <button 
      class:active={activeTab === 'import'} 
      onclick={() => activeTab = 'import'}
    >
      Import
    </button>
  </div>

  {#if activeTab === 'backup'}
    <div class="tab-content">
      <div class="info-box">
        <h4>📦 Komplettes Datenbank-Backup</h4>
        <p>Erstellt eine SQL-Datei mit allen Tabellen in der richtigen Reihenfolge:</p>
        <ul>
          <li>Rollen & Benutzer</li>
          <li>Kategorien & Hierarchien</li>
          <li>Lehrer & Lektionen</li>
          <li>Inhalte & Fortschritte</li>
        </ul>
      </div>

      <button 
        onclick={downloadBackup} 
        disabled={isLoading}
        class="primary large"
      >
        {isLoading ? '📦 Backup wird erstellt...' : '⬇️ Backup herunterladen'}
      </button>
    </div>
  {:else}
    <div class="tab-content">
      <div class="info-box">
        <h4>📤 Datenbank-Import</h4>
        <p>Importieren Sie eine SQL-Backup-Datei oder fügen Sie SQL-Befehle ein.</p>
        <p class="warning">⚠️ Achtung: Dies überschreibt vorhandene Daten!</p>
      </div>

      <div class="file-input">
        <input 
          type="file" 
          accept=".sql,.txt" 
          onchange={handleFileSelect}
          bind:this={fileInput}
        />
        <button onclick={() => fileInput?.click()} class="secondary">
          📁 Datei auswählen
        </button>
        {#if sqlContent}
          <button onclick={clearContent} class="secondary small">
            ❌ Löschen
          </button>
        {/if}
      </div>

      <textarea
        bind:value={sqlContent}
        placeholder="-- SQL-Befehle hier einfügen...\n-- Oder Datei auswählen\n\nINSERT INTO role (id, name) VALUES (1, 'ADMIN');\nINSERT INTO user (email, hashed_password) VALUES ('admin@example.com', 'hash123');"
        rows="12"
        class="sql-editor"
      ></textarea>

      <div class="import-actions">
        <button 
          onclick={executeImport} 
          disabled={isLoading || !sqlContent.trim()}
          class="primary large"
        >
          {isLoading ? '🔄 Importiere...' : '🚀 Import ausführen'}
        </button>

        <button onclick={clearContent} class="secondary">
          ❌ Eingabe löschen
        </button>
      </div>
    </div>
  {/if}

  {#if statusMessage}
    <div class:error={statusMessage.includes('Fehler')}
         class:success={!statusMessage.includes('Fehler') && statusMessage.includes('erfolg')}
         class="status-message">
      {#if statusMessage.includes('Fehler')}
        ⚠️ {statusMessage}
      {:else if statusMessage.includes('erfolg')}
        ✅ {statusMessage}
      {:else}
        ℹ️ {statusMessage}
      {/if}
    </div>
  {/if}

  {#if importStats}
    <div class="import-stats">
      <h4>Import-Statistik:</h4>
      <p>✅ {importStats.statements_executed} Befehle erfolgreich ausgeführt</p>
      {#if importStats.statements_skipped > 0}
        <p>⚠️ {importStats.statements_skipped} Befehle übersprungen</p>
      {/if}
    </div>
  {/if}

  <div class="actions">
    <button onclick={close}>Schließen</button>
  </div>
</Dialog>

<style>
  .tabs {
    display: flex;
    border-bottom: 1px solid #ccc;
    margin-bottom: 1rem;
  }
  .tabs button {
    padding: 0.5rem 1rem;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
  }
  .tabs button.active {
    border-bottom-color: #007bff;
    color: #007bff;
  }
  .tab-content {
    margin-bottom: 1rem;
  }
  .info-box {
    background-color: #f8f9fa;
    border-left: 4px solid #007bff;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 4px;
  }
  .info-box h4 {
    margin: 0 0 0.5rem 0;
    color: #007bff;
  }
  .info-box ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }
  .info-box .warning {
    color: #dc3545;
    font-weight: 500;
  }
  .file-input {
    margin-bottom: 1rem;
  }
  .file-input input[type="file"] {
    display: none;
  }
  .sql-editor {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.9rem;
    line-height: 1.4;
    margin-bottom: 1rem;
    resize: vertical;
  }
  .import-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .status-message {
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    font-weight: 500;
  }
  .status-message.error {
    background-color: #ffebee;
    color: #c62828;
    border: 1px solid #ffcdd2;
  }
  .status-message.success {
    background-color: #e8f5e8;
    color: #2e7d32;
    border: 1px solid #c8e6c9;
  }
  .status-message:not(.error):not(.success) {
    background-color: #e3f2fd;
    color: #1565c0;
    border: 1px solid #bbdefb;
  }
  .import-stats {
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  .import-stats h4 {
    margin: 0 0 0.5rem 0;
    color: #495057;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
  .primary {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
  }
  .primary.large {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
  .primary:hover:not(:disabled) {
    background-color: #0056b3;
  }
  .primary:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  .secondary {
    background-color: #6c757d;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  .secondary.small {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }
  .secondary:hover {
    background-color: #545b62;
  }
</style>