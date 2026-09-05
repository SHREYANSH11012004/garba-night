# Garba Partner — Premium Design System

## Design direction

The interface should combine:

**Modern editorial web design + Indian festive energy + premium nightlife/event aesthetics.**

Avoid:
- generic Bootstrap-looking UI
- excessive gradients
- random neon colors
- clutter
- excessive rounded cards
- cheap "dating app" visual language
- emoji everywhere

Use restraint. The festival energy should come from typography, motion, composition and carefully controlled accents.

## Visual concept

### Core visual metaphor

The interface is a **Garba circle**.

Use circular/radial motifs subtly:
- ring loaders
- radial background patterns
- circular avatar frames
- orbit-like decorative elements
- rotating dandiya-inspired marks

Do not turn every component into a circle.

## Color architecture

Use a 3-tier token model:

1. Primitive tokens
2. Semantic tokens
3. Component tokens

Example:

```css
:root {
  --color-ink-950: ...;
  --color-paper-50: ...;
  --color-festival-500: ...;

  --bg-primary: var(--color-paper-50);
  --text-primary: var(--color-ink-950);
  --accent-primary: var(--color-festival-500);
}
```

Do not hardcode colors throughout components.

Support:
- light theme
- dark theme
- system preference

## Typography

Use a strong display typeface for:
- hero
- page titles
- major numbers

Use a highly readable sans-serif for:
- body
- forms
- metadata

Typography should create hierarchy without requiring huge font sizes everywhere.

## Layout

Use:
- generous whitespace
- asymmetric editorial sections
- strong grid alignment
- large hero typography
- intentional negative space

Recommended spacing scale:

```text
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128
```

## Profile card

A profile card should feel like an event pass, not a dating profile.

Hierarchy:

```text
PHOTO
small metadata
NAME
department / year
Garba compatibility
experience / song
short bio
actions
```

Avoid showing private identifiers.

## Buttons

Primary:
- visually dominant
- high contrast
- clear verb

Secondary:
- subtle

Destructive:
- visually distinct but not alarmist

Accept should feel celebratory.
Reject should feel neutral, not hostile.
Wait should feel calm.

## Motion

Use motion to explain state changes.

Examples:
- card entrance
- hover tilt at very low intensity
- confirmation modal
- match reveal
- countdown
- successful action
- badge unlock

Use spring-based transitions where appropriate.

Respect:

```css
@media (prefers-reduced-motion: reduce) {
  /* disable decorative animation */
}
```

## Match animation

When mutual acceptance happens:

```text
card
  ↓
soft scale
  ↓
radial ring
  ↓
partner photo reveal
  ↓
"Garba Match" typography
  ↓
CTA: Plan Practice
```

Keep the animation short.

## Interaction details

### Accept
Use a positive visual confirmation.

### Reject
Use a subtle dismiss animation.

### Wait
Use a hold/pause visual metaphor.

### Modal
Use:
- backdrop
- focus trap
- ESC close only if safe
- explicit final action
- no accidental click-through

## Dark mode

Dark mode should not simply invert the light theme.

Use a deep neutral base with controlled festive accents.

## Design QA

Every screen must be checked at:
- 360px
- 390px
- 768px
- 1024px
- 1440px
- large desktop

Check:
- overflow
- text wrapping
- modal positioning
- touch targets
- keyboard focus
- reduced motion
- loading states
- empty states

## Agent design rule

Before creating a component, inspect existing tokens and components. Reuse them instead of creating one-off styling.

The visual system must remain coherent across the entire product.
