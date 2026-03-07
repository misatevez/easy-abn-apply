

## Analysis

Looking at the current "Our Services" section, the alignment is actually working reasonably well with the existing flexbox structure. The cards use `flex-1` for top content and `mt-auto` for bottom content. However, the issue is that:

1. The **price row heights differ** -- the Business Name card uses a pricing options box (two rows) while others show a single price, and the `min-h-[3.5rem]` isn't enough to equalize them.
2. The **Cancellations card** has an "includes" list in the top section that shifts content differently.

## Plan

**File: `src/components/ServicesSection.tsx`**

Restructure the card layout into 3 distinct zones with fixed minimum heights to guarantee alignment:

1. **Zone 1 (Top - flexible)**: Icon + Title + Description + Includes list -- uses `flex-1` to absorb variable content height.
2. **Zone 2 (Price - fixed height)**: Set `min-h-[4.5rem]` (increased from `3.5rem`) and use `flex items-end justify-start` so all prices and option boxes sit at the bottom of this zone consistently.
3. **Zone 3 (CTA + Note - fixed)**: Button and note text, stays pinned at the bottom via `mt-auto`.

The key fix is ensuring the price/options container has enough minimum height to accommodate the tallest variant (the Business Name 2-row pricing box) so that all CTA buttons start from the same vertical position.

Additionally, ensure the grid uses `items-stretch` (already implicit with CSS Grid) so all cards are the same height.

