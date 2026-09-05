# Garba Partner — Product Specification

## 1. Brand

Name: **Garba Partner**

Core message:

> Find your rhythm. Find your partner. Own the Garba night.

Tone:
- energetic
- youthful
- premium
- playful
- culturally inspired
- not childish
- not dating-app-like

## 2. Primary journey

```text
Landing
  ↓
College verification
  ↓
Create profile
  ↓
Profile review / activation
  ↓
Discover
  ↓
Accept / Wait / Reject
  ↓
Final confirmation modal
  ↓
Decision saved
  ↓
Mutual Accept
  ↓
Garba Match
  ↓
Practice coordination
  ↓
Garba Night
  ↓
Memories / leaderboard
```

## 3. Pages

### Landing
- cinematic hero
- Garba-inspired motion
- countdown
- CTA
- how it works
- trust/security section
- event information

### Authentication
- college verification
- OTP/email verification
- login
- account recovery

### Profile setup
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
- favorite song
- Garba style
- short bio
- availability

### Discover
- premium profile cards
- Accept
- Wait
- Reject
- filters
- compatibility indicator
- keyboard support
- responsive swipe mode

### Decisions
Tabs:
- Accepted
- Waiting
- Rejected

### Matches
- mutual matches
- match animation
- partner details allowed by privacy policy
- practice planning

### Garba Zone
- songs
- leaderboard
- badges
- event countdown
- practice spots
- announcements

### Profile
- edit allowed fields
- privacy
- blocked users
- account deactivation

### Admin
- users
- reports
- profile moderation
- event settings
- analytics
- announcements
- audit/security activity

## 4. Confirmation modal

### Accept

Title:
`Final check before the Garba circle`

Message:
`You're about to accept this person as a Garba Partner. Once confirmed, this decision cannot be changed.`

Actions:
- Go Back
- Confirm Accept

### Reject

Message:
`You're about to reject this profile. You can undo a rejection later.`

Actions:
- Cancel
- Reject

### Wait

Message:
`Keep this profile on your radar. You can change this decision later.`

Actions:
- Cancel
- Confirm Wait

The final action must be sent to the backend only after explicit confirmation.

## 5. Compatibility score

Call it:

**Garba Compatibility**

Never present it as romantic compatibility.

Possible factors:
- dance level
- preferred Garba style
- favorite song
- practice availability
- event preference
- optionally department/year proximity

The score is a fun recommendation signal, not a promise.

## 6. Exciting features

### Mystery Partner
Opt-in event mode that hides identity until a configured reveal time.

### Practice Match
After mutual match, show overlapping availability.

### Garba XP
Points for healthy participation:
- complete profile
- attend event
- practice
- participate in society activity

Avoid rewarding spam or mass interactions.

### Badges
- Garba Rookie
- Rhythm Hunter
- Dhol Addict
- Dance Machine
- Garba Legend

### Garba Wall
Moderated anonymous community posts.

### Song voting
Students vote for event songs.

### Campus practice map
Display approved practice zones.

### Memories
Post-event photos and approved student-tagging.

## 7. Accessibility

Required:
- keyboard navigation
- visible focus states
- reduced-motion support
- semantic HTML
- accessible modal dialogs
- sufficient contrast
- alt text for meaningful images
- touch targets at least comfortable for mobile use
- do not make color the only signal

## 8. Responsive behavior

Desktop:
- immersive layout
- multi-column discovery

Tablet:
- two-column or single-card layout

Mobile:
- one profile card
- bottom action bar
- swipe gestures optional
- modal becomes bottom sheet where appropriate

## 9. Error states

Every major operation needs:
- loading
- empty
- success
- validation error
- authorization error
- rate-limited state
- server error
- offline/network retry state

Never show raw stack traces to users.
