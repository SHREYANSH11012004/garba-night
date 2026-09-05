# Garba Partner — Autonomous Agent Workflow

## Rule 1 — Inspect before changing

Before writing code:
1. inspect repository structure
2. inspect `.agents/`
3. read existing architecture/design instructions
4. identify current stack
5. identify existing reusable components
6. avoid replacing working infrastructure without reason

## Rule 2 — Design before implementation

For every major feature:
1. define user journey
2. define API contract
3. define backend invariant
4. define data changes
5. define UI states
6. define tests
7. implement

## Rule 3 — Backend authority

Never implement a security rule only in frontend code.

For every sensitive mutation document:
- who can call it
- what resource they can affect
- what state transitions are valid
- what happens on retries
- what gets audited

## Rule 4 — Design system

Before adding CSS:
- find existing tokens
- find existing component patterns
- reuse them
- add tokens when a new semantic concept is needed

Do not create random hardcoded colors or spacing values.

## Rule 5 — Component architecture

Keep:
- API calls in service/query layers
- business logic in backend
- visual components focused on presentation
- reusable UI components generic
- feature-specific components inside feature folders

## Rule 6 — Quality gates

After each meaningful implementation:
- format
- lint
- unit tests
- integration tests when applicable
- build
- inspect browser behavior
- inspect mobile layout

## Rule 7 — Security review

Before declaring the feature complete, ask:

```text
Can a user modify the request?
Can a user change the target ID?
Can a user call this endpoint without UI?
Can a user replay this request?
Can a user call it twice?
Can another user access the same resource?
Can an attacker enumerate IDs?
Can input reach a query unsafely?
Can uploaded content execute?
```

If any answer is uncertain, investigate before completion.

## Rule 8 — Documentation

Update relevant `.md` files whenever:
- architecture changes
- API changes
- data model changes
- security behavior changes
- design system changes
