# Master Build Prompt — Garba Partner

You are the lead product engineer, security engineer, UX engineer and QA engineer responsible for building the complete **Garba Partner** platform.

## Mission

Build a production-quality college-only Garba partner discovery and event platform called **Garba Partner**.

The result must feel like a premium, modern cultural-event product and must be secure enough to withstand technically curious B.Tech students manually manipulating frontend and API requests.

Do not build a generic CRUD dashboard.

---

# PHASE 0 — REPOSITORY RECONNAISSANCE

Before coding anything:

1. Inspect the entire repository.
2. Inspect `.agents/` and read every relevant architecture, design, frontend, backend, security and testing instruction.
3. Identify the existing stack and preserve it unless there is a strong reason to change it.
4. Inspect existing design tokens/components before creating new UI.
5. Create or update project documentation.
6. Produce a concise implementation plan in the repository before major changes.

Use existing project conventions whenever they are sound.

The existing engineering direction emphasizes modular architecture, explicit service boundaries, tokenized styling, co-located component styles, clean API layers, automated quality gates and security-first backend authorization. Preserve those principles.

---

# PHASE 1 — PRODUCT FOUNDATION

Implement:

## Authentication

College-only onboarding.

Support the project's appropriate college verification mechanism:
- approved college email domain
- OTP/email verification
- or configured OAuth provider

Never allow arbitrary public registration without verification.

Roles:

```text
STUDENT
MODERATOR
ADMIN
SUPER_ADMIN
```

Admin roles must never be controlled by frontend state.

---

# PHASE 2 — PROFILE

Create a polished profile onboarding flow.

Required:
- photo
- name
- gender
- roll number
- year
- section
- department

Optional:
- Garba experience
- favorite Garba song
- Garba style
- availability
- short bio

Privacy:
- roll number private
- email private
- phone private
- internal IDs private

Create a dedicated discovery DTO. Never return the complete user document.

---

# PHASE 3 — DISCOVERY

Create a premium discovery experience.

Desktop:
- editorial profile cards
- subtle motion
- strong typography
- generous whitespace

Mobile:
- one profile at a time
- touch-friendly actions
- optional swipe interaction

Each profile:
- photo
- display name
- year
- department
- section where appropriate
- Garba level
- favorite song
- short bio
- Garba Compatibility

Do not frame the feature as dating. It is a Garba event partner system.

Only show profiles permitted by the configured matching policy.

Enforce eligibility on the backend.

---

# PHASE 4 — DECISION SYSTEM

Actions:

```text
ACCEPT
WAIT
REJECT
```

## Accept

When the user taps Accept:
1. animate the intended action
2. open a confirmation modal
3. explain clearly that the decision becomes irreversible after confirmation
4. require explicit confirmation
5. send mutation to backend
6. update UI from authoritative response

Backend must enforce:

```text
ACCEPTED → REJECTED = FORBIDDEN
ACCEPTED → WAITING  = FORBIDDEN
ACCEPTED → NONE     = FORBIDDEN
```

Repeated identical Accept requests should be safely idempotent.

## Reject

Reject is reversible according to policy.

Allow:
```text
REJECTED → NONE
```

Only when the user is the actor and policy permits it.

## Wait

Wait remains changeable.

---

# PHASE 5 — MUTUAL MATCH

If:

```text
A → ACCEPT B
B → ACCEPT A
```

create one canonical Match.

Prevent duplicates with a unique pair key.

Show a beautiful match reveal:

```text
YOU'VE GOT A
GARBA MATCH
```

Then transition into:
- partner information allowed by privacy policy
- practice planning
- shared availability
- event information

---

# PHASE 6 — EXCITING FEATURES

Implement these after core matching works:

## Garba Compatibility

A transparent fun score based on event-related preferences.

Never call it romantic compatibility.

## Mystery Partner

Opt-in mode where partner identity is revealed at an event-configured time.

## Garba XP

Reward meaningful participation, not spam.

## Badges

Examples:
- Garba Rookie
- Rhythm Hunter
- Dhol Addict
- Dance Machine
- Garba Legend

## Practice Planner

Show overlapping availability between matched partners.

## Garba Zone

Include:
- event countdown
- songs
- song voting
- announcements
- approved practice locations
- leaderboard

## Garba Wall

Moderated anonymous posts.

## Memories

Post-event approved photos and memories.

---

# PHASE 7 — ADMIN PANEL

Create a secure admin console.

Features:
- user moderation
- profile approval
- reports
- blocks
- announcements
- event settings
- song management
- leaderboard controls
- analytics
- audit/security events

Require explicit backend authorization for every admin operation.

---

# SECURITY REQUIREMENTS

Assume users will use:
- DevTools
- Postman
- Burp Suite
- custom scripts

Assume they will modify every request they can.

Implement:

## Authentication
- secure session/token strategy
- short-lived access credentials
- secure refresh mechanism
- logout/revocation
- stronger authentication for admins

## Authorization
Every protected resource must perform object-level authorization.

Prevent:
- IDOR
- privilege escalation
- cross-user modification
- admin API access by students

## Rate limiting

Use Redis or equivalent for:
- login
- OTP
- registration
- discovery
- decision mutations
- reports
- uploads
- admin endpoints

