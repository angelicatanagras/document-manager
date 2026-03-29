# Jira Epics & User Stories — Personal Document Manager

> **Project:** Personal Document Manager
> **Description:** A secure, self-hostable web app for managing personal documents with version history, folder organisation, and admin controls.
> **MVP Target:** ~June 5, 2026 | **Total Estimated:** ~123 SP across 7 sprints

---

## Story Point Scale

| Points | Effort                                       |
| ------ | -------------------------------------------- |
| 1      | Trivial — config change, label update        |
| 2      | Simple — single endpoint or UI component     |
| 3      | Medium — full-stack story, well-understood   |
| 5      | Large — multiple components or complex logic |
| 8      | Very large — consider splitting              |

---

## Subtask Pattern (per story)

Each story follows this subtask structure:

1. DB model / schema update
2. API endpoint (backend)
3. React component / page (frontend)
4. Manual QA / integration check

A story is only **Done** when backend, UI, and QA are all complete.

---

## Sprint Overview

| Sprint   | Dates           | Epics Covered                          | Target SP | Status      |
| -------- | --------------- | -------------------------------------- | --------- | ----------- |
| Sprint 1 | Mar 2 – Mar 13  | Project Setup & Infrastructure         | ~8 SP     | ✅ Complete |
| Sprint 2 | Mar 16 – Mar 27 | Upload & Manage Documents              | ~18 SP    | In Progress |
| Sprint 3 | Mar 30 – Apr 10 | Folder Organisation & Categories       | ~23 SP    | Upcoming    |
| Sprint 4 | Apr 13 – Apr 24 | Version History + Search (part)        | ~20 SP    | Upcoming    |
| Sprint 5 | Apr 27 – May 8  | Search (rest) + Dashboard              | ~19 SP    | Upcoming    |
| Sprint 6 | May 11 – May 22 | Admin Panel                            | ~20 SP    | Upcoming    |
| Sprint 7 | May 25 – Jun 5  | Polish, bug fixes, QA, deployment prep | ~15 SP    | Upcoming    |

---

## Epic 1: Project Setup & Infrastructure ✅ DONE

**Sprint 1 | Mar 2 – Mar 13 | ~8 SP**

**Epic Summary:** This epic covers scaffolding the React + Vite client, the Node.js + Express server, the PostgreSQL database, and all developer tooling so that every subsequent sprint can begin on a consistent, reproducible foundation.

**Business Value:** Without a properly structured project, every subsequent story risks inconsistent environments, missing database tables, or accidental secrets exposure. Getting setup right from day one prevents technical debt and eliminates onboarding friction for the rest of the build.

**Objectives:**
- Scaffold the React + Vite client and Node.js + Express server
- Configure PostgreSQL and run the initial database migration to create all core tables
- Establish ESLint, environment variable documentation, and Git repository

**Scope:**

**In Scope:**
- React/Vite client scaffold under `client/`
- Node.js/Express server scaffold under `server/`
- PostgreSQL setup and initial migration (`users`, `files`, `folders`, `versions`, `categories` tables)
- ESLint configuration, `.env.example`, and `.gitignore`

**Out of Scope:**
- Authentication flows
- CI/CD pipeline
- Any feature work beyond infrastructure

**Acceptance Criteria:**
- Client (React + Vite) and server (Node.js + Express) both run locally and communicate via a shared `.env` configuration
- All core database tables (`users`, `files`, `folders`, `versions`, `categories`) are created by the initial migration and the migration can be re-run on a fresh database
- ESLint passes with zero errors across both `client/` and `server/`
- `.env.example` documents all required variables; `.gitignore` excludes `.env` and `node_modules`

_Authentication handled as part of setup scaffolding._

| ID      | Story                                                                      | SP  | Start  | End    | Status  |
| ------- | -------------------------------------------------------------------------- | --- | ------ | ------ | ------- |
| SETUP-1 | Scaffold the client (React + Vite) and server (Node.js + Express)          | 3   | Mar 2  | Mar 5  | ✅ Done |
| SETUP-2 | Configure PostgreSQL and run the initial database migration                | 3   | Mar 6  | Mar 10 | ✅ Done |
| SETUP-3 | Set up environment variables, ESLint, folder structure, and Git repository | 2   | Mar 11 | Mar 13 | ✅ Done |

**Epic Total: 8 SP**

---

### SETUP-1: Set Up Client and Server Scaffolding

**As a developer, I want the project scaffolded so that feature development can begin on a consistent foundation.**

**Description:** Scaffold the client and server project directories with their respective tech stacks so that all developers start from the same structure. This is the first story that must be complete before any other development can take place — nothing else can be built until the project skeleton exists.

**Details to Include:**
- React + Vite project initialised under `client/`
- Express server initialised under `server/` with a working health-check route at `/api/health`
- Shared `.env` file connects client and server via a `VITE_API_URL` variable
- Both projects confirmed running locally before this story is closed

**Acceptance Criteria:**

- React + Vite project initialised under `client/`
- Express server initialised under `server/` with a working health-check route
- Client and server connected via a shared `.env` configuration

**Subtasks:**

- SETUP-1.1: Initialise the React Vite project under the `client/` directory.
- SETUP-1.2: Initialise the Express server under the `server/` directory with a base health-check route.
- SETUP-1.3: Configure a shared `.env` file and connect the client to the server.

---

### SETUP-2: Configure Database and Run Migrations

**As a developer, I want the database configured and migrated so that all feature tables are in place from day one.**

**Description:** Configure the PostgreSQL database and run the initial migration to create all core tables. This story must be complete before any backend feature work can begin storing or querying data — every Epic 2–7 story depends on these tables existing.

**Details to Include:**
- PostgreSQL database created locally with connection string stored in `.env`
- Initial migration creates `users`, `files`, `folders`, `versions`, and `categories` tables with correct columns and foreign keys
- Migration tool (e.g. node-postgres or Knex) configured and usage documented in the README
- Migration can be re-run cleanly on a fresh database

**Acceptance Criteria:**

- PostgreSQL database created and connection string configured
- Initial migration creates `users`, `files`, `folders`, `versions`, and `categories` tables

**Subtasks:**

- SETUP-2.1: Create the PostgreSQL database and configure the connection string.
- SETUP-2.2: Write and run the initial migration to create the `users`, `files`, `folders`, `versions`, and `categories` tables.

---

### SETUP-3: Configure Project Environment and Tooling

**As a developer, I want consistent tooling and environment configuration so that all contributors work from the same baseline.**

**Description:** Set up ESLint, a documented `.env.example`, and a Git repository with a proper `.gitignore` so that the project is safe to collaborate on from day one. Consistent linting and environment documentation prevent secrets from being accidentally committed and reduce friction for anyone picking up the codebase.

**Details to Include:**
- `.env.example` lists all required environment variables with placeholder values (no real secrets)
- ESLint configured with a consistent ruleset shared across `client/` and `server/`
- Git repository initialised with a `.gitignore` that excludes `.env`, `node_modules`, and build artefacts
- ESLint passes with zero errors on the scaffolded code before this story is closed

**Acceptance Criteria:**

- `.env.example` documents all required variables
- ESLint configured with a consistent ruleset across client and server
- Git repository initialised with `.gitignore` excluding `.env` and `node_modules`

**Subtasks:**

- SETUP-3.1: Create a `.env.example` file with all required environment variables.
- SETUP-3.2: Set up ESLint with a consistent ruleset across client and server.
- SETUP-3.3: Initialise the Git repository with a `.gitignore` excluding `.env` and `node_modules`.

