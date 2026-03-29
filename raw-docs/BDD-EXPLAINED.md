# BDD — Personal Document Manager: Explained

## What is a BDD?

A **Block Definition Diagram (BDD)** is a SysML diagram that shows the building blocks of a system and how they are structurally composed. It answers the question: *"What is the system made of?"*

---

## What Does the Arrow Mean?

Every arrow in this diagram is a **composition** relationship, shown as a **filled black diamond** at one end.

```
[ParentBlock] ◆────── [ChildBlock]
```

| Symbol | Meaning |
|--------|---------|
| **Filled diamond (◆)** at the parent end | The parent **owns** the child — the child is a part of the parent |
| **No arrowhead** at the child end | The child block exists as a component inside the parent |
| **Role name** (e.g. `docs`, `auth`) | The name of that part inside the parent block |
| **Multiplicity** (e.g. `1`, `0..*`) | How many of that part the parent can have |

### Multiplicity Guide

| Notation | Meaning |
|----------|---------|
| `1` | Exactly one — always present, never more than one |
| `0..*` | Zero or more — optional, can have many |

### Composition vs. Simple Association

> **Composition (filled diamond ◆)** means the child **cannot exist without** the parent. If `DocumentService` is destroyed, its `VersionHistory` and `Document` parts are destroyed with it. This is a "part-of" relationship, not just a "uses" relationship.

---

## Block Definitions & Relationships

---

### `PersonalDocumentManager`
**The top-level system block. Everything else is a part of this.**

This is the entire application — it is the root that owns and coordinates all other subsystems. It holds a `version` property to track the software release.

| Property | Type | Meaning |
|----------|------|---------|
| `version` | String | The current software version of the application |

**Owns (composes):**
- `UserPanel` — the user-facing side of the app
- `AdminPanel` — the admin-facing side of the app

---

### `UserPanel`
**The interface and logic available to regular (non-admin) users.**

This block represents everything a standard user can do: log in, manage their documents, and organise their files. It does not handle admin tasks like user management.

**Is a part of:** `PersonalDocumentManager`

**Owns (composes):**
- `AuthService` — handles login, registration, and sessions
- `DocumentService` — handles all document operations

---

### `AdminPanel`
**The interface and logic available to administrators.**

Admins have a separate panel with elevated privileges. They can manage users across the system. The admin panel is isolated from the user panel to enforce access control boundaries.

**Is a part of:** `PersonalDocumentManager`

**Owns (composes):**
- `UserManagement` — tools for viewing, adding, editing, and deleting users

---

### `AuthService`
**Handles all authentication and session management.**

This block is responsible for verifying who a user is. It manages login, registration, password handling, and how long a session stays active before timing out.

| Property | Type | Meaning |
|----------|------|---------|
| `sessionTimeout` | Integer | How long (in minutes) before an inactive session expires |

**Is a part of:** `UserPanel`

---

### `DocumentService`
**The core service for all document operations (Create, Read, Update, Delete).**

This is the main engine of the application. It handles uploading new documents, retrieving them, editing metadata, deleting them, and delegating storage organisation and version tracking to its sub-parts.

| Property | Type | Meaning |
|----------|------|---------|
| `maxFileSize` | Integer | The maximum allowed upload size in bytes/MB |

**Is a part of:** `UserPanel`

**Owns (composes):**
- `VersionHistory` — tracks every revision made to a document
- `Document` (0..*) — the actual document records stored in the system
- `OrganisationService` — handles how documents are sorted and searched

---

### `UserManagement`
**Admin tool for managing all user accounts in the system.**

Admins use this block to perform CRUD operations on user accounts — they can invite new users, edit roles or details, and delete accounts. It tracks how many users currently exist in the system.

| Property | Type | Meaning |
|----------|------|---------|
| `userCount` | Integer | The total number of registered users in the system |

**Is a part of:** `AdminPanel`

---

### `VersionHistory`
**Tracks every change made to a document over time.**

Every time a document is edited, a new revision is recorded here. This allows users to see what changed, when, and potentially roll back to an earlier version.

| Property | Type | Meaning |
|----------|------|---------|
| `revisionCount` | Integer | How many revisions exist for a given document |

**Is a part of:** `DocumentService`

---

### `Document`
**Represents a single stored document and its metadata.**

This is the actual data block for a document. It is not a service — it is a record. A user can have zero or many documents (`0..*`), and each document carries all the information needed to display, manage, and retrieve it.

| Property | Type | Meaning |
|----------|------|---------|
| `name` | String | The display name of the document |
| `fileType` | String | The file format, e.g. PDF, DOCX, PNG |
| `size` | Integer | File size in bytes |
| `uploadDate` | Date | When the document was first uploaded |
| `status` | String | Current state, e.g. Active, Archived, Expired |

**Is a part of:** `DocumentService` (multiplicity `0..*` — a service manages many documents)

---

### `OrganisationService`
**Manages how documents are structured, categorised, and found.**

This block handles the organisational layer of the document system — it groups documents into folders and provides filtering and search capabilities so users can find what they need quickly.

**Is a part of:** `DocumentService`

**Owns (composes):**
- `Folder` (0..*) — user-created folders for grouping documents
- `SearchFilter` — the search and filter engine

---

### `Folder`
**A named container for grouping related documents.**

Users can create folders to keep their documents organised (e.g. "Tax 2024", "Medical"). There can be zero or many folders (`0..*`) per user. A folder has a name to identify it.

| Property | Type | Meaning |
|----------|------|---------|
| `name` | String | The display name of the folder |

**Is a part of:** `OrganisationService` (multiplicity `0..*`)

---

### `SearchFilter`
**Provides search and filtering across the document library.**

This block handles the logic for querying documents — by name, type, date, status, tag, or folder. There is exactly one `SearchFilter` per `OrganisationService`.

| Property | Type | Meaning |
|----------|------|---------|
| `filterCriteria` | String | The active filter/search query applied by the user |

**Is a part of:** `OrganisationService` (multiplicity `1`)

---

## Full Composition Tree

```
PersonalDocumentManager
├── UserPanel
│   ├── AuthService
│   │   └── sessionTimeout : Integer
│   └── DocumentService
│       ├── maxFileSize : Integer
│       ├── VersionHistory  (1)
│       │   └── revisionCount : Integer
│       ├── Document  (0..*)
│       │   ├── name : String
│       │   ├── fileType : String
│       │   ├── size : Integer
│       │   ├── uploadDate : Date
│       │   └── status : String
│       └── OrganisationService  (1)
│           ├── Folder  (0..*)
│           │   └── name : String
│           └── SearchFilter  (1)
│               └── filterCriteria : String
└── AdminPanel
    └── UserManagement
        └── userCount : Integer
```
