<script>
    import { X } from "lucide-svelte";
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";
    import { user } from "../lib/global";

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const dispatch = createEventDispatcher();

    let teachers = [];
    let newTeacher = {
        name: "",
        email: "",
        city: "",
        country: "",
    };
    let error = null;
    let success = null;

    function close() {
        dispatch("close");
    }

    async function fetchTeachers() {
        try {
            const response = await fetch(`${API_BASE_URL}/teacher/all/`);
            if (!response.ok) throw new Error("Fehler beim Laden der Lehrer");
            teachers = await response.json();
            error = null;
        } catch (err) {
            error = err.message;
        }
    }

    async function addTeacher() {
        try {
            const response = await fetch(`${API_BASE_URL}/teacher/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${$user.jwt}`, // JWT-Token hinzufügen
                },
                body: JSON.stringify(newTeacher),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.error || "Fehler beim Hinzufügen des Lehrers",
                );
            }

            const addedTeacher = await response.json();
            teachers = [...teachers, addedTeacher];
            success = "Lehrer erfolgreich hinzugefügt!";
            error = null;

            // Formular zurücksetzen
            newTeacher = {
                name: "",
                email: "",
                city: "",
                country: "",
            };

            // Erfolgsmeldung nach 3 Sekunden ausblenden
            setTimeout(() => (success = null), 3000);
        } catch (err) {
            error = err.message;
            success = null;
        }
    }

    onMount(async () => {
        await fetchTeachers();
    });
</script>

<div class="teacher-view">
    <button on:click={close} title="Zurück zur normalen Ansicht"
        ><X size="20" /></button
    >
    <h2>👩‍🏫 Lehreransicht</h2>

    <!-- Formular zum Hinzufügen neuer Lehrer -->
    <div class="form-container">
        <h3>Neuen Lehrer hinzufügen</h3>

        {#if error}
            <div class="error">{error}</div>
        {/if}

        {#if success}
            <div class="success">{success}</div>
        {/if}

        <form on:submit|preventDefault={addTeacher}>
            <div class="form-row">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        bind:value={newTeacher.name}
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        bind:value={newTeacher.email}
                        required
                    />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="city">Stadt:</label>
                    <input
                        type="text"
                        id="city"
                        bind:value={newTeacher.city}
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="country">Land:</label>
                    <input
                        type="text"
                        id="country"
                        bind:value={newTeacher.country}
                        required
                    />
                </div>
            </div>

            <button type="submit">Lehrer hinzufügen</button>
        </form>
    </div>

    <!-- Liste aller Lehrer -->
    <div class="teachers-list">
        <h3>Alle Lehrer</h3>

        {#if teachers.length === 0}
            <p>Keine Lehrer gefunden.</p>
        {:else}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Stadt</th>
                        <th>Land</th>
                    </tr>
                </thead>
                <tbody>
                    {#each teachers as teacher}
                        <tr>
                            <td>{teacher.name}</td>
                            <td>{teacher.email}</td>
                            <td>{teacher.city}</td>
                            <td>{teacher.country}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</div>

<style>
    .teacher-view {
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
    }

    button[type="submit"] {
        margin-top: 0.5rem;
        width: 100%;
    }

    .form-container,
    .teachers-list {
        background-color: #3a3a3a;
        padding: 1rem;
        border-radius: 8px;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .form-row {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .form-group {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .form-group label {
        margin-bottom: 0;
        white-space: nowrap;
    }

    .form-group input {
        width: auto;
        flex: 1;
        min-width: 0; /* Verhindert, dass Inputs über ihren Container hinauswachsen */
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
    }

    input {
        width: 100%;
        padding: 0.5rem;
        border-radius: 4px;
        border: none;
        background-color: #4a4a4a;
        color: white;
    }

    button[type="submit"] {
        background-color: #4caf50;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        margin-top: 1rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th,
    td {
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

    .success {
        color: #51cf66;
        margin-bottom: 1rem;
    }
</style>