---

## Epic 2: Upload & Manage Documents

**Sprint 2 | Mar 16 – Mar 27 | ~21 SP**

**Epic Summary:** This epic delivers the core document management features — single and multi-file upload, a document detail view, rename, download, and soft delete — giving users everything they need to bring documents into the app and manage them day-to-day.

**Business Value:** Document upload and management is the primary purpose of the app. Without this epic, users have nothing to store or act on, making it the highest-priority feature epic. Every subsequent epic (folders, versions, search) depends on files existing in the system first.

**Objectives:**
- Allow users to upload one or multiple documents in supported formats
- Provide a detail view surfacing key metadata for each document
- Support renaming documents without re-uploading
- Allow documents to be downloaded securely
- Enable soft deletion with a 30-day recovery window via Trash

**Scope:**

**In Scope:**
- Single file upload with type validation and progress indicator
- Multi-file upload with per-file status
- Document detail view (name, type, size, upload date)
- Rename, download, and soft delete actions
- Trash view showing soft-deleted documents

**Out of Scope:**
- Folder assignment (Epic 3)
- Version tracking (Epic 4)
- Search and filtering (Epic 5)
- Permanent deletion (Epic 6)

**Acceptance Criteria:**
- Users can upload PDF, JPG, PNG, DOCX, and TXT files; unsupported types are rejected with a clear error before upload begins
- Multiple files can be uploaded in one action with per-file status and error messages on partial failure
- Each uploaded document appears in My Files with accurate name, type, size, and upload date
- Documents can be renamed, downloaded, and moved to Trash from the detail view
- Soft-deleted documents are removed from My Files and appear in the Trash view, recoverable for 30 days

| ID    | Story                                                                          | SP  | Start  | End    |
| ----- | ------------------------------------------------------------------------------ | --- | ------ | ------ |
| DOC-1 | As a user, I want to upload a document (PDF, JPG, PNG, DOCX, TXT)              | 5   | Mar 16 | Mar 18 |
| DOC-2 | As a user, I want to upload multiple documents at once                         | 3   | Mar 19 | Mar 20 |
| DOC-3 | As a user, I want to view a document's details (name, type, size, upload date) | 3   | Mar 20 | Mar 23 |
| DOC-4 | As a user, I want to rename a document                                         | 2   | Mar 24 | Mar 24 |
| DOC-5 | As a user, I want to download a document                                       | 2   | Mar 25 | Mar 25 |
| DOC-6 | As a user, I want to move a document to Trash (soft delete)                    | 3   | Mar 26 | Mar 27 |

**Epic Total: 18 SP**

---

### DOC-1: Implement Document Upload Functionality

**As a user, I want to upload a document (PDF, JPG, PNG, DOCX, TXT) so I can store it in the app.**

**Description:** Implement the document upload flow so users can store files in the app. This is the foundational story of the entire application — all other document features depend on files being in the system first. The upload must validate file types, show progress during transfer, and confirm the file appears in My Files on success.

**Details to Include:**
- File picker accepts PDF, JPG, PNG, DOCX, and TXT only; all other types are rejected with a clear error message before upload begins
- Upload progress indicator shown during file transfer
- Uploaded file stored on disk and its metadata (name, type, size, upload date, user ID) saved to the `files` table
- File appears in My Files immediately after a successful upload

**Acceptance Criteria:**

- File picker accepts PDF, JPG, PNG, DOCX, and TXT only; other types are rejected with a clear error
- Upload progress indicator shown during transfer
- Uploaded file appears in My Files after successful upload

**Subtasks:**

- DOC-1.1: Create the file upload component with a file picker and progress indicator.
- DOC-1.2: Implement the upload API endpoint with file type validation.
- DOC-1.3: Connect the upload form to the backend API and display the file in My Files.
- DOC-1.4: QA — verify all accepted and rejected file types, test upload progress, and confirm file appears in My Files.

---

### DOC-2: Implement Multiple Document Upload

**As a user, I want to upload multiple documents at once so I can save time.**

**Description:** Extend the upload flow to allow multiple files to be selected and submitted in a single action. Each file is validated and processed independently on the backend so that one failed upload does not block the others — partial failures must surface per-file error messages without cancelling successful uploads.

**Details to Include:**
- File picker supports multi-file selection (HTML `multiple` attribute)
- Each file validated and processed independently on the backend
- Per-file upload status shown in the UI during transfer (uploading, success, error)
- Partial failure displays per-file error messages without blocking successful uploads

**Acceptance Criteria:**

- Multi-file selection supported in the file picker
- Each file is processed independently on the backend
- Partial failure shows per-file error messages without blocking successful uploads

**Subtasks:**

- DOC-2.1: Update the file picker to support multi-file selection.
- DOC-2.2: Update the backend to process each file independently.
- DOC-2.3: Display per-file upload status and error messages on partial failure.
- DOC-2.4: QA — upload a batch with at least one invalid file and confirm per-file feedback is correct.

---

### DOC-3: Implement Document Detail View

**As a user, I want to view a document's details (name, type, size, upload date) so I know what I have stored.**

**Description:** Build the document detail view that surfaces key metadata for any selected file. This view is the central hub for all file actions — rename, download, version history — and must display accurate metadata fetched from the backend via a dedicated API endpoint.

**Details to Include:**
- Detail panel shows file name, file type, size (human-readable, e.g. "2.4 MB"), and upload date
- Accessible by clicking a file in My Files
- Includes a preview area (where applicable) and a Download button
- Metadata fetched from a dedicated `GET /api/files/:id` endpoint

**Acceptance Criteria:**

- Detail view shows name, file type, size, and upload date
- File can be previewed or downloaded directly from the detail view

**Subtasks:**

- DOC-3.1: Create the document detail panel showing name, type, size, and upload date.
- DOC-3.2: Implement the API endpoint to fetch document metadata.
- DOC-3.3: Add a preview and download button to the detail view.
- DOC-3.4: QA — verify all metadata fields are accurate and preview/download buttons work.

---

### DOC-4: Implement Document Rename Functionality

**As a user, I want to rename a document so I can keep my files clearly labelled.**

**Description:** Allow users to rename a document directly from the detail view without re-uploading. Inline renaming keeps the flow lightweight — the user clicks the name, types a new one, and confirms. The updated name must be saved immediately and reflected everywhere the file is displayed across the app.

**Details to Include:**
- Inline rename input displayed on the document detail view (activated by clicking the file name)
- Empty name rejected with a validation error; save button disabled if the field is blank
- New name saved on confirm (Enter key or Save button)
- Updated name reflected immediately in My Files and in the detail view

**Acceptance Criteria:**

- Inline rename input available on the document detail view
- New name saved on confirm; empty name is not accepted

**Subtasks:**

- DOC-4.1: Create an inline rename input on the document detail view.
- DOC-4.2: Implement the API endpoint to update the document name.
- DOC-4.3: Validate that an empty name is not accepted.
- DOC-4.4: QA — test rename with valid name, empty name, and confirm the updated name persists on refresh.

---

### DOC-5: Implement Document Download Functionality

**As a user, I want to download a document so I can access it outside the app.**

**Description:** Allow users to download any document stored in the app. Downloads must be authenticated — unauthenticated requests are blocked — and the file must be served with the correct MIME type and the original filename so the browser handles it appropriately. Download buttons appear on both the file list and the detail view.

**Details to Include:**
- Download button available on both the file list and the document detail view
- File served with the correct MIME type and original filename in the `Content-Disposition` header
- Unauthenticated download requests return a `401 Unauthorized` response
- Supports all accepted file types: PDF, JPG, PNG, DOCX, TXT

