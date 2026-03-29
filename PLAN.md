# CloudDoc — Personal Document Manager: Implementation Plan

> **Assessment:** IFN636 Assessment 1.2 — Full-Stack CRUD Application with DevOps Practices
> **Total Marks:** 20 | **Reference repo:** sampleapp_IFQ636

---

## Reference Architecture

Architecture is modelled on [`sampleapp_IFQ636`](../sampleapp_IFQ636), a full-stack monorepo with:

```
sampleapp_IFQ636/
├── frontend/               ← React (Vite) + Tailwind CSS
│   └── src/
│       ├── components/     ← Navbar, TaskForm, TaskList
│       ├── context/        ← AuthContext.js (React Context API)
│       ├── pages/          ← Login, Register, Profile, Tasks
│       └── axiosConfig.jsx ← Centralised HTTP client
├── backend/                ← Node.js + Express.js
│   ├── config/db.js        ← DB connection
│   ├── controllers/        ← Business logic
│   ├── middleware/         ← JWT authMiddleware
│   ├── models/             ← ORM/ODM schemas
│   └── routes/             ← API route declarations
└── .github/workflows/ci.yml
```

---

## Project Folder Structure (Target)

```
document-manager/
├── frontend/                        # React (Vite) frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── axiosConfig.js           # Axios instance with JWT interceptor
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── DocumentCard.jsx
│   │   │   ├── UploadModal.jsx
│   │   │   ├── UploadProgress.jsx
│   │   │   └── ConfirmDialog.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # JWT + user role context
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AllDocuments.jsx
│   │   │   ├── Folders.jsx
│   │   │   ├── Tags.jsx
│   │   │   ├── ExpiringSoon.jsx
│   │   │   ├── Trash.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLogin.jsx
│   │   │       ├── AdminDashboard.jsx
│   │   │       └── UserManagement.jsx
│   │   └── index.jsx
│   ├── tailwind.config.js
│   └── package.json
├── backend/                         # Node.js + Express backend
│   ├── config/
│   │   └── db.js                    # MongoDB Atlas connection (Mongoose)
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── documentController.js
│   │   ├── folderController.js
│   │   ├── versionController.js
│   │   ├── searchController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Document.js
│   │   ├── Folder.js
│   │   ├── Tag.js
│   │   └── DocumentVersion.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── documentRoutes.js
│   │   ├── folderRoutes.js
│   │   ├── versionRoutes.js
│   │   ├── searchRoutes.js
│   │   └── adminRoutes.js
│   ├── uploads/
│   ├── server.js
│   ├── .env                         # Never commit this
│   └── package.json
├── raw-docs/
├── raw-html/
├── README.md
├── PLAN.md
└── .github/
    └── workflows/
        └── ci.yml
```

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend | React (Vite) | Mirrors sampleapp_IFQ636 |
| Styling | Tailwind CSS | Dark sidebar + teal primary (#0F766E) |
| HTTP Client | Axios | Centralised config with JWT interceptor |
| Routing | React Router DOM | Protected routes via AuthContext |
| Backend | Node.js + Express.js | Mirrors sampleapp_IFQ636 |
| Database | MongoDB Atlas | Mongoose ODM — matches sampleapp_IFQ636 pattern |
| Auth | JWT + bcrypt | Matches reference app pattern |
| File Storage | Local disk → S3 | Start local, migrate later |
| Process Manager | PM2 | Keeps backend alive on EC2 |
| Deployment | AWS EC2 | Ubuntu, served via PM2 + nginx |

---

## Epics & Stories (from JIRA_EPICS_AND_STORIES.md)

### Epic 1 — Project Setup & Infrastructure ✅ DONE
- SETUP-1: Scaffold frontend (Vite + React + Tailwind) and backend (Express)
- SETUP-2: Configure MongoDB Atlas connection (Mongoose) and define schemas
- SETUP-3: Set up ESLint, Prettier, GitHub Actions CI

### Epic 2 — Authentication ✅ DONE
- AUTH-1: Register endpoint + bcrypt password hashing
- AUTH-2: Login endpoint + JWT issuance
- AUTH-3: AuthContext + protected routes on client
- AUTH-4: Role-based middleware (user vs. admin)
- AUTH-5: Admin login with role guard

### Epic 3 — Upload & Manage Documents ✅ DONE
- DOC-1: Single file upload (PDF, JPG, DOCX, XLSX, PNG — max 50 MB) ✅
- DOC-2: Multi-file upload
- DOC-3: Document detail view (metadata, preview) ✅ (card + edit modal)
- DOC-4: Rename document ✅ (EditModal)
- DOC-5: Download document ✅
- DOC-6: Soft delete to trash (30-day recovery) ✅

**New files — backend:**
- `backend/middleware/uploadMiddleware.js` — multer disk storage, 50 MB limit, type whitelist
- `backend/controllers/documentController.js` — upload, list, get, update, soft-delete, restore, permanent-delete, download
- `backend/routes/documentRoutes.js` — full REST routes

**New files — frontend:**
- `frontend/src/components/Sidebar.jsx` — dark sidebar with nav, storage meter, user profile
- `frontend/src/components/DocumentCard.jsx` — card with file-type icon, status badge, download/edit/delete actions
- `frontend/src/components/UploadModal.jsx` — drag-drop upload form (file, name, expiry, tags)
- `frontend/src/components/EditModal.jsx` — rename + update expiry date
- `frontend/src/components/ConfirmDialog.jsx` — reusable confirm dialog
- `frontend/src/pages/AllDocuments.jsx` — 3-col grid, filter pills, search, sort, full CRUD
- `frontend/src/pages/Dashboard.jsx` — welcome, drag-drop zone, recent 6 documents
- `frontend/src/pages/Trash.jsx` — trash list with restore and permanent delete
- Updated `frontend/src/axiosConfig.js` — FormData detection, no forced Content-Type for uploads

### Epic 4 — Folder Organisation & Categories
- FOLD-1: Create folder
- FOLD-2: Nest folders
- FOLD-3: Rename folder
- FOLD-4: Delete folder
- FOLD-5: Move document to folder
- FOLD-6: Seed default categories (Identity, Financial, Medical, Legal, Property)
- FOLD-7: Custom user-defined categories
- FOLD-8: Tag creation and assignment

### Epic 5 — Version History
- VER-1: Re-upload creates new version
- VER-2: Version list with timestamps + restore previous version

### Epic 6 — Search & Filtering
- SEARCH-1: Search by filename
- SEARCH-2: Filter by folder / category
- SEARCH-3: Filter by file type
- SEARCH-4: Filter by date range
- SEARCH-5: Filter by status (Valid / Expiring / Expired)
- SEARCH-6: Combined filter + search

### Epic 7 — User Dashboard & Profile
- DASH-1: Dashboard layout (sidebar, topbar, main content)
- DASH-2: Drag-drop upload zone on dashboard
- DASH-3: Recent documents list
- DASH-4: Expiring Soon widget + sidebar badge
- DASH-5: Storage meter in sidebar
- DASH-6: Trash view with recovery action
- DASH-7: Profile / Settings page

### Epic 8 — Admin Panel & System Management
- ADMIN-1: Admin dashboard (stat cards, activity feed)
- ADMIN-2: User list (paginated, status tabs)
- ADMIN-3: User CRUD (add, edit, suspend, delete with confirmation dialogs)
- ADMIN-4: Storage breakdown by file type

### Post-MVP Backlog
- Expiry reminder notifications
- PWA / offline access
- PIN vault for sensitive documents
- File sharing, 2FA, AWS S3 migration

---

## UI Design System

| Token | Value |
|---|---|
| Primary | `#0F766E` (teal) |
| Primary Light | `#14B8A6` |
| Sidebar BG | `#1E293B` (dark) |
| Page BG | `#F8FAFC` |
| Text Primary | `#1E293B` |
| Text Muted | `#64748B` |
| Status Valid | `#16A34A` (green) |
| Status Expiring | `#D97706` (orange) |
| Status Expired | `#EF4444` (red) |
| Font | Inter (400, 500, 600, 700) |

---

## App Screens (from raw-html)

### Public
- **Landing** (`landing.html`) — Hero, feature cards, stats, CTA, footer
- **Login** (`login.html`) — Email + password, forgot password link
- **Register** (`register.html`) — Full name, email, password, confirm password
- **Admin Login** (`admin-login.html`) — Visually distinct with red admin badge

### User Portal
- **Dashboard** (`dashboard.html`) — Drag-drop upload zone, recent documents, expiring soon widget
- **All Documents** (`all-documents.html`) — 3-column card grid, category tabs, grid/list toggle, sort, search
- **Upload Modal** (`upload-modal.html`) — File preview, name, folder, tag pills, expiry date
- **Upload Progress** (`upload-loading.html`) — Validating → Uploading → Saved
- **Folders, Tags, Expiring Soon, Trash, Profile**

### Admin Portal
- **Admin Dashboard** (`admin-panel.html`) — Stat cards, activity feed, storage breakdown
- **User Management** (`admin-user-management.html`) — CRUD table with confirm dialogs

---

## Step-by-Step: From Local → GitHub → EC2 → Submitted

### PHASE 1 — Local Development (current)

**What to do:**
1. Keep building epics locally on feature branches (see branching strategy below)
2. Test each feature at `http://localhost:5173` (frontend) and `http://localhost:5000` (backend)
3. Push each feature branch and open a PR to `main`
4. Merge PRs — this triggers GitHub Actions

**Run locally:**
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

---

### PHASE 2 — GitHub Branching Strategy (3 marks) — IN PROGRESS

**Rules:**
- `main` — production-ready only, never commit directly
- `feature/<epic>` — one branch per epic or story
- Open a Pull Request (PR) for every feature → merge into `main`

**Branch naming:**
```
feature/epic1-setup       ✅ pushed — open PR → merge to main
feature/epic2-auth        ✅ pushed — open PR → merge to main
feature/epic3-documents   ✅ pushed — open PR → merge to main
feature/epic4-folders     pending
feature/epic5-versions    pending
feature/epic6-search      pending
feature/epic7-dashboard   pending
feature/epic8-admin       pending
```

**How to create a branch:**
```bash
git checkout -b feature/epic3-documents
# ... do work ...
git add .
git commit -m "feat: implement document upload (DOC-1)"
git push origin feature/epic3-documents
# Then open PR on GitHub → merge to main
```

**What assessors look for:**
- Multiple feature branches visible in GitHub
- At least several PRs (open or merged)
- Meaningful commit messages on `main`

---

### PHASE 3 — EC2 Instance Setup

**Step 1: Launch EC2 on AWS**
- Go to AWS Console → EC2 → Launch Instance
- AMI: **Ubuntu 22.04 LTS** (free tier eligible)
- Instance type: `t2.micro` (free tier)
- Key pair: create new → download `.pem` file → keep it safe
- Security group — add these inbound rules:
  - SSH: port 22 (your IP)
  - HTTP: port 80 (anywhere)
  - Custom TCP: port 5000 (anywhere) ← backend API
  - Custom TCP: port 5173 (anywhere) ← optional for Vite preview

**Step 2: Connect to EC2**
```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@<EC2-PUBLIC-IP>
```

**Step 3: Install Node.js + PM2 on EC2**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
node -v && npm -v && pm2 -v
```

**Step 4: Clone your repo on EC2**
```bash
git clone https://github.com/<your-username>/document-manager.git
cd document-manager
```

**Step 5: Set up backend on EC2**
```bash
cd backend
npm install
nano .env   # paste your env vars (same as local)
```

**Step 6: Build frontend on EC2**
```bash
cd ../frontend
npm install
npm run build
# This creates frontend/dist/ — static files
```

**Step 7: Start backend with PM2**
```bash
cd ../backend
pm2 start server.js --name "doc-manager-backend"
pm2 save
pm2 startup   # follow the command it outputs to auto-start on reboot
```

**Step 8: Serve frontend with PM2 (using serve)**
```bash
sudo npm install -g serve
cd ../frontend
pm2 start "serve -s dist -l 3000" --name "doc-manager-frontend"
pm2 save
```

**Verify PM2 is running:**
```bash
pm2 status
# Should show both doc-manager-backend and doc-manager-frontend as "online"
```
> Screenshot this — it's required for Section 2.4

**Step 9: Access your app**
- Frontend: `http://<EC2-PUBLIC-IP>:3000`
- Backend API: `http://<EC2-PUBLIC-IP>:5000`

> Screenshot the browser showing your app with the public IP in the address bar — required for Section 2.6

---

### PHASE 4 — CI/CD Pipeline (3 marks)

**How it works:**
1. You push to `main` (via merged PR)
2. GitHub Actions runs tests
3. If tests pass → SSH into EC2 → pull latest code → rebuild → restart PM2

**Step 1: Add GitHub Secrets**

Go to your GitHub repo → Settings → Secrets and variables → Actions → New repository secret:

| Secret name | Value |
|---|---|
| `EC2_HOST` | Your EC2 public IP |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | Contents of your `.pem` file |
| `MONGO_URI` | Your MongoDB Atlas URI |
| `JWT_SECRET` | Your JWT secret |

> Screenshot the secrets page (with values hidden) — required for Section 2.3

**Step 2: Update `.github/workflows/ci.yml`**

The CI/CD workflow will:
- Run backend tests
- Build frontend
- Deploy to EC2 on push to `main`

(This will be implemented as part of SETUP-3 completion)

**What to screenshot for Section 2:**
- 2.1 — The `ci.yml` file open in GitHub
- 2.2 — Terminal output of `npm test` showing pass/fail
- 2.3 — GitHub repo Settings → Secrets page
- 2.4 — EC2 terminal showing `pm2 status` table
- 2.5 — GitHub Actions tab showing a completed workflow run with green steps
- 2.6 — Browser showing `http://<EC2-PUBLIC-IP>:3000` (your app's first page)

---

### PHASE 5 — README.md (3 marks)

Your `README.md` must include:
- Project name and description
- Tech stack
- How to run locally (backend + frontend commands)
- Environment variables needed (`.env.example`)
- GitHub Actions / CI/CD explanation
- EC2 public URL
- Screenshots of the running app

> Screenshot the README as rendered on GitHub — required for Section 3

---

### PHASE 6 — Submission Checklist

**Section 1 (GitHub + public URL):**
- [ ] GitHub repo URL is public and accessible
- [ ] EC2 public IP is accessible from browser
- [ ] Multiple feature branches and PRs visible on GitHub
- [ ] Commits on `main` are meaningful and frequent

**Section 2 (CI/CD screenshots — take these as you go):**
- [ ] 2.1 Screenshot of `ci.yml` in GitHub
- [ ] 2.2 Screenshot of test results in terminal (`npm test`)
- [ ] 2.3 Screenshot of GitHub Secrets configuration page
- [ ] 2.4 Screenshot of `pm2 status` output on EC2 terminal
- [ ] 2.5 Screenshot of GitHub Actions run page (green steps)
- [ ] 2.6 Screenshot of browser with `http://<EC2-IP>:3000` showing app

**Section 3:**
- [ ] README.md screenshot from GitHub

**Section 4:** Write discussion + conclusion in the Word doc

**Section 5 (Gen-AI disclosure — MANDATORY):**
- Tool used: Claude Code (Anthropic)
- Tasks: scaffolding, code generation, debugging, planning
- How you verified: tested locally, reviewed each file, adapted to your project

**Section 6:** Write personal reflection in the Word doc

**Section 7:** Add APA references

---

## Architecture Notes

- Auth flow mirrors sampleapp_IFQ636 exactly: `authController` → `authMiddleware` → `AuthContext` → protected `<Route>`
- All file access is authenticated (no public file URLs)
- Soft delete: documents get `deletedAt` timestamp, purged after 30 days
- Version history: each re-upload inserts a new `DocumentVersion` document
- Admin routes under `/api/admin/*` guarded by `roleMiddleware`
- MongoDB Atlas used for both local dev and production (same cluster, `doc-manager-db`)
- EC2 runs backend via PM2, frontend via `serve` (static build)
