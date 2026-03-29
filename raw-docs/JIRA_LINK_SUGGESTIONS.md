# Jira Link Suggestions — Epics 1, 2, and 3

Reference file for applying "is blocked by" and "relates to" links in Jira.
Open each story, click **Link**, select the link type, and search for the target story.

---

## Epic 1 — Project Setup

### Is Blocked By

| Story | Is Blocked By | Reason |
|-------|--------------|--------|
| SETUP-2 (Configure DB & migrations) | SETUP-1 (Scaffold client & server) | Server must exist before wiring up a database connection |
| SETUP-3 (Env variables, ESLint, Git) | SETUP-1 (Scaffold client & server) | Project must exist before configuring ESLint and .gitignore |

---

## Epic 2 — Upload & Manage Documents

### Is Blocked By

| Story | Is Blocked By | Reason |
|-------|--------------|--------|
| DOC-1 (Upload document) | SETUP-2 (DB & migrations) | Needs the files table to exist before uploads can be stored |
| DOC-2 (Multi-upload) | DOC-1 (Upload document) | Multi-upload extends single upload — must be working first |
| DOC-3 (Document detail view) | DOC-1 (Upload document) | Need files in the system to display details |
| DOC-4 (Rename document) | DOC-3 (Document detail view) | Rename input lives inside the detail view |
| DOC-5 (Download document) | DOC-1 (Upload document) | Can't download a file that hasn't been uploaded |
| DOC-6 (Move to Trash) | DOC-1 (Upload document) | Can't soft-delete a file that doesn't exist |

### Relates To

| Story | Relates To | Reason |
|-------|-----------|--------|
| DOC-5 (Download) | DOC-3 (Document detail view) | Download button also appears in the detail view |
| DOC-6 (Move to Trash) | DOC-3 (Document detail view) | Trash action is accessible from the detail view |

---

## Epic 3 — Folder Organisation & Categories

### Is Blocked By

| Story | Is Blocked By | Reason |
|-------|--------------|--------|
| FOLD-2 (Nest folders) | FOLD-1 (Create folder) | Can't nest folders until folder creation exists |
| FOLD-3 (Rename folder) | FOLD-1 (Create folder) | Can't rename a folder that doesn't exist yet |
| FOLD-4 (Delete folder) | FOLD-1 (Create folder) | Can't delete a folder that doesn't exist yet |
| FOLD-5 (Move doc to folder) | FOLD-1 (Create folder) | Need folders to move documents into |
| FOLD-5 (Move doc to folder) | DOC-1 (Upload document) | Need documents to move — **cross-epic dependency** |
| FOLD-7 (Custom categories) | FOLD-6 (Seed default categories) | categories table is created in FOLD-6; FOLD-7 builds on it |
| FOLD-8 (Rename/delete custom categories) | FOLD-7 (Custom categories) | Can't rename/delete categories that don't exist yet |

### Relates To

| Story | Relates To | Reason |
|-------|-----------|--------|
| FOLD-4 (Delete folder) | DOC-6 (Soft delete) | Folder deletion reuses the soft-delete pattern from Epic 2 |
| FOLD-5 (Move doc to folder) | DOC-3 (Document detail view) | Move option appears in the file detail/context menu |
| FOLD-8 (Rename/delete categories) | FOLD-6 (Seed default categories) | Must ensure default categories are not affected by delete |

---

## Key Cross-Epic Link

**FOLD-5 is blocked by DOC-1** — the most visible cross-epic dependency. Proves you can't build "Move to Folder" until the upload story is complete.

---

## How to Apply in Jira

1. Open a story (e.g. FOLD-2)
2. Click **Link** → choose **"is blocked by"** or **"relates to"**
3. Search for the blocking/related story (e.g. FOLD-1) and save

Stories with an unresolved "is blocked by" link will show a lock indicator and may be restricted from moving to In Progress depending on your workflow configuration.
