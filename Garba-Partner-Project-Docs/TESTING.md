# Garba Partner — Testing Strategy

## Test pyramid

```text
                 E2E
               /     \
          Integration
            /       \
          Unit      Security
```

## Backend unit tests

Test:
- decision state transitions
- accept irreversibility
- reject undo
- wait transitions
- mutual matching
- block behavior
- report rules
- compatibility calculation
- authorization services

## Integration tests

Use a real or containerized MongoDB/Redis test environment.

Test:
- unique decision constraints
- duplicate match prevention
- concurrent Accept requests
- transaction behavior
- authentication
- authorization
- rate limiting

## Controller tests

Verify:
- validation
- HTTP status
- response envelope
- authentication requirement
- role requirement

## Frontend tests

Test:
- profile form
- modal confirmation
- decision states
- loading/error states
- keyboard interaction
- reduced motion
- responsive behavior

## E2E

Critical journey:

```text
register
→ verify
→ create profile
→ discover
→ reject
→ undo reject
→ wait
→ accept
→ confirm
→ reciprocal accept
→ match
```

## Security test cases

### Authorization
- student → admin endpoint
- user A → user B resource
- blocked user → protected interaction

### State manipulation
- ACCEPTED → REJECTED
- ACCEPTED → WAITING
- duplicate accept
- replay accepted request

### Enumeration
- sequential IDs
- discovery pagination abuse
- account existence

### Input
- XSS
- injection
- huge strings
- malformed JSON
- invalid enums

### Upload
- huge image
- wrong MIME
- polyglot file
- corrupt image
- executable extension

### Abuse
- login brute force
- OTP brute force
- mass registrations
- mass discovery requests
- mass reports

## Race conditions

Simulate:

```text
Request A: Accept
Request B: Reject
```

at the same time.

The backend must produce one valid final state according to the defined state machine.

## Definition of done

A feature is not complete until:
- happy path works
- error states work
- authorization is tested
- responsive UI is tested
- accessibility is checked
- security-sensitive invariants are tested
- documentation is updated
- build passes