**Acceptance Criteria:**

- Download requires authentication; unauthenticated requests return 401
- File is served with the correct MIME type and original filename

**Subtasks:**

- DOC-5.1: Implement the download API endpoint to serve the file with the correct MIME type.
- DOC-5.2: Add a download button to the file list and detail view.
- DOC-5.3: Ensure unauthenticated download requests are blocked.
- DOC-5.4: QA — download multiple file types and verify MIME type, filename, and auth guard.

---

### DOC-6: Implement Move to Trash (Soft Delete)

**As a user, I want to move a document to the Trash so I can delete it without losing it immediately.**

**Description:** Implement soft deletion so users can remove a document from My Files without permanently losing it. Moving a file to Trash sets a `deleted_at` timestamp on the record, hides it from the main file list, and makes it recoverable from the Trash view for 30 days. This is the deletion pattern reused across folder deletion in Epic 3.

**Details to Include:**
- Soft delete sets a `deleted_at` timestamp on the file record; the physical file is not removed from disk
- Soft-deleted files are excluded from My Files and all normal file queries
- Deleted files appear in a dedicated Trash view with their deletion date
- Documents are recoverable from Trash for 30 days before auto-expiry

**Acceptance Criteria:**

- Document moves to Trash and is removed from My Files
- Document is recoverable from Trash for 30 days

**Subtasks:**

- DOC-6.1: Implement the soft delete API endpoint to set the `deleted_at` timestamp.
- DOC-6.2: Update the file list to exclude soft-deleted documents.
- DOC-6.3: Create the Trash view to display deleted documents.
- DOC-6.4: QA — move a file to Trash, confirm it's gone from My Files, and verify it appears in Trash.

---

## Epic 3: Folder Organisation & Categories

**Sprint 3 | Mar 30 – Apr 10 | ~23 SP**

**Epic Summary:** This epic adds hierarchical folder management and a category system, giving users two complementary ways to organise their documents — by location (folders) and by life area (categories). Users can create, nest, rename, and delete folders, move documents between them, and manage a set of default and custom categories.

**Business Value:** A flat file list becomes unmanageable as the document library grows. Folders and categories let users impose structure that mirrors how they already think about their documents, making retrieval faster and the app significantly more useful as a long-term storage tool.

**Objectives:**
- Enable folder creation with up to 3 levels of nesting
- Support folder rename and deletion (with safe soft-delete of contents)
- Allow documents to be moved between folders
- Seed five default categories on first login
- Allow users to create, rename, and delete custom categories

**Scope:**

**In Scope:**
- Folder CRUD (create, rename, delete) with 3-level nesting enforced
- Move document to a different folder
- Seed default categories (Identity, Financial, Medical, Legal, Property)
- Custom category creation with name, colour, and icon
- Custom category rename and delete

**Out of Scope:**
- Category-based filtering (Epic 5)
- Folder search
- Sharing folders with other users

**Acceptance Criteria:**
- Users can create folders; empty names are rejected and new folders appear in the sidebar immediately
- Folders support up to 3 levels of nesting; attempting to exceed 3 levels shows a clear error
- Folders can be renamed and the updated name is reflected everywhere without affecting their contents
- Deleting a folder soft-deletes all its contents and moves them to Trash
- Documents can be moved between folders; the move is reflected in both source and destination immediately
- Five default categories (Identity, Financial, Medical, Legal, Property) are present on first login and cannot be deleted
- Users can create custom categories with a name, colour, and optional icon; they appear in the sidebar immediately
- Renaming a custom category updates it everywhere; deleting it sets affected documents to uncategorised

| ID     | Story                                                                                      | SP  | Start  | End    |
| ------ | ------------------------------------------------------------------------------------------ | --- | ------ | ------ |
| FOLD-1 | As a user, I want to create a folder                                                       | 3   | Mar 30 | Mar 31 |
| FOLD-2 | As a user, I want to nest folders (up to 3 levels)                                         | 3   | Apr 1  | Apr 2  |
| FOLD-3 | As a user, I want to rename a folder                                                       | 2   | Apr 3  | Apr 3  |
| FOLD-4 | As a user, I want to delete a folder (moves contents to Trash)                             | 3   | Apr 6  | Apr 7  |
| FOLD-5 | As a user, I want to move a document into a different folder                               | 3   | Apr 7  | Apr 8  |
| FOLD-6 | Pre-built categories seeded on first login (Identity, Financial, Medical, Legal, Property) | 2   | Apr 8  | Apr 8  |
| FOLD-7 | As a user, I want to create custom categories (name, colour, icon)                         | 5   | Apr 9  | Apr 10 |
| FOLD-8 | As a user, I want to rename and delete custom categories                                   | 2   | Apr 10 | Apr 10 |

**Epic Total: 23 SP**

---

### FOLD-1: Implement Folder Creation Functionality

**As a user, I want to create folders so I can organise my documents hierarchically.**

**Description:** Implement folder creation as the entry point for all document organisation in this epic. Folders are stored in the database with a `parent_id` column to support nesting (built in FOLD-2) and must appear in the sidebar immediately after creation. This story is a hard blocker for FOLD-2 through FOLD-5.

**Details to Include:**
- Folder creation form accepts a name; empty name rejected with a validation error
- New folder stored in the `folders` table with `user_id` and optional `parent_id`
- Folder appears in the sidebar tree immediately after creation without a page reload
- Folder name must be unique within the same parent folder

**Acceptance Criteria:**

- Folder creation form accepts a name; empty name is not accepted
- New folder appears in the sidebar tree immediately

**Subtasks:**

- FOLD-1.1: Create the `folders` database table with `parent_id` support.
- FOLD-1.2: Implement the API endpoint to create a new folder.
- FOLD-1.3: Add a New Folder button and input to the sidebar.
- FOLD-1.4: QA — create a folder, verify it appears in the sidebar, and confirm empty name is rejected.

---

### FOLD-2: Implement Nested Folder Functionality

**As a user, I want to nest folders inside other folders (e.g. Finance > 2025 > Taxes) so I can reflect my real-world organisation.**

**Description:** Extend folder creation to support up to 3 levels of nesting so users can represent real-world hierarchies like Finance > 2025 > Taxes. The 3-level limit is enforced on both the backend and frontend to keep the sidebar manageable. A clear error is shown when a user attempts to exceed this limit.

**Details to Include:**
- Folder creation API accepts a `parent_id` and enforces a maximum depth of 3 levels
- Sidebar renders the folder tree recursively using a tree component
- Attempting to create a 4th-level folder shows a clear, specific error message
- Nesting depth validated on both the frontend (disable button) and backend (API returns 400)

**Acceptance Criteria:**

- Folder tree supports exactly 3 levels of nesting
- A clear error is shown if a user attempts to exceed 3 levels

**Subtasks:**

- FOLD-2.1: Update the create folder API to accept a `parent_id` and enforce a 3-level limit.
- FOLD-2.2: Update the sidebar to render the folder tree recursively.
- FOLD-2.3: Display a clear error when a user attempts to exceed 3 levels of nesting.
- FOLD-2.4: QA — create a 3-level hierarchy and attempt to add a 4th level; confirm the error state.

---

### FOLD-3: Implement Folder Rename Functionality

**As a user, I want to rename a folder so I can correct or update its label.**

**Description:** Allow users to rename any folder they own directly from the sidebar context menu. Renaming updates the display name everywhere it appears without affecting the folder's contents, its position in the hierarchy, or any documents inside it.

