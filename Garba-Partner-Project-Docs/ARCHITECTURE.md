# Garba Partner — Detailed Architecture

## 1. High-level architecture

```text
                         ┌─────────────────────┐
                         │       Student       │
                         │ Browser / Mobile Web│
                         └──────────┬──────────┘
                                    │ HTTPS
                                    ▼
                         ┌─────────────────────┐
                         │ CDN / WAF / Reverse │
                         │       Proxy         │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
          ┌──────────────────┐            ┌──────────────────┐
          │ Next.js Frontend │            │ Static / Image   │
          │ UI + SSR         │            │ Object Storage   │
          └────────┬─────────┘            └──────────────────┘
                   │ HTTPS API
                   ▼
          ┌──────────────────────┐
          │ Spring Boot Backend  │
          │ Modular Monolith     │
          └──────────┬───────────┘
                     │
       ┌─────────────┼─────────────────────────┐
       │             │                         │
       ▼             ▼                         ▼
┌────────────┐ ┌──────────────┐        ┌──────────────┐
│ MongoDB    │ │ Redis        │        │ Object       │
│ users,     │ │ rate limits, │        │ Storage      │
│ decisions, │ │ cache, locks │        │ profile imgs │
│ matches    │ │              │        │              │
└────────────┘ └──────────────┘        └──────────────┘
       │
       ▼
┌──────────────────┐
│ Audit / Security │
│ Events           │
└──────────────────┘
```

## 2. Why modular monolith first

Do not start with many microservices.

For a college event platform, one well-structured Spring Boot application is easier to:
- secure
- test
- deploy
- observe
- modify during an event
- reason about transaction boundaries

Use domain modules inside the backend. Split services only when a real operational requirement appears.

## 3. Backend module boundaries

```text
backend/
├── auth/
├── user/
├── profile/
├── discovery/
├── decision/
├── matching/
├── blocking/
├── reporting/
├── notification/
├── event/
├── leaderboard/
├── admin/
├── audit/
├── security/
└── common/
```

Each domain should separate:
- controller
- DTO
- service
- repository
- domain/entity
- validation

Controllers must remain thin.

## 4. Request flow

```text
Browser
  │
  ▼
Authentication middleware
  │
  ▼
Spring Security
  │
  ├── authentication
  ├── role check
  ├── account status
  └── request validation
  │
  ▼
Controller
  │
  ▼
Application Service
  │
  ├── business invariant checks
  ├── authorization
  ├── transaction
  └── audit event
  │
  ▼
Repository / Redis / Object Storage
```

## 5. Authentication

Preferred production pattern:

```text
College login / OAuth or verified college email
             │
             ▼
       Authenticated session
             │
             ├── short-lived access credential
             └── secure refresh mechanism
```

If JWT is used, use asymmetric signing and key rotation. Never put long-lived secrets in localStorage.

## 6. Decision state machine

```text
                 ┌─────────────┐
                 │   NONE      │
                 └──────┬──────┘
                        │
              ┌─────────┼──────────┐
              ▼         ▼          ▼
           WAITING    REJECTED   ACCEPTED
              │         │          │
              │         │          ▼
              └────┬────┘       LOCKED
                   │
                   ▼
               WAITING

REJECTED → NONE is allowed by policy.
WAITING  → REJECTED / ACCEPTED / NONE may be allowed.
ACCEPTED → any change is forbidden after final confirmation.
```

The exact transitions must be implemented atomically in the backend.

## 7. Mutual matching

```text
User A accepts User B
        │
        ▼
Check current valid state of B → A
        │
        ├── ACCEPTED ──► create Match
        │
        └── otherwise ─► no match yet
```

Create a unique constraint so the same pair cannot produce duplicate matches.

Normalize pair identity:

```text
pairKey = min(userA, userB) + ":" + max(userA, userB)
```

Store only one canonical pair.

## 8. Discovery architecture

Discovery should not return the full User document.

Create a dedicated `DiscoveryProfileDTO` containing only fields intended for discovery.

Example:

```json
{
  "publicId": "uuid",
  "displayName": "Ananya",
  "photoUrl": "...",
  "department": "CSE",
  "year": 3,
  "section": "A",
  "garbaLevel": "INTERMEDIATE",
  "favoriteSong": "Dholida",
  "compatibility": 87
}
```

Never expose:
- password hash
- email unless explicitly needed
- phone
- exact private identifiers
- moderation notes
- security metadata
- internal database IDs

## 9. Frontend architecture

```text
frontend/
├── app/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── profile/
│   ├── discovery/
│   ├── match/
│   ├── event/
│   └── admin/
├── features/
│   ├── auth/
│   ├── discovery/
│   ├── decisions/
│   ├── matches/
│   ├── profile/
│   └── notifications/
├── hooks/
├── lib/
├── services/
├── styles/
├── types/
└── tests/
```

Keep API calls outside presentational JSX.

## 10. Frontend state

Use server-state tooling for:
- profiles
- decisions
- matches
- notifications
- event data

Use local UI state for:
- modal open/close
- card animation
- temporary form state
- filters

Do not duplicate authoritative backend state in multiple stores.

## 11. Notification architecture

Initial implementation:
- in-app notifications

Optional:
- email
- push
- WebSocket/SSE

Important events:
- profile approved
- someone matched
- mutual match
- event announcement
- report/moderation action

## 12. Deployment

```text
GitHub
  │
  ▼
CI
 ├── frontend lint/test/build
 ├── backend test/build
 ├── dependency scan
 ├── secret scan
 └── container scan
  │
  ▼
Docker images
  │
  ▼
Deployment
  │
  ├── frontend
  └── backend
       │
       ├── MongoDB
       ├── Redis
       └── Object Storage
```

## 13. Observability

Implement:
- structured logs
- request correlation ID
- health endpoint
- readiness endpoint
- error tracking
- security event counters
- latency metrics
- rate-limit metrics

Never log:
- passwords
- access tokens
- refresh tokens
- sensitive profile data unnecessarily
