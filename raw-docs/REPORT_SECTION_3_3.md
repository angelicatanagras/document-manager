# 3.3 UI/UX Design

The CloudDoc interface was designed using Figma, following a clean, minimal layout that prioritises usability and clarity. The application is split into two distinct portals — a **User Portal** and an **Admin Portal** — each with its own navigation structure and access controls.

---

## Design Decisions

The interface uses a dark sidebar with a white content area to create a clear visual hierarchy between navigation and content. A teal/green primary colour is used consistently for actions and active states, while status indicators (Active, Expired, Suspended) use a traffic-light colour system — green, red, and orange — to communicate state at a glance. All destructive actions (delete, suspend) use confirmation dialogs to prevent accidental data loss.

---

## Authentication Screens

Three authentication screens handle entry into the system. The **Sign In** screen presents a minimal form with email and password fields and a link to sign up. The **Admin Login** screen is visually differentiated with a red admin badge on the logo, making it immediately clear this is a restricted portal. The **Create Account** screen collects full name, email, password, and confirm password. All three screens are centred on a light background with no distracting elements, keeping the user focused on the task.

---

## User Dashboard

The dashboard is the primary landing screen after login. It is structured into three zones:

- **Left sidebar** — fixed navigation containing links to Dashboard, All Documents, Folders, Tags, Expiring Soon (with a badge count), and Trash. A storage meter at the bottom shows used vs. total storage (e.g. 1.9 / 5 GB, 38% used), and the user profile is anchored at the very bottom.
- **Main content area** — a prominent drag-and-drop upload zone sits at the top, accepting PDF, JPG, DOCX, XLSX, and PNG files up to 50 MB. Below it, a Recent Documents list shows the last uploaded files with their name, size, category, upload date, and status.
- **Right panel** — an Expiring Soon widget highlights documents nearing their expiry date with colour-coded urgency (days remaining). A Quick Actions panel provides one-click shortcuts for Upload Doc, New Folder, Add Tag, and Search Docs.

---

## Document Upload Flow

The upload flow consists of three states:

1. **Upload Modal** — after selecting a file, a modal opens allowing the user to set the document name, assign it to a folder, add tags (e.g. Identity, Government, Travel), and optionally set an expiry date before saving.
2. **Upload Loading** — a progress modal shows the upload status through three stages: Validating → Uploading → Saved, with a percentage indicator and a cancel option.
3. **Upload Success** — the dashboard refreshes with a toast notification confirming the document was saved, and the new file appears at the top of the Recent Documents list with a "New" badge.

---

## All Documents View

The All Documents page displays the full file library in a card grid layout. Documents are filterable by category tabs (IDs, Finance, Work, Health, Other) shown at the top. Each card shows a file type icon, document name, size, category, upload date, and status badge (Valid, Expiring, Expired, Stored). A search bar and filter/upload buttons are accessible from the top right.

---

## Admin Panel

The Admin Portal is accessible only to administrators via a separate login. It shares the same sidebar structure but with admin-specific sections: Dashboard, Users, Documents, Storage, Activity Logs, Settings, and Flagged Content.

**Admin Dashboard** displays four summary stat cards at the top — Total Users (1,234), Total Documents (20,000), Suspended Users (2), and Storage Used (3.8 TB) — each with a trend indicator. Below is a paginated user table showing name, status, plan, document count, storage usage, and join date, with view/suspend/delete action buttons per row. A Recent Activity feed on the right logs system events in real time, and a Storage Breakdown panel shows usage by file type (PDF, Images, Word/Excel, Other) against total capacity.

---

## User Management — CRUD Operations

The Users page provides full CRUD functionality for user accounts:

- **Read** — a paginated table lists all 1,284 registered users with columns for name, email, status, role, join date, and actions. Tabs filter between All, Active, and Suspended users.
- **Create** — an Add User modal collects full name, email, role, and status to register a new account.
- **Update** — an Edit User modal pre-fills the selected user's details for modification, with a Save Changes button.
- **Delete** — a confirmation dialog warns that deleting a user will permanently remove their account and all associated documents, requiring explicit confirmation before proceeding.
- **Suspend** — a separate confirmation dialog allows an admin to temporarily revoke access, with a note that the account can be unsuspended at any time.

All modals overlay the blurred background page, keeping the user in context without navigating away.

---

## Navigation Structure

```
User Portal                    Admin Portal
├── Dashboard                  ├── Dashboard
├── All Documents              ├── Users
├── Folders                    ├── Documents
├── Tags                       ├── Storage
├── Expiring Soon              ├── Activity Logs
└── Trash                      ├── Settings
                               └── Flagged Content
```