**Details to Include:**
- Inline rename option available in the folder context menu in the sidebar
- Empty name rejected with a validation error
- Rename reflected immediately in the sidebar and any breadcrumb navigation
- All child documents and subfolders remain intact and unaffected after renaming

**Acceptance Criteria:**

- Rename updates the folder name everywhere it is displayed
- All child documents and subfolders remain intact

**Subtasks:**

- FOLD-3.1: Implement the API endpoint to update the folder name.
- FOLD-3.2: Add an inline rename option to the folder context menu in the sidebar.
- FOLD-3.3: QA — rename a folder with children and confirm children are unaffected.

---

### FOLD-4: Implement Folder Deletion Functionality

**As a user, I want to delete a folder so I can remove folders I no longer need.**

**Description:** Allow users to delete folders they no longer need. Rather than permanently erasing the folder's contents, deletion soft-deletes all files inside and moves them to Trash, consistent with the soft-delete pattern established in DOC-6. A confirmation dialog prevents accidental deletion.

**Details to Include:**
- Confirmation dialog shown before proceeding with deletion
- All files inside the folder have `deleted_at` set (soft-deleted) before the folder record is removed
- Deleted folder contents appear in Trash and are recoverable for 30 days
- Folder is removed from the sidebar immediately after the deletion is confirmed

**Acceptance Criteria:**

- Deleting a folder soft-deletes all its contents and moves them to Trash
- Confirmation dialog shown before deletion

**Subtasks:**

- FOLD-4.1: Implement the API endpoint to soft-delete all files in the folder before removing it.
- FOLD-4.2: Add a delete option with a confirmation dialog to the folder context menu.
- FOLD-4.3: Verify deleted folder contents appear in Trash.
- FOLD-4.4: QA — delete a folder with files, confirm confirmation dialog appears, and verify files land in Trash.

---

### FOLD-5: Implement Move Document to Folder

**As a user, I want to move a document into a different folder so I can reorganise my files.**

**Description:** Allow users to move a document from one folder to another without re-uploading. Moving updates the file's `folder_id` in the database and is reflected immediately in both the source and destination folder views. Metadata and version history are fully preserved after the move.

**Details to Include:**
- Move option available in the file context menu with a folder selector (tree picker)
- API updates the document's `folder_id` to the target folder
- Document appears in the destination folder immediately after moving
- Document is no longer shown in the source folder after the move

**Acceptance Criteria:**

- Document appears in the new folder immediately after moving
- Previous folder no longer shows the document

**Subtasks:**

- FOLD-5.1: Implement the API endpoint to update a document's `folder_id`.
- FOLD-5.2: Add a Move option to the file context menu with a folder selector.
- FOLD-5.3: Confirm the document appears in the new folder and is removed from the previous one.
- FOLD-5.4: QA — move a document and verify it is correctly reflected in both source and destination folders.

---

### FOLD-6: Seed Pre-Built Categories on First Login

**As a user, I want pre-built categories (Identity, Financial, Medical, Legal, Property) so I can start organising immediately without setup.**

**Description:** Seed five default categories for every new user at account creation time so they can start tagging documents on first login without any manual setup. Default categories are flagged in the database to prevent deletion and serve as the foundation that FOLD-7 and FOLD-8 build upon.

**Details to Include:**
- Five categories seeded automatically when a new user account is created: Identity, Financial, Medical, Legal, Property
- All 5 categories present and visible in the sidebar on first login
- Default categories flagged with `is_default = true` in the `categories` table
- Default categories displayed in the sidebar without a delete option

**Acceptance Criteria:**

- All 5 default categories are present on first login
- Default categories cannot be deleted

**Subtasks:**

- FOLD-6.1: Seed Identity, Financial, Medical, Legal, and Property categories on user creation.
- FOLD-6.2: Mark seeded categories as `is_default` to prevent deletion.
- FOLD-6.3: Display default categories in the sidebar without a delete option.
- FOLD-6.4: QA — create a new user, log in, and confirm all 5 categories are present with no delete option.

---

### FOLD-7: Implement Custom Category Creation

**As a user, I want to create custom categories with a name, colour, and icon so I can tailor the app to my needs.**

**Description:** Allow users to create custom categories beyond the five defaults. Each category has a required name, a colour (chosen from a colour picker), and an optional icon, making it visually distinct in the sidebar. Custom categories are stored with `is_default = false` and can be managed in FOLD-8.

**Details to Include:**
- Custom category form accepts a name (required), a colour picker, and an optional icon selector
- New category stored in the `categories` table with `is_default = false`
- Category appears in the sidebar immediately after creation with the correct colour and icon applied
- Duplicate category names within the same user's account are rejected with a validation error

**Acceptance Criteria:**

- Custom category form accepts name (required), colour picker, and optional icon
- New category appears in the sidebar immediately

**Subtasks:**

- FOLD-7.1: Create the `categories` database table with `name`, `colour`, `icon`, and `is_default` fields.
- FOLD-7.2: Implement the API endpoint to create a custom category.
- FOLD-7.3: Build a New Category modal with a name field, colour picker, and icon selector.
- FOLD-7.4: QA — create a custom category with all fields, verify it appears in the sidebar with the correct colour and icon.

---

### FOLD-8: Implement Custom Category Rename and Delete

**As a user, I want to rename and delete custom categories so I can maintain my category structure.**

**Description:** Allow users to rename and delete custom categories to keep the category list accurate over time. Deleting a category does not delete the documents assigned to it — they become uncategorised instead. Default categories (seeded in FOLD-6) are not affected by either action.

**Details to Include:**
- Rename option available in the category context menu; empty name rejected with a validation error
- Delete option shows a confirmation dialog before proceeding
- Deleting a category sets `category_id` to null on all affected documents (they become uncategorised)
- Default categories (`is_default = true`) cannot be renamed or deleted

**Acceptance Criteria:**

- Rename updates the category name everywhere it is displayed
- Delete prompts for confirmation and sets affected documents to uncategorised

**Subtasks:**

- FOLD-8.1: Implement API endpoints to rename and delete a custom category.
- FOLD-8.2: Add Edit and Delete options to the category context menu with confirmation on delete.
- FOLD-8.3: Set affected documents to uncategorised when the category is deleted.
- FOLD-8.4: QA — rename a category and confirm it updates; delete a category and confirm affected documents become uncategorised.

---

## Epic 4: Version History

**Sprint 4 | Apr 13 – Apr 17 | ~10 SP**

**Epic Summary:** This epic introduces automatic document versioning on re-upload, a version history panel in the document detail view, and the ability to restore or download any previous version of a document.

**Business Value:** Documents change over time and users must have confidence that updating a file never permanently discards the previous copy. Version history makes the app trustworthy for important personal documents — passports, contracts, medical records — where older versions may need to be retrieved.

**Objectives:**
- Automatically create and number a new version when a document is re-uploaded
- Surface the full version timeline in the document detail view
- Allow users to restore any previous version as the current one
- Allow users to download any individual version directly

**Scope:**

**In Scope:**
- Version creation on re-upload with automatic version numbering
- Optional "What changed?" note attached to each version
- Version history panel with version number, date, size, and change note
- Restore action that creates a new version entry recording the restore
- Per-version individual download

**Out of Scope:**
- Diff / comparison view between two versions
- Version branching
- Automatic scheduled versioning (without a re-upload trigger)

