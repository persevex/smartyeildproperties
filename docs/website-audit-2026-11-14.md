# Smart Yield website audit — 14 November 2026

Scope: current local repository and browser preview; no production deployment, inbox delivery, telephone connection or fresh regulatory verification was tested. No website content was changed during this audit.

## Result

The site loads successfully, but it does not yet meet the requirement to show only Smart Yield company branding and avoid references to other websites.

## Checks passed

- Production build and property-data validation passed for all 188 projects.
- Browser smoke test loaded 215 routes: eight main pages, 12 article pages, seven role pages and 188 property pages. No JavaScript page errors were recorded.
- No outbound the previous brand links were found in the rendered pages. Blog, job and privacy pages remain local.
- FAQ expansion, enquiry modal opening and blog search worked. The property keyword route loaded filtered listings.
- Seven representative pages had no horizontal overflow at 390px width.
- No completed image requests with zero intrinsic width were detected. This is not proof that every deferred image or third-party map loads.
- Current phone links use +91 80952 58927; the company website text is smartyieldproperties.com.

## Issues to resolve

1. **Homepage testimonials still mention the previous brand.** The section introduction, review attributions and several review texts refer to that business. These should be removed or replaced with genuine Smart Yield testimonials, rather than relabelled as Smart Yield reviews.
2. **Property details link to other websites.** Registration sources, price sources and map sources include builders, Housing.com, Magicbricks, Square Yards and other research sites. These conflict with the requested presentation. Source records can be retained internally while removing their promotional/public links. Government RERA verification and Google Maps also remain external services.
3. **Enquiries use the HR email.** The default recipient and example configuration are hr@smartyieldpropeties.com. The local preview opens an email app; it does not directly send or store enquiries. No direct submission endpoint is configured in the local preview. Production settings were not inspected.
4. **No complete general enquiry email has been supplied.** smartyieldproperties.com is displayed as requested, as a website address. It is not an email recipient. The HR domain spelling is retained exactly as supplied.
5. **Property information remains incomplete.** 173 of 188 projects have numeric/listed prices, 133 have published RERA IDs and 52 have exact-map source records. Remaining map views use searches and explicitly indicate that the exact pin is unconfirmed. The data validator checks consistency, not the current truth of every price, registration or availability claim.
6. **Unknown URLs show property search instead of a not-found page.** A clearly invalid path loaded the property search heading.
7. **Minor homepage journal issue:** dates removed from article data leave an empty date bullet in the insights slider; it also still uses the “Project Review” label where the linked pages are buyer guides.
8. **Build size warning:** main JavaScript bundle is approximately 762 kB before compression. This is a performance improvement opportunity, not a build failure.

## Distinguishing company branding from project identity

Smart Yield is the website/company brand. Actual builder and project names identify third-party properties accurately; they should not be changed to imply Smart Yield constructed or owns them. A separate decision is needed if the presentation must hide builder names, beyond removing links to outside websites.

## Limits

This was a quick functional and branding audit. It does not certify all business claims, image ownership, testimonial authenticity, all keyboard/accessibility flows, every filter combination, live map accuracy, production hosting configuration or successful delivery of enquiries. Those require focused checks and, for business facts, supporting records.
