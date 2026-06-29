# FreeScool

The app is a React SPA in `client/` that talks directly to the microservices below;
there is no FreeSchool-specific backend (the old Python server and Svelte client were removed).

## Architecture
See @../../.claude/MSArchitecture/services/.md für die eigene API dokumentation and architecture overview.
See @../../.claude/MSArchitecture/services/AuthService.md für AuthService details (JWT verification, GITCLIENT role).
See @../../.claude/MSArchitecture/services/ProfileService.md für ProfileService details (Profile von userids).
See @../../.claude/MSArchitecture/services/ObjectService.md für ObjectService details (Persistenz).
See @../../.claude/MSArchitecture/services/MediaService.md für MediaService details (Bilder und Videos ).
See @../../.claude/MSArchitecture/services/EmailService.md für EmailService details (Sende Nachfragen zum Issue-Ersteller).
See @../../.claude/MSArchitecture/services/EmailService.md für ExceptionService details (Sende Fehlerfälle).
See @../../.claude/MSArchitecture/services/MessageService.md für MessageService details (Nachrichten zu anderen Usern).
See @../../.claude/MSArchitecture/services/RecordingService.md für RecordingService details (Serverseitige Aufnahmen von LiveKit Meetings).
See @../../.claude/MSArchitecture/services/GitService.md für GitService details (Issue creation)