**Acceptance Criteria:**
- Re-uploading a document with the same name creates a new version entry and preserves the original file on disk
- Version number increments automatically with each re-upload (v1, v2, v3…)
- An optional "What changed?" note can be attached to any new version at upload time
- The version history panel in the document detail view shows version number, date, size, and change note for every version
- Any previous version can be restored (making it the new current version) or downloaded individually

| ID    | Story                                                                                           | SP  | Start  | End    |
| ----- | ----------------------------------------------------------------------------------------------- | --- | ------ | ------ |
| VER-1 | As a user, re-uploading a document automatically saves a new version and preserves the original | 5   | Apr 13 | Apr 15 |
| VER-2 | As a user, I want to view my version history and restore or download a previous version         | 5   | Apr 16 | Apr 17 |

**Epic Total: 10 SP**

---

### VER-1: Implement Document Version Tracking

**As a user, I want a new version to be created automatically when I re-upload a document so I don't lose previous copies.**

**Description:** Implement automatic version tracking so that re-uploading a document preserves the previous copy rather than overwriting it. Each re-upload detects the existing file by name, increments the version number, stores a new record in the `versions` table, and keeps the original file on disk. An optional change note can be attached at upload time.

**Details to Include:**
- Re-uploading a file with the same name creates a new entry in the `versions` table
- Version number increments automatically with each re-upload (v1, v2, v3…)
- Previous file is preserved on disk; the `files` table is updated to point to the latest version
- Optional "What changed?" text note input available in the re-upload dialog

**Acceptance Criteria:**

- Re-uploading a document with the same name creates a new version; version number increments
- Original file is preserved on disk
- Optional "What changed?" note can be attached to the new version

**Subtasks:**

- VER-1.1: Create the `versions` table (`file_id`, `version_num`, `path`, `size`, `change_note`, `created_at`).
- VER-1.2: Update the upload API to detect a re-upload, increment the version number, and preserve the original file on disk.
- VER-1.3: Add an optional "What changed?" note input to the re-upload dialog.
- VER-1.4: QA — re-upload a file twice and confirm two version entries exist with the originals intact.

---

### VER-2: Implement Version History View, Restore, and Download

**As a user, I want to view my version history and restore or download a previous version so I can manage document revisions.**

**Description:** Build the version history panel in the document detail view so users can see all past versions and take action on them. Users can restore any previous version (which becomes the new current version with a restore entry recorded) or download any version as a standalone file.

**Details to Include:**
- Version timeline shows version number, upload date, file size, and change note for each entry
- Restore button makes the selected version current; a new version entry is recorded to track the restore action
- Each version row has an individual Download button that serves that specific file from disk
- Version history panel is accessible directly from the document detail view

**Acceptance Criteria:**

- Version timeline shows version number, upload date, file size, and change note
- Restore makes the selected version current; a new version entry records the restore action
- Each version has an individual download button

**Subtasks:**

- VER-2.1: Implement the API endpoint to list all versions with number, date, size, and change note.
- VER-2.2: Implement the restore API endpoint and the version-specific download endpoint.
- VER-2.3: Build the version history panel in the document detail view with Restore and Download buttons per row.
- VER-2.4: QA — restore a previous version, confirm it becomes current, and download an older version to verify the correct file is served.

---

## Epic 5: Search & Filtering

**Sprint 4–5 | Apr 17 – May 1 | ~13 SP**

**Epic Summary:** This epic adds a real-time document name search bar and a set of filter controls — folder, category, file type, and upload date range — that allow users to quickly locate documents in a growing library. All filters can be combined and cleared in a single action.

**Business Value:** As the document library grows, scrolling through a flat list becomes impractical. Search and filtering give users fast, targeted access to the exact file they need without knowing its precise location. This is critical to making the app useful at scale and for users who store hundreds of documents.

**Objectives:**
- Enable real-time, case-insensitive document name search
- Add folder, category, file type, and date range filters
- Allow all filters to be combined simultaneously
- Provide a single Clear All Filters action to reset the view instantly

**Scope:**

**In Scope:**
- Real-time debounced name search
- Folder filter (driven by sidebar selection)
- Category filter with multi-select support
- File type filter (PDF, image, Word, text)
- Upload date range filter (from / to)
- Clear All Filters button

**Out of Scope:**
- Full-text content search (OCR)
- Saved or pinned searches
- Search across Trash

**Acceptance Criteria:**
- Real-time name search filters the file list with debouncing and matches partial, case-insensitive queries; a No Results state is shown when nothing matches
- Selecting a folder in the sidebar automatically filters the file list to that folder's documents
- Category filter supports multi-select and updates the file list whenever the selection changes
- File type filter correctly isolates PDF, image, Word, and text documents
- Date range filter excludes files outside the selected `from` / `to` window
- All filters can be combined simultaneously and applied together
- A Clear Filters button resets all active filters and restores the full file list in a single action

| ID     | Story                                                 | SP  | Start  | End    |
| ------ | ----------------------------------------------------- | --- | ------ | ------ |
| SRCH-1 | As a user, I want to search by document name          | 3   | Apr 17 | Apr 20 |
| SRCH-2 | As a user, I want to filter by folder                 | 2   | Apr 21 | Apr 21 |
| SRCH-3 | As a user, I want to filter by category               | 2   | Apr 22 | Apr 22 |
| SRCH-4 | As a user, I want to filter by file type              | 2   | Apr 28 | Apr 28 |
| SRCH-5 | As a user, I want to filter by upload date range      | 3   | Apr 29 | Apr 30 |
| SRCH-6 | As a user, I want to clear all active filters at once | 1   | May 1  | May 1  |

**Epic Total: 13 SP**

---

### SRCH-1: Implement Document Name Search

**As a user, I want to search for a document by name so I can find it quickly.**

**Description:** Implement a real-time name search bar on the My Files page so users can find any document by typing part of its name. Results update as the user types with debouncing to avoid excessive API calls. Name matching is case-insensitive and partial matches are supported. This is the foundation on which all other filter stories build.

**Details to Include:**
- Search input in the My Files header filters the file list in real time with 300 ms debounce
- Name matching is case-insensitive and supports partial matches (e.g. "pass" matches "Passport")
- No Results empty state displayed clearly when no files match the search query
- Search query sent as a `?name=` URL query parameter so the state survives a page refresh

**Acceptance Criteria:**

- Search input filters the file list in real time (debounced)
- Matches are case-insensitive
- No results empty state shown when nothing matches

**Subtasks:**

- SRCH-1.1: Implement the search API query parameter with a case-insensitive name filter.
- SRCH-1.2: Add a search bar to the My Files header that filters the list in real time.
- SRCH-1.3: Display a No Results empty state when no files match the search.
- SRCH-1.4: QA — search for an existing file, a partial match, and a non-existent name; verify all states.

---

### SRCH-2: Implement Filter by Folder

**As a user, I want to filter documents by folder so I can narrow my view to a specific area.**

**Description:** Automatically apply a folder filter when the user selects a folder in the sidebar, narrowing the My Files list to documents inside that folder. The sidebar acts as the filter control — no separate UI element is needed. The folder filter can be combined with name search and other active filters.

**Details to Include:**
- Selecting a folder in the sidebar applies a `?folder_id=` filter to the files API automatically
- File list updates immediately when a folder is selected or deselected
- Folder filter combinable with name search, category, file type, and date range filters
- Deselecting the folder (clicking it again or the root) restores the full filtered file list

**Acceptance Criteria:**

- Selecting a folder in the sidebar applies the folder filter automatically
- Filter can be combined with search and other filters

**Subtasks:**

