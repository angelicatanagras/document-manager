# Personal Document Manager — Project Plan

---

## Core Concept

A secure, web-based personal document manager where users can upload, organize, and manage their important files — with version history, role-based access, and a clean admin panel.

---

## Platform Decision

**Web-based first (with PWA for mobile).**

- Documents are typically managed on desktops/laptops — web fits naturally
- React + PWA lets users install the app on mobile without building a separate app
- Mobile-first (React Native) adds unnecessary complexity for a first build

---

## Tech Stack

| Layer      | Choice                        |
|------------|-------------------------------|
| Frontend   | React (Vite)                  |
| Backend    | Node.js + Express.js          |
| Database   | PostgreSQL                    |
| Auth       | JWT + bcrypt                  |
| File Store | Local disk (start) → S3 later |

> No Python needed — sticking with JavaScript end to end for consistency.

---

## Project Structure

```
doc-manager/
├── client/                  # React (Vite)
│   └── src/
│       ├── pages/           # Dashboard, Files, Admin
│       ├── components/
│       └── hooks/
└── server/                  # Node.js + Express
    ├── routes/              # /auth, /files, /folders, /admin
    ├── middleware/          # auth check, role check
    ├── models/              # DB models
    └── uploads/             # file storage
```

---

## MVP Scope

These are the features to build first. Everything else comes later.

### 1. Authentication
- Register and login with email + password
- JWT-based sessions
- Role-based access: user vs. admin

### 2. Document Upload & Management (CRUD)
- Upload documents (PDF, images, Word, plain text)
- View document details
- Rename and update document metadata
- Delete documents (soft delete → Trash)

### 3. Folder Organization
- Create, rename, and delete folders
- Nest folders (e.g., Finance > 2025 > Taxes)
- Move documents between folders
- Pre-built categories: Identity, Financial, Medical, Legal, Property
- User-defined categories — users can create, rename, and delete their own categories
- Assign a color or icon to custom categories for easy identification

### 4. Version History
- Each re-upload of the same document creates a new version
- View version list with timestamps
- Restore a previous version
- Optional change note per version (e.g., "renewed passport")

### 5. Search
- Search by file name, folder, and category
- Filter by file type and date uploaded

### 6. User Panel
| Section   | What It Does                              |
|-----------|-------------------------------------------|
| Dashboard | Recent docs, storage usage summary        |
| My Files  | Folder tree + file browser                |
| Trash     | Deleted files, recoverable for 30 days    |
| Settings  | Profile, change password                  |

### 7. Admin Panel
| Section         | What It Does                           |
|-----------------|----------------------------------------|
| User Management | Create, suspend, delete users          |
| Storage Quotas  | Set per-user storage limits            |
| Audit Logs      | Who uploaded/deleted/accessed what     |
| System Health   | Storage usage across all users         |

---

## Security

- Passwords hashed with bcrypt
- JWT tokens for session management
- Role-based middleware (user vs. admin routes)
- Auto-logout after inactivity
- All file access gated behind authentication

---

## Future Features (Post-MVP)

These are good ideas but intentionally excluded from the first build:

| Feature              | Reason Deferred                          |
|----------------------|------------------------------------------|
| Expiry reminders     | Nice-to-have, not core                   |
| Offline / PWA        | Add after core is stable                 |
| PIN / secret vault   | Separate product concern (password mgr)  |
| OCR / ID scanning    | Separate tool, high complexity           |
| File sharing         | Requires extra access control logic      |
| 2FA (TOTP)           | Add after auth is solid                  |
| S3 cloud storage     | Start local, migrate when needed         |

---

## What Makes This Different from Google Drive

- Organized around personal life documents, not general file storage
- Pre-built categories (Identity, Medical, Legal, etc.)
- Version history as a core feature, not an afterthought
- Admin panel for family or small team use
- Lightweight and self-hostable

---

## Next Steps

1. Define the database schema (users, folders, files, versions)
2. Plan the REST API endpoints (CRUD routes)
3. Scaffold the project (client + server)
4. Build auth first, then files, then admin
