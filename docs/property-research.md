# Property RERA and location research

Publication rule: all 188 source projects are restored. The 109 formerly hidden records were researched and enriched through `src/data/property-enrichment.json`; supplied facts are retained unless an explicit, sourced correction is recorded. See `property-enrichment-report.json` for numeric-price coverage and unresolved fields. Numeric prices are not invented for records with no reliable public quotation. Corporate-office and historical commercial portfolio records are labeled and do not offer a sale enquiry.

Checked 13 November 2026. The original 188-row inventory and supplied locality text are preserved. Research is applied by stable property ID from `src/data/property-research.json`, so rerunning the source importer does not erase enrichment.

133 projects have published or originally supplied registration numbers. 55 remain unconfirmed. 52 have project-specific published map pins/embeds. The original inventory had nine missing locations; enrichment supplies sourced addresses/localities for those records. Remaining maps are explicitly labeled project-and-locality searches rather than confirmed project pins. See `src/data/property-research-report.json` for all unresolved records.

Sources are linked on each property page. Published registration numbers do not establish current regulatory approval, exemption, availability, or a particular unit's registration. Some completed projects have no confirmed number; this is not treated as proof of exemption. Supplied numbers are retained with their provenance.

## Reviewed exceptions

- SOBHA generic organization coordinates point to the same office for many projects; these were excluded. Only project map coordinates were accepted.
- Victoria Park apartment and row-house listings use their respective phase registrations, rather than both numbers indiscriminately.
- Assetz Mizumi Reserve and Codename Sublime contain conflicting metadata/FAQ registrations. Mizumi uses its visible project registration; Sublime uses the Hoskote registration corroborated by project-specific listings. The conflicting generic registration was excluded.
- Sun & Sanctum Phase 2 uses its own phase-specific record rather than the phase 1 registration on their shared landing page.
- Assetz 18 & Oak has a Tamil Nadu registration and a project map near Hosur; its supplied Sarjapur–Attibele locality wording is retained. The Tamil Nadu regulator is linked.
- Agent registrations (`/AG/`) and acknowledgement numbers (`ACK/`) are excluded from project registrations. Extension prefixes (`EX/PRM/`) are preserved.
- Amogaya Adorit's intermediary listing has an inconsistent registration; two matching project records supply the replacement.
- Fresco at Purva Westend lists parent-project registrations with an explicit tower-allocation caveat. Carpe Diem lists the layout registration with a villa-construction scope caveat.
- Published map embeds are retained directly, rather than converting map viewport centres into supposedly exact project coordinates. Generic locality searches are never labeled confirmed pins.

- Morzaria Grandeur registration is scoped to phase 2 (W1), rather than applied to every phase. Bloom & Dell now lists both matched phase registrations.

## Completing unresolved records

For each unresolved entry, obtain the project/phase registration certificate and a project-specific Google Maps link or coordinates, then update its stable ID in `property-research.json`. Keep the source URL and checked date. Do not infer an exemption from a missing number, reuse a broker's agent registration, or apply one phase's number to another.

Map cards expand on demand; detail pages display their map by default. Maps use lazy-loaded Google Maps embeds and have external links as a fallback. No API key is required.