- SRCH-2.1: Implement the `folder_id` query parameter on the files API endpoint.
- SRCH-2.2: Apply the folder filter automatically when a folder is selected in the sidebar.
- SRCH-2.3: QA — select a folder, verify only its documents are shown, then combine with a name search.

---

### SRCH-3: Implement Filter by Category

**As a user, I want to filter documents by category so I can view all documents in a life area.**

**Description:** Add a category filter to the filter panel so users can view all documents tagged under one or more categories regardless of which folder they are stored in. Multiple categories can be selected simultaneously and the filter is combinable with all other active filters.

**Details to Include:**
- Category filter displayed as checkboxes in the filter panel, listing all the user's categories
- `?category_id=` query parameter supports multiple values for multi-select (e.g. `?category_id=1&category_id=3`)
- File list updates whenever the category selection changes
- Combinable with name search, folder, file type, and date range filters

**Acceptance Criteria:**

- Category filter updates the file list
- Multiple categories can be selected simultaneously

**Subtasks:**

- SRCH-3.1: Implement the `category_id` query parameter supporting multiple values.
- SRCH-3.2: Add category filter checkboxes to the filter panel.
- SRCH-3.3: QA — select one category, then multiple categories, and confirm results update correctly.

---

### SRCH-4: Implement Filter by File Type

**As a user, I want to filter documents by file type so I can find all PDFs or images quickly.**

**Description:** Add a file type filter to the filter panel so users can isolate all PDFs, images, Word documents, or text files in one click. The filter maps user-friendly labels to MIME type groups on the backend and can be combined with all other active filters.

**Details to Include:**
- File type filter supports four groups: PDF, image (JPG/PNG), Word (DOCX), and text (TXT)
- `?type=` query parameter filters the files API by MIME type group
- Filter displayed as a dropdown or checkbox group in the filter panel
- Combinable with name search, folder, category, and date range filters

**Acceptance Criteria:**

- File type filter supports PDF, image, Word, and text
- Combinable with other active filters

**Subtasks:**

- SRCH-4.1: Implement the `type` query parameter to filter by PDF, image, Word, or text.
- SRCH-4.2: Add a file type selector to the filter panel.
- SRCH-4.3: QA — filter by each file type individually and in combination with other filters.

---

### SRCH-5: Implement Filter by Upload Date Range

**As a user, I want to filter documents by upload date range so I can find recently added or older files.**

**Description:** Add a date range picker to the filter panel so users can narrow the file list to documents uploaded within a specific time window. This is useful when the user remembers roughly when they added a file but not its exact name. The filter accepts a `from` and `to` date and excludes files outside that range.

**Details to Include:**
- Date range picker provides `from` and `to` date inputs in the filter panel
- `?from=` and `?to=` ISO date query parameters passed to the files API
- Files with an `uploaded_at` value outside the selected range are excluded from results
- Combinable with all other active filters; either `from` or `to` can be set independently

**Acceptance Criteria:**

- Date range picker accepts `from` and `to` dates
- Files outside the selected range are excluded from results

**Subtasks:**

- SRCH-5.1: Implement `from` and `to` query parameters on the files API endpoint.
- SRCH-5.2: Add a date range picker to the filter panel.
- SRCH-5.3: Validate that files outside the selected range are excluded from results.
- SRCH-5.4: QA — set a date range that includes some files and excludes others; verify results.

---

### SRCH-6: Implement Clear All Filters

**As a user, I want to clear all active filters at once so I can reset my view quickly.**

**Description:** Add a Clear Filters button that resets the search input and every active filter control in a single action, restoring the full file list immediately. The button is only visible when at least one filter or search term is active, keeping the interface uncluttered when no filtering is in use.

**Details to Include:**
- Clear Filters button visible only when at least one filter or search term is active
- Clicking it resets the search input, folder selection, category checkboxes, file type selector, and date range simultaneously
- Full file list restored immediately after clearing without a page reload
- URL query parameters cleared so the reset state is shareable

**Acceptance Criteria:**

- Clear Filters button resets the search input and all active filters
- Full file list is restored immediately

**Subtasks:**

- SRCH-6.1: Add a Clear Filters button that resets the search input and all active filters.
- SRCH-6.2: Confirm the full file list is restored after clearing.
- SRCH-6.3: QA — apply multiple filters, click Clear Filters, and verify all filters are removed.

---

## Epic 6: User Dashboard & Profile

**Sprint 5–6 | May 5 – May 20 | ~19 SP**

**Epic Summary:** This epic delivers the main dashboard experience — recent documents, storage usage, and the sidebar folder tree — as well as Trash management (view, restore, permanently delete) and the Settings screens for updating profile details and changing passwords.

**Business Value:** The dashboard is the first screen users see after every login and must orient them at a glance. Profile and password management lets users keep their account accurate and secure without requiring admin involvement, which is essential for a self-hosted, personal-use tool.

**Objectives:**
- Show recent documents and storage usage on the dashboard home screen
- Provide a persistent sidebar folder tree for navigation
- Allow users to view, restore, and permanently delete documents from Trash
- Allow users to update their name and email in Settings
- Allow users to change their password in Settings

**Scope:**

**In Scope:**
- Recent documents widget (last 5–10 uploads)
- Storage usage progress bar
- Recursive sidebar folder tree with expand/collapse
- Trash view with restore action
- Permanent delete with confirmation and immediate quota update
- Profile update form (name, email)
- Password change form (current password required)

**Out of Scope:**
- Two-factor authentication (Post-MVP)
- Notification preferences
- Theme or appearance settings

**Acceptance Criteria:**
- Dashboard displays the last 5–10 uploaded documents with name, date, and file type; clicking any item navigates to its detail view
- Storage usage bar shows used vs. allocated quota in human-readable format and updates on each dashboard load
- Sidebar folder tree renders the full nested hierarchy with expand/collapse and filters the file list when a folder is selected
- Trash view lists soft-deleted documents with deletion dates; Restore returns a file to its original folder
- Permanent delete removes a file from disk and database immediately after confirmation and updates the storage quota
- Settings profile form pre-fills current name and email; changes are saved with success or error feedback
- Password change requires the current password, enforces strength requirements, and shows appropriate errors for all failure states

| ID     | Story                                                                              | SP  | Start  | End    |
| ------ | ---------------------------------------------------------------------------------- | --- | ------ | ------ |
| DASH-1 | As a user, I want to see my 5–10 most recently uploaded documents on the dashboard | 3   | May 5  | May 6  |
| DASH-2 | As a user, I want to see my storage usage (used vs. quota)                         | 2   | May 7  | May 7  |
| DASH-3 | As a user, I want a sidebar folder tree to browse my files                         | 3   | May 8  | May 11 |
| DASH-4 | As a user, I want to view and restore documents from Trash                         | 3   | May 12 | May 13 |
| DASH-5 | As a user, I want to permanently delete a document from Trash                      | 2   | May 14 | May 14 |
| DASH-6 | As a user, I want to update my name and email in Settings                          | 3   | May 15 | May 18 |
| DASH-7 | As a user, I want to change my password in Settings                                | 3   | May 19 | May 20 |

**Epic Total: 19 SP**

---

### DASH-1: Implement Recent Documents on Dashboard

**As a user, I want to see my recently uploaded documents on the dashboard so I know what I've added lately.**

**Description:** Build the Recent Documents section on the dashboard to display the last 5–10 files the user has uploaded. This gives users immediate context when they log in and a quick path back to recently added documents. Clicking any item navigates directly to the document detail view.