## Input validation

Use backend DTO validation and allowlists.

## XSS

Escape user content and use CSP.

## Injection

Use parameterized/typed queries.

## Upload security

For profile images:
- size limit
- MIME validation
- file signature validation
- decode/re-encode
- server-generated filenames
- object storage
- no executable uploads

## Security headers

Configure appropriate:
- CSP
- HSTS
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

## Audit logging

Record security-sensitive actions without secrets.

---

# DATA MODEL

Use a clean model around:

```text
User
StudentProfile
PartnerDecision
Match
Block
Report
Notification
AuditEvent
Event
Song
Badge
UserBadge
```

Use unique constraints for:
- user identity
- actor-target decision pair
- canonical match pair
- relevant votes

---

# API DESIGN

Use:

```text
/api/v1
```

Resource-oriented endpoints.

Examples:

```text
GET    /profile/me
POST   /profile
PATCH  /profile/me

GET    /discovery/profiles

POST   /decisions/{id}/accept
POST   /decisions/{id}/reject
POST   /decisions/{id}/wait
DELETE /decisions/{id}/reject

GET    /matches
GET    /notifications

POST   /blocks/{id}
POST   /reports
```

Use standard success/error envelopes.

Never return stack traces.

Use correct HTTP semantics:
- 401 unauthenticated
- 403 unauthorized
- 404 appropriate not-found
- 409 state conflict
- 422 validation where appropriate
- 429 rate limited

---

# DESIGN DIRECTION

This is a high-priority requirement.

Create a visual identity that feels:

```text
premium
+
editorial
+
Indian festive
+
modern nightlife
+
college energy
```

The inspiration is a sophisticated festival product, not a template.

Use:
- dramatic typography
- strong image composition
- controlled festive accents
- subtle circular/radial motifs
- excellent whitespace
- layered depth
- tasteful motion

Avoid:
- generic dashboard UI
- excessive cards
- excessive gradients
- random neon
- excessive emoji
- childish visuals
- dating-app clichés

Use a three-tier design token system:

```text
Primitive
   ↓
Semantic
   ↓
Component
```

No random hardcoded colors inside components.

Support light/dark themes if the repository's design system permits it.

---

# MOTION

Use Framer Motion or the existing project motion system.

Create motion for:
- page transitions
- discovery cards
- confirmation
- accept/reject/wait feedback
- match reveal
- badges
- countdown

Respect:

```text
prefers-reduced-motion
```

Motion must communicate state, not exist only for decoration.

---

# ACCESSIBILITY

Implement:
- keyboard navigation
- visible focus
- semantic HTML
- accessible dialogs
- focus trapping
- ESC behavior where safe
- reduced motion
- good contrast
- meaningful alt text
- mobile touch targets

---

# FRONTEND ARCHITECTURE

Keep:

```text
components
features
hooks
services
types
styles
tests
```

Do not put API calls directly inside visual JSX components.

Use a server-state library if one exists or is appropriate.

---

# BACKEND ARCHITECTURE

Use:

```text
controller
DTO
service
repository
domain/entity
validation
security
```

Controllers remain thin.

Business rules belong in application/domain services.

---

# QUALITY GATES

After implementation:

1. run frontend lint
2. run frontend tests
3. run frontend build
4. run backend tests
5. run backend build
6. run integration tests
7. inspect responsive UI
8. test keyboard accessibility
9. test reduced motion
10. perform security abuse tests

Do not declare completion while the build is broken.

---

# ADVERSARIAL TESTING

Before final completion, act like a malicious B.Tech student.

Try:

```text
change targetUserId
change gender
change role
change decision state
call admin endpoint
access another user's profile
enumerate IDs
replay Accept
send Accept and Reject concurrently
send duplicate Accept requests
bypass confirmation modal
send malformed JSON
send huge strings
upload malicious files
send XSS payload
attempt injection
brute force login/OTP
spam discovery
spam reports
```

The UI must not be considered the security boundary.

---

# DESIGN QA

After building every major screen, inspect it visually and improve it.

Ask:

1. Does it look like a real premium product?
2. Does it look intentionally designed?
3. Is hierarchy obvious?
4. Is whitespace good?
5. Are animations subtle?
6. Does mobile feel first-class?
7. Are empty/loading/error states designed?
8. Is the page visually consistent with the rest of the product?
9. Does anything look like a generic component-library demo?

If yes, refine it.

---

# FINAL DELIVERABLE

Deliver:

- complete frontend
- complete backend
- database models
- migrations/index definitions where applicable
- authentication
- authorization
- rate limiting
- profile management
- discovery
- decisions
- mutual matching
- notifications
- reports
- blocking
- admin panel
- event features
- responsive UI
- accessibility
- tests
- Docker setup if appropriate
- environment example
- complete README
- API documentation
- security documentation

Do not leave fake buttons or dead navigation.

If a feature is not implemented, do not pretend that it is. Either implement it or clearly mark it as a planned feature.

## Final principle

Build Garba Partner as if it will be demonstrated to:
- college students
- faculty
- developers
- cybersecurity students
- judges

It should be visually memorable, technically disciplined and difficult to abuse.
