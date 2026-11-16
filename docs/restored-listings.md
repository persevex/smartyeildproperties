# Restored listings and researched property details

Updated 13 November 2026. All 109 formerly hidden records are visible again, bringing the collection back to 188 projects. Research added fields to 108 records and found numeric advertised prices for 94; 173 projects now have numeric prices in total. The remaining 15 include 13 properties with no confidently matched public price and two commercial/corporate portfolio references. No numeric price was invented to make a record appear complete.

The original inventory remains in `src/data/properties.json`. Reviewed enrichment lives in `src/data/property-enrichment.json`. Every added field has a source URL, source kind and checked date. The application fills missing fields while preserving supplied facts. The only supplied-value corrections are explicitly recorded: Beaumont Estate is apartments rather than plots, and Victoria Park's dedicated row-house listing is classified as row houses rather than apartments.

`src/data/property-enrichment-report.json` lists unresolved fields and pricing gaps. `src/data/property-research-report.json` reflects the merged RERA and map coverage. Sourced addresses/localities fill the nine formerly missing locations. Exact map pins remain distinguished from unconfirmed map searches.

## Research rules

- Prefer project-specific builder pages, FAQs, floor-plan tables and construction documents. Cross-check relevant property portals where the builder does not publish the missing information.
- Match the name, locality, builder and phase/registration where available. Exclude same-name projects in other countries, neighboring developments, and wrong-phase search hits.
- Keep original, source-listed configurations and unit sizes. When a portal's asking range spans other layouts/phases, label it project-wide and explain its scope in the price disclosure.
- Keep historical builder campaigns distinct from portal asking ranges. A source check date is not a guarantee of live price, completion or availability. Completed and sold-out listings retain their original status and do not gain sale enquiry buttons.
- Do not turn monthly office lease rates into sale prices, entire business-park floor areas into unit sizes, or carpet areas into saleable areas. Confirm measurement basis before comparing plans.
- Assetz House is a corporate-office reference. Vrindavan Tech Village is a historical commercial portfolio reference, now Embassy Tech Village. Both remain visible with portfolio labels and no sale enquiry.
- Corporate and commercial references without public numeric sale quotes remain on request. Lodha Whitefield has no confirmed public cost sheet and retains its original upcoming status.

## Scope exceptions

- Victoria Park row houses use their own builder page and phase, rather than apartment prices.
- Provident Equinox's quoted range is explicitly limited to the matched Phase II registration. Sundeck's former campaign price is marked historical.
- Sun & Sanctum phases use distinct sources and registrations. Marq 3A/3B pricing remains on request when exact phase allocation cannot be established.
- Bloom & Dell lists both phase registrations, with source-specific price and possession scope. Morzaria Grandeur's published registration is scoped to Phase 2 (W1), not every unit in the wider development.
- HRC Pristine uses a historical builder price because the portal prints a conflicting registration date. Builder registration numbers are preserved.
- Builder-quoted Tiara pricing concerns its currently advertised 4.5 BHK category; the older portal table is not substituted for that offer.

Run `npm run check:properties` to validate the shared collection, sources, preserved supplied values, recorded corrections, price gaps, map views and availability rules. Run `npm run build` for the production build.