**Details to Include:**
- Dashboard shows the 5–10 most recently uploaded documents ordered by `uploaded_at` descending
- Each item displays the file name, upload date, and a file type icon
- Clicking a document navigates to its detail view
- Empty state displayed clearly if the user has not uploaded any documents yet

**Acceptance Criteria:**

- Dashboard shows the last 5–10 documents with name, date, and file type
- Clicking a document opens its detail view

**Subtasks:**

- DASH-1.1: Implement the API endpoint to return the 5–10 most recently uploaded files.
- DASH-1.2: Build the Recent Documents section on the dashboard with name, date, and file type.
- DASH-1.3: Navigate to the document detail view when a recent document is clicked.
- DASH-1.4: QA — upload several files and verify the dashboard shows the most recent in the correct order.

---

### DASH-2: Implement Storage Usage Display

**As a user, I want to see my storage usage on the dashboard so I know how much space I've used.**

**Description:** Build a storage usage progress bar on the dashboard that shows how much of the user's allocated quota has been consumed. This gives users visibility into their storage before they unexpectedly hit the limit. The quota value is sourced from admin settings for the user's account.

**Details to Include:**
- Storage bar shows used MB/GB vs. the user's allocated quota
- Label displays both values in a human-readable format (e.g. "1.2 GB / 5 GB")
- Quota limit sourced from the admin-configured value for this user's account
- Bar updates on each dashboard load to reflect the current state

**Acceptance Criteria:**

- Storage bar shows used vs. allocated quota in MB/GB
- Quota limit is sourced from admin settings

**Subtasks:**

- DASH-2.1: Implement the API endpoint to return used and allocated storage for the current user.
- DASH-2.2: Build a storage progress bar with a used/total label on the dashboard.
- DASH-2.3: QA — upload files, verify the storage bar updates, and confirm quota value matches admin setting.

---

### DASH-3: Implement Sidebar Folder Tree

**As a user, I want a sidebar folder tree so I can browse my file structure.**

**Description:** Build the persistent sidebar folder tree that allows users to navigate their folder hierarchy and filter the file list by selecting a folder. The tree component must render recursively to support the 3-level nesting established in Epic 3, and each node must support expand and collapse.

**Details to Include:**
- Sidebar renders the full nested folder structure fetched from the API on load
- Each node supports expand and collapse with a toggle arrow
- Selecting a folder filters the main file list to that folder's contents (connects to SRCH-2)
- Tree refreshes immediately when folders are created, renamed, or deleted without a full page reload

**Acceptance Criteria:**

- Left sidebar shows the full nested folder tree with expand/collapse support
- Selecting a folder filters the main file list

**Subtasks:**

- DASH-3.1: Implement the API endpoint to return the full nested folder structure.
- DASH-3.2: Build a recursive sidebar tree component with expand and collapse support.
- DASH-3.3: Filter the file list when a folder is selected in the sidebar.
- DASH-3.4: QA — navigate through a 3-level folder hierarchy in the sidebar and confirm the file list updates correctly.

---

### DASH-4: Implement Trash View and Restore

**As a user, I want to view and restore documents from Trash so I can recover accidentally deleted files.**

**Description:** Build the Trash page where users can see all their soft-deleted documents with deletion dates. The Restore action returns a file to its original folder and removes it from Trash. This completes the soft-delete cycle started in DOC-6 by giving users a way to act on their deleted files.

**Details to Include:**
- Trash page lists all soft-deleted files with name, original folder, and deletion date
- Restore button returns the file to its original folder and clears `deleted_at`
- Empty state shown clearly when Trash contains no items
- Files approaching the 30-day auto-expiry limit are visually flagged

**Acceptance Criteria:**

- Trash section shows deleted documents with their deletion date
- Restore moves the document back to its original folder

**Subtasks:**

- DASH-4.1: Implement the API endpoint to list soft-deleted files with their deletion dates.
- DASH-4.2: Implement the restore API endpoint to return a file to its original folder.
- DASH-4.3: Build the Trash page with a file list and a Restore button per item.
- DASH-4.4: QA — delete a file, open Trash, restore it, and confirm it reappears in its original folder.

---

### DASH-5: Implement Permanent Delete from Trash

**As a user, I want to permanently delete a document from Trash so I can free up storage immediately.**

**Description:** Add a Permanent Delete action to the Trash view for users who are certain a file is no longer needed. Permanent deletion removes the file from disk and the database immediately, and the user's storage quota is updated right away. A confirmation dialog makes clear that this action is irreversible.

**Details to Include:**
- Permanent Delete button with a confirmation dialog on each Trash item (action is irreversible — dialog must state this)
- Confirmed deletion removes the file from disk and the `files` / `versions` records from the database
- User's storage quota updated immediately after permanent deletion
- Deleted item removed from the Trash list without a page reload

**Acceptance Criteria:**

- Permanent delete requires confirmation
- Storage quota is updated immediately after deletion

**Subtasks:**

- DASH-5.1: Implement the permanent delete API endpoint to remove the file from disk and database.
- DASH-5.2: Add a Permanent Delete button with a confirmation dialog to the Trash view.
- DASH-5.3: Update the user's storage quota immediately after permanent deletion.
- DASH-5.4: QA — permanently delete a file, confirm it is removed from Trash, and verify the storage bar updates.

---

### DASH-6: Implement Profile Update in Settings

**As a user, I want to update my display name and email in Settings so I can keep my profile current.**

**Description:** Build the Settings page profile form so users can update their display name and email address without admin involvement. The form pre-fills with current values and provides clear success or error feedback on save. A duplicate email is rejected with a specific validation error.

**Details to Include:**
- Form pre-fills with the user's current name and email on load
- Changes submitted via `PATCH /api/users/me` and saved to the database
- Success message displayed on a successful save; error message shown on failure (e.g. duplicate email returns a specific error)
- Updated values persist and are pre-filled correctly on the next page load

**Acceptance Criteria:**

- Settings form pre-fills current name and email
- Changes saved on submit with success or error feedback

**Subtasks:**

- DASH-6.1: Implement the API endpoint to update the user's name and email.
- DASH-6.2: Build the Settings form pre-filled with the current user details.
- DASH-6.3: Validate input and display success or error feedback on save.
- DASH-6.4: QA — update name and email, refresh, and confirm the new values persist.

---

### DASH-7: Implement Password Change in Settings

**As a user, I want to change my password in Settings so I can maintain account security.**

**Description:** Build the change password form in Settings so users can rotate their password independently. The form requires the current password before accepting a new one, preventing unauthorised changes on unattended sessions. The new password must meet minimum strength requirements enforced on both frontend and backend.

**Details to Include:**
- Form has three fields: Current Password, New Password, Confirm New Password
- Current password verified by the backend before the new password is saved
- New password must meet minimum strength requirements (e.g. 8+ characters, mixed case)
- Appropriate error messages shown for: wrong current password, weak new password, mismatched confirm field

**Acceptance Criteria:**

- Password change requires the current password
- New password must meet strength requirements
- Appropriate error messages shown for wrong current password or weak new password

**Subtasks:**

- DASH-7.1: Implement the API endpoint to verify the current password and save the new one.
- DASH-7.2: Build the change password form with current, new, and confirm password fields.
- DASH-7.3: Display appropriate error messages for wrong current password or weak new password.
- DASH-7.4: QA — test with wrong current password, a weak new password, and a valid change; verify all states.

---

## Epic 7: Admin Panel & System Management

**Sprint 6–7 | May 21 – May 29 | ~11 SP**

