# Garba Partner — API Specification

Base path:

```text
/api/v1
```

All protected endpoints require authentication.

## Standard success envelope

```json
{
  "status": "success",
  "data": {}
}
```

## Standard error envelope

```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Request could not be processed.",
  "requestId": "..."
}
```

Never return stack traces.

## Auth

```text
POST /auth/login
POST /auth/verify
POST /auth/refresh
POST /auth/logout
GET  /auth/me
```

## Profile

```text
GET   /profile/me
POST  /profile
PATCH /profile/me
POST  /profile/photo
DELETE /profile
```

## Discovery

```text
GET /discovery/profiles
GET /discovery/profiles/{publicId}
```

Discovery responses must be privacy-filtered.

## Decisions

```text
POST /decisions/{targetPublicId}/accept
POST /decisions/{targetPublicId}/reject
POST /decisions/{targetPublicId}/wait
DELETE /decisions/{targetPublicId}/reject
GET /decisions
```

`DELETE /reject` only works if current state is REJECTED and policy permits undo.

Accept endpoint:
- checks eligibility
- checks block state
- checks account status
- checks current decision
- performs atomic state transition
- creates match if reciprocal Accept exists
- creates audit event
- is idempotent for the same already-accepted state

## Matches

```text
GET /matches
GET /matches/{matchId}
```

## Blocking

```text
POST /blocks/{targetPublicId}
DELETE /blocks/{targetPublicId}
GET /blocks
```

## Reports

```text
POST /reports
GET /reports/me
```

## Notifications

```text
GET /notifications
POST /notifications/{id}/read
```

## Event

```text
GET /event
GET /event/leaderboard
GET /event/songs
POST /event/songs/{id}/vote
```

## Admin

```text
GET /admin/users
GET /admin/reports
PATCH /admin/reports/{id}
PATCH /admin/users/{id}/status
GET /admin/analytics
POST /admin/announcements
```

Every admin endpoint requires backend role authorization.

## API behavior rules

### 409 Conflict
Use for valid requests that violate current state, e.g.:

```text
ACCEPTED decision cannot be changed
```

### 403 Forbidden
Use when authenticated user is not authorized.

### 404 Not Found
Use where appropriate without leaking whether sensitive resources exist.

### 429 Too Many Requests
Use for rate limiting.

## Pagination

Use cursor-based pagination for large discovery lists where practical.

Never allow arbitrary unlimited page sizes.

## Idempotency

Decision-changing endpoints should safely handle retries.

Consider an idempotency key for high-value mutation requests.

## Optimistic UI

The frontend may optimistically animate a card, but authoritative state comes from the backend response.
