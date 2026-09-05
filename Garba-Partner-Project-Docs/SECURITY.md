# Garba Partner — Security Architecture

## Threat model

Assume students will:
- inspect frontend JavaScript
- modify API requests
- use Postman
- use browser DevTools
- enumerate IDs
- replay requests
- automate requests
- upload malicious files
- attempt privilege escalation
- test admin routes
- attempt XSS
- attempt injection
- try to bypass irreversible decisions

## Security principles

1. Never trust client input.
2. Authenticate every protected request.
3. Authorize every protected resource.
4. Enforce business invariants in the backend.
5. Minimize data returned to clients.
6. Rate-limit abuse-prone endpoints.
7. Log security events without logging secrets.
8. Fail closed.

## Authentication

- college-only identity
- verified email/domain or approved OAuth provider
- strong session handling
- short-lived access credentials
- secure refresh mechanism
- logout/revocation
- optional/required 2FA for administrators

Never:
- store passwords in plain text
- store long-lived auth tokens in localStorage
- expose auth secrets to frontend code

## Authorization

Roles:

```text
STUDENT
MODERATOR
ADMIN
SUPER_ADMIN
```

Every admin API must check role server-side.

Object-level authorization must be checked for:
- profiles
- decisions
- matches
- reports
- notifications
- account settings

## IDOR prevention

Never do:

```text
GET /profiles/{id}
```

and return the object merely because the ID exists.

Check:
- authenticated user
- visibility policy
- relationship
- block state
- event state
- authorization

Use public UUIDs where appropriate.

## Decision security

Accept is an irreversible business operation after confirmation.

Backend must reject:
- ACCEPTED → REJECTED
- ACCEPTED → WAITING
- ACCEPTED → NONE

Use atomic database operations / transactions as appropriate.

## Rate limiting

Protect:
- login
- OTP
- password reset
- registration
- discovery
- accept/reject/wait
- report
- image upload
- admin endpoints

Use Redis or an equivalent distributed limiter.

## CSRF

If cookies are used for authentication:
- enable CSRF protection where appropriate
- use SameSite cookies
- validate origin/referer for sensitive flows where appropriate

If bearer tokens are used in a pure API architecture, still review browser exposure and CSRF implications carefully.

## XSS

- escape user-generated content
- sanitize rich text if ever introduced
- do not render arbitrary HTML
- deploy Content Security Policy
- avoid unsafe inline scripts

## Injection

Use typed/parameterized database access.

Do not concatenate user input into:
- Mongo queries
- SQL
- shell commands
- HTML
- redirects

## File upload security

Profile photos:
- enforce size limit
- validate MIME type
- validate actual file signature
- decode/re-encode images
- generate server-side filenames
- prevent executable content
- store in object storage
- never execute uploaded content
- optionally strip EXIF metadata

## Privacy

Private by default:
- roll number
- email
- phone
- internal IDs
- moderation notes

Discovery should return a dedicated public DTO.

## Account abuse

Detect:
- repeated registration
- many accounts from same source
- rapid profile interactions
- ID enumeration
- repeated authorization failures
- suspicious admin behavior

Response:
- rate limit
- CAPTCHA/challenge
- temporary lock
- moderator review

## Security headers

Configure:
- Content-Security-Policy
- Strict-Transport-Security
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

## Audit events

Record:
- LOGIN_SUCCESS
- LOGIN_FAILURE
- ACCOUNT_CREATED
- PROFILE_UPDATED
- DECISION_ACCEPTED
- DECISION_REJECTED
- DECISION_WAITING
- MATCH_CREATED
- REPORT_CREATED
- BLOCK_CREATED
- ADMIN_ACTION
- SECURITY_RATE_LIMIT
- AUTHORIZATION_DENIED

Do not record passwords or raw tokens.

## Dependency security

CI should run:
- dependency vulnerability scanning
- secret scanning
- SAST where practical
- container scanning
- lockfile validation

## Abuse testing

Before launch, manually test:
- user A accessing user B's profile
- user A changing user B's decision
- student calling admin API
- changing gender in request
- modifying accepted decision
- ID enumeration
- replaying decision request
- duplicate requests
- oversized uploads
- malicious image files
- XSS payloads
- injection payloads
- rate-limit bypass attempts
