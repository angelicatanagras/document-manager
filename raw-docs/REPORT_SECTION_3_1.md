# 3.1 SysML Design Diagrams

## 1. Requirement Diagram

The Requirement Diagram captures the functional and non-functional requirements of CloudDoc and illustrates how they relate to each other through dependency relationships.

At the top level, the **Personal Document Manager** is decomposed into two categories: **Functional Requirements** and **Non-Functional Requirements**.

**Functional Requirements** are further divided into two panels:

- **User Panel** — covers all end-user interactions, including Signup (R002), Login (R003), and Logout (R004). Document management requirements depend on a successful login and include Upload Docs (R005), View Docs (R006), Update Docs (R007), and Delete Docs (R009). A further dependency group captures organisation capabilities: Version History (R008), Folders (R011), Tags (R012), Search and Filter (R013), Expiry Reminder (R015), and Offline Access (R016).

- **Admin Panel** — covers administrator functions including Create User (R019), View Users (R010), Update User (R020), and Delete User (R021).

**Non-Functional Requirements** include **Security** (PIN-based protection) and **Performance** (NF002 — pages must load in under 2 seconds).

The `«depends on»` relationships between requirements show that document management features cannot function without authentication, and organisation features depend on documents already existing in the system.

---

## 2. Block Definition Diagram

The Block Definition Diagram defines the structural composition of CloudDoc and how its system blocks relate to one another.

The root block **PersonalDocumentManager** is composed of two high-level blocks:

- **UserPanel** — represents the user-facing side of the system. It is composed of two service blocks:
  - **AuthService** — handles authentication (login, signup, session management)
  - **DocumentService** — manages all document operations and is further composed of:
    - **VersionHistory** — tracks document revisions, with a `revisionCount: Integer` value property
    - **OrganisationService** — manages how documents are structured, composed of:
      - **Folder** — with value properties `id` and `name: String`
      - **SearchFilter** — enables search and filtering across documents

- **AdminPanel** — represents the administrator-facing side of the system, sitting alongside the UserPanel as a separate part of the root block.

The composition relationships (filled diamond arrows) indicate that all service blocks are owned by and cannot exist independently of their parent block, reflecting the tightly integrated nature of the system.
