# FreeScool

The app is a React SPA in `client/` that talks directly to the microservices below;
there is no FreeSchool-specific backend (the old Python server and Svelte client were removed).

## Architecture
See @../AuthService/AuthService.md für AuthService details (JWT verification, GITCLIENT role).
See @../ProfilService/ProfileService.md für ProfileService details (Profile von userids).
See @../ObjectService/ObjectService.md für ObjectService details (Persistenz).
See @../MediaService/MediaService.md für MediaService details (Bilder und Videos ).
See @../EmailService/EmailService.md für EmailService details (Sende Nachfragen zum Issue-Ersteller).
See @../ExceptionService/ExceptionService.md für ExceptionService details (Sende Fehlerfälle).
See @../ForumService/ForumService.md für ForumService details (Diskussionsforum).
See @../MessageService/MessageService.md für MessageService details (Nachrichten zu anderen Usern).
See @../RecordingService/RecordingService.md für RecordingService details (Serverseitige Aufnahmen von LiveKit Meetings).
See @../GitService/GitService.md für GitService details (Issue creation)