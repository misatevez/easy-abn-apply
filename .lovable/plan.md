

## Plan: Add "Renew my ABN" CTA alongside "Apply for ABN"

Since both actions lead to the same ABN Registration form (which already has the New vs. Reactivate toggle), the goal is to surface both paths clearly so customers who want to "renew" don't feel lost.

### Approach

Use a `?purpose=renew` query parameter on the ABN Registration link. When the form loads with this param, auto-select "Reactivate my Previous Individual ABN" in the ABNPurposeSection. Otherwise default behavior (no pre-selection).

### Changes

**1. Header navigation** (`Header.tsx`)
- Add "Renew my ABN" item under ABN Services dropdown, linking to `/abn-registration?purpose=renew`
- Keep "ABN Registration" linking to `/abn-registration` as-is

**2. Footer navigation** (`Footer.tsx`)
- Add "Renew my ABN" under Registration Services, linking to `/abn-registration?purpose=renew`

**3. Hero section** (`HeroSection.tsx`)
- Replace single CTA with two side-by-side buttons:
  - "Apply for a new ABN" → `/abn-registration`
  - "Renew my ABN" → `/abn-registration?purpose=renew`
- Both use the `hero` variant; the renew button uses `hero-outline` to differentiate

**4. CTA Banner** (`CTABanner.tsx`)
- Add a secondary "Renew my ABN" button next to "Apply Now"

**5. Services Section** (`ServicesSection.tsx`)
- Update ABN Registration card description to mention "Apply or renew"
- Add a second smaller link/button "Renew my ABN" below the main CTA

**6. ABN Registration page** (`ABNRegistration.tsx`)
- Read `?purpose=renew` from URL search params on mount
- If present, pre-set `abnPurpose` to `"reactivate"` in the initial form state

**7. ABNPurposeSection** (`ABNPurposeSection.tsx`)
- No structural changes needed — it already handles `form.abnPurpose === "reactivate"`

### Technical Detail
- Use `useSearchParams()` from `react-router-dom` in `ABNRegistration.tsx` to read the query param
- Pass it into `initialForm` via a `useMemo` or set it in a `useEffect` on mount