**Epic Summary:** This epic provides administrators with a dedicated panel to view all registered users, create new accounts, suspend access, and permanently delete accounts — giving admins full control over who can use the system without requiring direct database access.

**Business Value:** The app is designed for controlled, self-hosted use rather than open self-registration. Admin tooling is essential for onboarding specific users, handling inactive or problematic accounts, and maintaining system security and integrity over time.

**Objectives:**
- Display a full list of all users with key account details
- Allow admins to create new user accounts with a defined role
- Allow admins to suspend and reactivate accounts without data loss
- Allow admins to permanently delete accounts with configurable file handling

**Scope:**

**In Scope:**
- User list view (name, email, role, storage used, status)
- Create user form (name, email, role, initial password)
- Suspend / reactivate toggle per user
- Delete user with confirmation and file-handling policy
- Admin-only route middleware blocking non-admin access

**Out of Scope:**
- Audit logs (Post-MVP)
- Bulk user actions
- Role permission editor
- Storage quota management UI

**Acceptance Criteria:**
- Admin panel is accessible to admin-role users only; non-admin requests return a 403 error
- User list displays all registered accounts with name, email, role, storage used, and account status
- Admins can create new user accounts; duplicate email is rejected with a specific validation error and passwords are stored hashed
- Suspended users cannot log in and receive a clear error message; their data is fully preserved
- Admins can reactivate a suspended account at any time via the Reactivate toggle
- Deleting a user removes their account from the list and handles their files per the configured retention policy

| ID      | Story                                                                        | SP  | Start  | End    | Sprint   |
| ------- | ---------------------------------------------------------------------------- | --- | ------ | ------ | -------- |
| ADMIN-1 | As an admin, I want to view all users (name, email, role, storage, status)   | 3   | May 21 | May 22 | Sprint 6 |
| ADMIN-2 | As an admin, I want to create a new user account                             | 3   | May 25 | May 26 | Sprint 7 |
| ADMIN-3 | As an admin, I want to suspend a user account                                | 2   | May 27 | May 27 | Sprint 7 |
| ADMIN-4 | As an admin, I want to delete a user account                                 | 3   | May 28 | May 29 | Sprint 7 |

**Epic Total: 11 SP**

---

### ADMIN-1: Implement User List View

**As an admin, I want to view a list of all users so I can manage who has access to the system.**

**Description:** Build the admin user list as the foundation of the admin panel and the starting point for all user management actions. The panel must be restricted to admin-role users only via backend route middleware — non-admin requests are blocked before they reach the data layer.

**Details to Include:**
- Table displays all registered users with name, email, role, storage used, and account status
- Accessible to admin-role users only; non-admin requests blocked by route middleware (returns 403)
- Each row provides access to management actions (suspend, delete) for that user
- Non-admin users receive a 403 error when attempting to access any admin route

**Acceptance Criteria:**

- Admin panel shows all users with name, email, role, storage used, and account status
- Accessible to admin-role users only

**Subtasks:**

- ADMIN-1.1: Implement the API endpoint to return all users with name, email, role, storage, and status.
- ADMIN-1.2: Build the user management table in the admin panel.
- ADMIN-1.3: Restrict access to admin-role users only via route middleware.
- ADMIN-1.4: QA — log in as a non-admin user and confirm the admin panel is inaccessible.

---

### ADMIN-2: Implement Create User Functionality

**As an admin, I want to create a new user account so I can onboard people without them self-registering.**

**Description:** Allow admins to create new user accounts directly from the admin panel, bypassing open self-registration. The admin sets the initial name, email, role, and password at creation time. The new user appears in the user list immediately and can log in straight away with the provided credentials.

**Details to Include:**
- Create User form accepts name, email, role (user / admin), and initial password
- Duplicate email rejected with a clear, specific validation error
- Password hashed before being stored in the database (never stored in plain text)
- New user appears in the user list immediately after creation and can log in with the provided credentials

**Acceptance Criteria:**

- Admin create user form accepts name, email, role, and initial password
- New user appears in the user list; duplicate email shows a validation error

**Subtasks:**

- ADMIN-2.1: Implement the API endpoint to create a new user with name, email, role, and password.
- ADMIN-2.2: Build the Create User form in the admin panel.
- ADMIN-2.3: Display a validation error if the email is already in use.
- ADMIN-2.4: QA — create a user, confirm they appear in the list, then attempt to create another with the same email.

---

### ADMIN-3: Implement Suspend User Functionality

**As an admin, I want to suspend a user account so I can temporarily revoke access without deleting their data.**

**Description:** Allow admins to suspend a user account to temporarily block login access without losing any of the user's documents or data. Suspended accounts can be reactivated instantly via a Reactivate toggle. The auth middleware blocks login for suspended users with an appropriate error message.

**Details to Include:**
- Suspend action sets the user's `status` field to `suspended` in the database
- Auth middleware checks `status` on every login attempt and blocks suspended users with a clear error message
- Suspend and Reactivate toggle button visible on each user row in the admin panel
- Account status badge (Active / Suspended) visible in the user list

**Acceptance Criteria:**

- Suspended user cannot log in; their data is preserved
- Admin can reactivate the account at any time via a Reactivate toggle

**Subtasks:**

- ADMIN-3.1: Implement the API endpoint to set the user status to `suspended`.
- ADMIN-3.2: Update the auth middleware to block login for suspended users.
- ADMIN-3.3: Add a Suspend and Reactivate toggle button to the user list.
- ADMIN-3.4: QA — suspend a user, attempt login as that user, confirm it is blocked, then reactivate and confirm login works.

---

### ADMIN-4: Implement Delete User Functionality

**As an admin, I want to delete a user account so I can remove users who no longer need access.**

**Description:** Allow admins to permanently delete a user account. Before proceeding, a confirmation dialog is shown explaining what will happen to the user's files based on the configured policy (delete files or transfer to another user). The API handles both the user record and their files according to that policy.

**Details to Include:**
- Delete button on the user row triggers a confirmation dialog explaining the file-handling policy
- API deletes the user record and handles their files per the configured retention policy (delete or transfer)
- Confirmation dialog clearly states the action is irreversible
- Deleted user no longer appears in the user list after deletion is confirmed

**Acceptance Criteria:**

- Delete action requires confirmation
- User's files are handled per configured policy (deleted or transferred)

**Subtasks:**

- ADMIN-4.1: Implement the API endpoint to delete a user and handle their files per policy.
- ADMIN-4.2: Add a Delete button with a confirmation dialog to the user list.
- ADMIN-4.3: QA — delete a user, confirm they are removed from the list, and verify file handling matches the configured policy.

---

## Post-MVP Backlog (no dates)

These items are deferred until after the core MVP is stable and deployed.

| Epic                    | Description                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| Auto-Delete Trash       | Scheduled job to permanently delete files in Trash older than 30 days                      |
| Audit Logs              | Admin view of all upload, delete, download, and restore events filterable by user and date |
| Expiry Reminders        | Notify users when documents (passport, insurance) near expiry                              |
| 2FA (TOTP)              | Optional two-factor authentication                                                         |
| File Sharing            | Read-only shareable links                                                                  |
| PWA / Offline Mode      | Installable PWA with offline access                                                        |
| OCR & ID Scanning       | Extract text/metadata from uploaded documents                                              |
| S3 Cloud Storage        | Migrate from local disk to AWS S3                                                          |
| Secret Vault / PIN Lock | PIN-protected vault for sensitive documents                                                |

---

_Last updated: 2026-03-17_
