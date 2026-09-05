# Garba Partner — Project Documentation

Garba Partner is a college-only Garba partner discovery and event platform.

## Product goal

Create a premium, playful, secure experience where verified college students can:
- create a profile
- discover eligible Garba partners
- choose Accept / Wait / Reject
- receive a final confirmation before committing
- get a mutual Garba Match when both students accept
- coordinate practice
- participate in event/community features

The product should feel like a **premium cultural-event product**, not a generic CRUD college portal.

## Recommended stack

### Frontend
- Next.js + TypeScript
- Tailwind CSS or SCSS with a tokenized design system
- Framer Motion for motion
- TanStack Query for server state
- Zod for client-side validation
- React Hook Form for forms

### Backend
- Java 21
- Spring Boot 3.x
- Spring Security
- Spring Data MongoDB
- Bean Validation
- Redis for rate limiting, short-lived state and caching

### Infrastructure
- Docker
- Nginx / managed reverse proxy
- HTTPS
- Object storage for profile images
- CI/CD with automated tests and security checks

## Architecture principle

> The frontend is an interface. The backend is the authority.

Every security-sensitive rule must be enforced server-side.

## Documentation map

| File | Purpose |
|---|---|
| `ARCHITECTURE.md` | Full system architecture |
| `PRODUCT_SPEC.md` | Product behavior and user journeys |
| `DESIGN_SYSTEM.md` | Visual language, UI rules and interaction design |
| `SECURITY.md` | Threat model and security controls |
| `API_SPEC.md` | REST API contracts |
| `DATA_MODEL.md` | MongoDB collections and invariants |
| `TESTING.md` | Test strategy and abuse testing |
| `AGENT_BUILD_PROMPT.md` | Master prompt for an autonomous coding agent |
| `AGENT_WORKFLOW.md` | Rules for how the agent should implement and verify changes |

## Non-negotiable product rules

1. Only verified college users can access the platform.
2. A user only sees profiles eligible for the configured matching policy.
3. Roll number is private by default.
4. Accept is irreversible once confirmed.
5. Reject can be undone while the decision remains in the reversible state.
6. Wait can be changed.
7. Every decision-changing operation is authorized and validated by the backend.
8. A mutual match is generated only from valid Accept states.
9. Users can report and block other users.
10. Admin operations require explicit backend authorization.
