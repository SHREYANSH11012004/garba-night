# Garba Partner — Data Model

## User

```text
User
- id: UUID
- collegeIdentity: string
- email: string
- passwordHash: string? 
- role: enum
- status: enum
- createdAt
- updatedAt
- lastLoginAt
```

## StudentProfile

```text
StudentProfile
- id: UUID
- userId: UUID
- displayName
- photoUrl
- gender
- rollNumber (private)
- year
- section
- department
- garbaLevel
- favoriteSong
- garbaStyle
- bio
- availability
- profileStatus
- createdAt
- updatedAt
```

## PartnerDecision

```text
PartnerDecision
- id
- actorUserId
- targetUserId
- state: NONE | WAITING | REJECTED | ACCEPTED
- createdAt
- updatedAt
- acceptedAt
```

Important index:

```text
unique(actorUserId, targetUserId)
```

## Match

```text
Match
- id
- pairKey
- userA
- userB
- createdAt
- status
```

Important:

```text
unique(pairKey)
```

## Block

```text
Block
- id
- blockerUserId
- blockedUserId
- createdAt
```

## Report

```text
Report
- id
- reporterUserId
- targetUserId
- reason
- description
- status
- createdAt
- resolvedAt
- resolvedBy
```

## Notification

```text
Notification
- id
- userId
- type
- title
- body
- read
- createdAt
```

## AuditEvent

```text
AuditEvent
- id
- actorUserId
- action
- targetType
- targetId
- requestId
- result
- createdAt
```

Do not store secrets.

## Event

```text
Event
- id
- name
- venue
- startsAt
- registrationClosesAt
- status
- settings
```

## Indexing strategy

Index:
- user email / college identity
- profile userId
- profile eligibility fields
- decision actor + target
- match pairKey
- block blocker + blocked
- notification userId + read
- audit actor + createdAt

Do not create indexes blindly. Measure query patterns.

## Data retention

Define retention for:
- audit logs
- reports
- deleted accounts
- old notifications
- event data

Document deletion/anonymization behavior before production.
