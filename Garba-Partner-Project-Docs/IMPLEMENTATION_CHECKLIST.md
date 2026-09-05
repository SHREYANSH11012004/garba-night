# Garba Partner — Implementation Checklist

## Foundation
- [ ] Repository inspected
- [ ] `.agents/` inspected
- [ ] Existing design system inspected
- [ ] Architecture documented
- [ ] Environment configuration documented
- [ ] Secrets excluded from Git

## Authentication
- [ ] College verification
- [ ] Login
- [ ] Logout
- [ ] Session refresh
- [ ] Account recovery
- [ ] Admin authentication hardening

## Profile
- [ ] Profile creation
- [ ] Profile editing
- [ ] Photo upload
- [ ] Validation
- [ ] Privacy filtering
- [ ] Account deactivation

## Discovery
- [ ] Eligible profiles only
- [ ] Pagination
- [ ] Loading state
- [ ] Empty state
- [ ] Error state
- [ ] Compatibility score
- [ ] Responsive card

## Decisions
- [ ] Accept modal
- [ ] Wait modal
- [ ] Reject modal
- [ ] Accept irreversible server-side
- [ ] Reject undo
- [ ] Wait change
- [ ] Idempotency
- [ ] Audit events

## Matching
- [ ] Mutual Accept detection
- [ ] Unique pair constraint
- [ ] Match animation
- [ ] Match page

## Community
- [ ] Practice planner
- [ ] Song voting
- [ ] Leaderboard
- [ ] Badges
- [ ] Announcements
- [ ] Mystery Partner
- [ ] Moderated Garba Wall
- [ ] Memories

## Moderation
- [ ] Report
- [ ] Block
- [ ] Admin review
- [ ] User suspension
- [ ] Audit logs

## Security
- [ ] Authentication
- [ ] Authorization
- [ ] IDOR protection
- [ ] Rate limiting
- [ ] CSRF strategy
- [ ] XSS protection
- [ ] Injection protection
- [ ] Upload security
- [ ] Security headers
- [ ] Secret scanning
- [ ] Dependency scanning

## QA
- [ ] Unit tests
- [ ] Integration tests
- [ ] Controller tests
- [ ] E2E
- [ ] Concurrent mutation test
- [ ] Security abuse test
- [ ] Mobile test
- [ ] Accessibility test
- [ ] Reduced-motion test
- [ ] Production build
