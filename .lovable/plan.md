

## Redesign: Full-width fintech-style hero

### What changes

**Remove**: Floating white card, secondary ABN Finder/Lookup buttons, the split two-section layout, `bg-muted/30` section.

**Replace with**: Single full-width section with blue gradient background containing all content directly.

### New structure (top to bottom)

1. **Background** — Single section with `bg-gradient-to-b from-[#2F6FE4] to-[#5C8EF5]`, decorative circles at reduced opacity (`0.03`–`0.04`), generous padding (`pt-28 md:pt-32 pb-20 md:pb-24`).

2. **Accredited badge** — Same pill style but adapted for dark background: `border-white/20 bg-white/10 text-white` with Shield icon.

3. **Title** — White text, "Online" highlighted with a lighter blue/white contrast (e.g. `text-blue-200` or keep distinct). Large bold heading.

4. **Subtitle** — Two lines in `text-white/90` and `text-white/70`, centered.

5. **Primary CTA** — Single "Start ABN Application" button, white bg with blue text (`bg-white text-primary hover:bg-white/90`), rounded, with shadow.

6. **Secondary links** — Two inline text links in white/80 separated by a `·` dot: "Renew an existing ABN · Find an ABN". Links go to `/abn-registration?purpose=renew` and `#abn-finder`.

7. **Trust indicators** — Same three items but in white text with `text-white/70` icons.

### File modified

- `src/components/HeroSection.tsx` — Complete rewrite of the JSX, single `<section>` element replacing the two-section card layout.

### No changes to

- Logo sizes, other components, routes, Index.tsx, button variants (we'll use inline classes for the white CTA button).

