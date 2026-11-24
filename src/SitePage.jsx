"use client";

import {
  enquiryEndpoint,
  enquiryButtonLabel,
  enquiryPayload,
  enquiryEmailUrl,
  sendEnquiry,
} from "./enquiries.js";
import React, { useEffect, useId, useRef, useState } from "react";
import dropdownOptions from "./dropdownOptions.json";
import Homepage, { HomepageFooter } from "./Homepage.jsx";
import Career from "./Career.jsx";
import Blogs from "./Blogs.jsx";
import {
  BlogArticle,
  JobDetails,
  PrivacyPolicy,
  Newsroom,
  NotFound,
} from "./LocalPages.jsx";
import Contact from "./Contact.jsx";
import About from "./About.jsx";
import { PropertiesSearch, PropertyDetails } from "./PropertyPages.jsx";

const properties = [
  [
    "Brigade Altius",
    "altius",
    "Brigade Altius is a premium residential project on OMR Road, Chennai, offering spacious 3 and 4 BHK homes in high-rise towers with top-notch finishes, modern layouts, and a luxurious lifestyle experience.",
    "2.07",
    "3 & 4 BHK",
    "1726 - 2577",
    "Chennai, Sholinganallur",
    "3.75",
  ],
  [
    "Assetz Altitude",
    "altitude",
    "Assetz Altitude is a luxury residential project on Kanakapura Main Road, South Bengaluru. Spread across 5 acres, it offers 468 elegant high-rise apartments designed for modern living, combining comfort, style, and natural surroundings.",
    "2.53",
    "3 BHK",
    "1900 - 2100",
    "Bangalore, Kanakapura Road",
    "2.75",
  ],
  [
    "Assetz Micropolis",
    "micropolis",
    "Experience luxury at Assetz Micropolis, coming soon to Hosur Road, Kudlu Gate. Spread across 80 acres with 5 towers, it offers modern amenities, serene surroundings, and a lifestyle crafted for contemporary living.",
    "2.38",
    "3 & 4 BHK",
    "1900 - 2476",
    "Bangalore, Kudlu",
    "3.29",
  ],
  [
    "Assetz Zen & Sato",
    "zen",
    "Assetz Zen & Sato on Yelahanka–Bagalur Main Road offers premium 3 BHK, 4 BHK, and penthouses in a serene, Kyoto-inspired community with spacious layouts, landscaped gardens, and a refined, low-density living experience.",
    "2.95",
    "3 & 4 BHK",
    "2184 - 2955",
    "Bangalore, Yelahanka",
    "3.96",
  ],
  [
    "Brigade Morgan Heights",
    "morgan",
    "Brigade Morgan Heights in Perumbakkam, Medavakkam offers luxurious 2 & 3 BHK homes across 15-acre land with 3 towers and 15 floors. Starting at ₹1.14 Cr*, it’s a perfect blend of comfort and investment.",
    "1.25",
    "2, 3, & 4 BHK",
    "1251 - 2599",
    "Chennai, Perumbakkam",
    "2.69",
  ],
  [
    "Brigade Eternia",
    "eternia",
    "Brigade Eternia is a luxury high-rise residential project in Yelahanka, Bangalore. Spread across 14 acres, it offers 12 towers with 1,124 units, featuring 80% open space for a serene lifestyle.",
    "1.06",
    "1, 3, 3.5, & 4.5 BHK",
    "1620 - 2950",
    "Bangalore, Yelahanka",
    "4.46",
  ],
];
const categories = [
  "Apartments",
  "Villas",
  "Ready to Move",
  "2 BHK",
  "2.5 BHK",
  "3 BHK",
  "4 BHK",
  "Plots",
  "Pre Launch",
];
function NavPages({ isHome, onNavigate }) {
  const ref = useRef(null);
  useEffect(() => {
    const outside = (e) => {
      if (!ref.current?.contains(e.target) && ref.current)
        ref.current.open = false;
    };
    const escape = (e) => {
      if (e.key === "Escape" && ref.current?.open) {
        ref.current.open = false;
        ref.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <details className="more" ref={ref}>
      <summary>
        {isHome ? "Pages" : "More"}{" "}
        <span className="nav-caret" aria-hidden="true" />
      </summary>
      <div>
        {[
          ["/newsroom/", "Newsroom"],
          ["/about-us/", "About Us"],
          ["/career/", "Careers"],
          ["/blogs/", "Blogs"],
        ].map(([href, label]) => (
          <a
            href={href}
            key={href}
            onClick={() => {
              ref.current.open = false;
              onNavigate();
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </details>
  );
}
function Select({
  label,
  options,
  value,
  onChange,
  location = false,
  disabled = false,
  title,
}) {
  const [open, setOpen] = useState(false),
    [query, setQuery] = useState(""),
    [localValue, setLocalValue] = useState("");
  const root = useRef(null),
    trigger = useRef(null),
    input = useRef(null),
    list = useRef(null),
    id = useId();
  const searchable = location || label === "Property Type";
  const selected = value ?? localValue,
    placeholder =
      label === "Bed" ? "Beds" : label === "Bathroom" ? "Baths" : label;
  const items = [
    { text: placeholder, value: "" },
    ...options.map((o) => (typeof o === "string" ? { text: o, value: o } : o)),
  ].filter((o) => o.text.toLowerCase().includes(query.toLowerCase()));
  useEffect(() => {
    if (!open) return;
    (searchable ? input.current : list.current)?.focus();
    const selectedRow = list.current?.querySelector('[aria-selected="true"]');
    if (selectedRow && list.current) {
      const box = list.current;
      box.scrollTop = Math.max(
        0,
        selectedRow.offsetTop -
          box.offsetTop -
          box.clientHeight +
          selectedRow.offsetHeight,
      );
    }
    const outside = (e) => {
      if (!root.current?.contains(e.target)) setOpen(false);
    };
    const escape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("click", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("click", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open, searchable]);
  function choose(next) {
    setLocalValue(next);
    onChange?.({ target: { value: next } });
    setOpen(false);
    setQuery("");
    trigger.current?.focus();
  }
  function navigate(e) {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const rows = [...root.current.querySelectorAll('[role="option"]')];
    let index = rows.indexOf(document.activeElement);
    if (document.activeElement === list.current)
      index = rows.findIndex(
        (row) => row.getAttribute("aria-selected") === "true",
      );
    const next =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? rows.length - 1
          : e.key === "ArrowDown"
            ? (index + 1) % rows.length
            : index <= 0
              ? rows.length - 1
              : index - 1;
    rows[next]?.focus();
  }
  return (
    <div
      className={`${location ? "location-select" : "filter"} custom-select ${searchable ? "searchable" : ""} ${open ? "is-open" : ""}`}
      ref={root}
      title={title}
      onBlur={(e) => {
        if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget))
          setOpen(false);
      }}
    >
      {location ? (
        <span className="pin" aria-hidden="true" />
      ) : (
        <span id={`${id}-label`}>{label}</span>
      )}
      <button
        ref={trigger}
        type="button"
        disabled={disabled}
        className="dropdown-trigger"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-options`}
        onClick={() => {
          setQuery("");
          setOpen(!open);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        {options.find((o) => o.value === selected)?.text ||
          selected ||
          placeholder}
      </button>
      {open && (
        <div className="dropdown-menu" onKeyDown={navigate}>
          {searchable && (
            <div className="dropdown-search">
              <input
                type="search"
                autoComplete="off"
                ref={input}
                aria-label={`Search ${label}`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (items.length) choose(items[0].value);
                  }
                }}
              />
            </div>
          )}
          <div
            className="dropdown-options"
            ref={list}
            tabIndex={-1}
            id={`${id}-options`}
            role="listbox"
            aria-label={label}
          >
            {items.map((o) => (
              <button
                type="button"
                role="option"
                aria-selected={selected === o.value}
                className={`dropdown-option ${selected === o.value ? "selected" : ""}`}
                key={o.value}
                onClick={() => choose(o.value)}
              >
                <span>{o.text}</span>
                {selected === o.value && (
                  <svg aria-hidden="true" viewBox="0 0 16 16">
                    <path d="m3 8 3 3 7-7" />
                  </svg>
                )}
              </button>
            ))}
            {!items.length && (
              <div className="dropdown-empty">No results matched "{query}"</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
function SocialIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {name === "Facebook" ? (
        <path
          fill="currentColor"
          d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.8 3.7-3.8 1.1 0 2.2.2 2.2.2v2.5H15c-1.2 0-1.6.7-1.6 1.5V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12"
        />
      ) : name === "Instagram" ? (
        <g fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.5" cy="6.6" r=".7" fill="currentColor" />
        </g>
      ) : (
        <path
          fill="currentColor"
          d="M20 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2M8 19H5V9h3zM6.5 7.7a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4M19 19h-3v-5.2c0-1.5-.5-2.1-1.5-2.1s-1.7.7-1.7 2V19H10V9h2.8v1.4c.5-.9 1.4-1.6 2.7-1.6 2.6 0 3.5 1.6 3.5 4z"
        />
      )}
    </svg>
  );
}
function Pagination({ onPageChange, totalPages = 12, page: controlledPage }) {
  const [localPage, setPage] = useState(1);
  const page = controlledPage ?? localPage;
  const start = Math.max(1, page - 3),
    end = Math.min(totalPages, page + 3);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  function go(next) {
    const target = Math.max(1, Math.min(totalPages, next));
    if (target === page) return;
    setPage(target);
    onPageChange(target);
  }
  const arrow = (direction, double = false) => (
    <svg
      className="pagination-arrow"
      viewBox={double ? "0 0 16 20" : "0 0 8 20"}
      aria-hidden="true"
      style={direction === "left" ? { transform: "rotate(180deg)" } : undefined}
    >
      {double ? (
        <path d="m2 5 5 5-5 5m7-10 5 5-5 5" />
      ) : (
        <path d="m1 4 5 6-5 6" />
      )}
    </svg>
  );
  return (
    <div
      className="pagination flex"
      role="navigation"
      aria-label="Properties pagination"
    >
      {start > 1 && (
        <button type="button" className="pagination-edge" onClick={() => go(1)}>
          {arrow("left", true)}First
        </button>
      )}
      {page > 1 && (
        <button
          type="button"
          className="pagination-direction pagination-previous"
          onClick={() => go(page - 1)}
        >
          {arrow("left")}Previous
        </button>
      )}
      {pages.map((n) => (
        <button
          type="button"
          key={n}
          className={page === n ? "current" : ""}
          aria-label={`Page ${n}`}
          aria-current={page === n ? "page" : undefined}
          onClick={() => go(n)}
        >
          {n}
        </button>
      ))}
      {page < totalPages && (
        <button
          type="button"
          className="pagination-direction"
          onClick={() => go(page + 1)}
        >
          Next{arrow("right")}
        </button>
      )}
      {end < totalPages && (
        <button
          type="button"
          className="pagination-edge"
          onClick={() => go(totalPages)}
        >
          Last{arrow("right", true)}
        </button>
      )}
    </div>
  );
}
export default function SitePage({ page, slug, initialSearch = "" }) {
  const isHome = page === "home";
  const blogSlug = page === "article" ? slug : null;
  const jobSlug = page === "job" ? slug : null;
  const isPrivacy = page === "privacy";
  const isLocalPage = Boolean(blogSlug || jobSlug || isPrivacy);
  const detailSlug = page === "property" ? slug : null;
  const isPropertySearch = page === "search";
  const isAbout = page === "about";
  const isNewsroom = page === "newsroom";
  const isContact = page === "contact";
  const isBlogs = page === "blogs";
  const isCareer = page === "career";
  const isUnknownRoute = page === "not-found";
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const seen = new WeakSet(),
      elements = new Set();
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("site-motion-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0, rootMargin: "0px 0px -16px 0px" },
    );
    const register = () =>
      document
        .querySelectorAll(
          "main h1, main h2, main section > p, .listing-card, .listing-hero > div > p, .listing-results-heading > div > p, .blogs-card, .contact-page-card, .career-life-card, .career-job-row, .property-detail-image, .property-detail-overview, .property-detail-fields, .estate-footer-grid > div",
        )
        .forEach((el) => {
          if (
            seen.has(el) ||
            el.closest(".estate-home,.company-about") ||
            (!el.matches(
              ".listing-card,.blogs-card,.career-life-card,.contact-page-card,.career-job-row",
            ) &&
              el.closest(
                ".listing-card,.blogs-card,.career-life-card,.contact-page-card,.career-job-row",
              ))
          )
            return;
          seen.add(el);
          elements.add(el);
          if (
            el.matches(
              ".listing-card,.blogs-card,.career-life-card,.contact-page-card,.career-job-row",
            )
          )
            el.style.setProperty(
              "--site-motion-delay",
              `${(Array.from(el.parentElement.children).indexOf(el) % 3) * 85}ms`,
            );
          el.classList.add("site-motion-ready");
          observer.observe(el);
        });
    register();
    const mutations = new MutationObserver(register);
    const main = document.querySelector("main");
    if (main) mutations.observe(main, { childList: true, subtree: true });
    const reveal = () => {
      if (preference.matches)
        elements.forEach((el) => el.classList.add("site-motion-visible"));
    };
    preference.addEventListener("change", reveal);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", reveal);
    };
  }, []);
  const [showScrollTop, setShowScrollTop] = useState(false),
    [contactOpen, setContactOpen] = useState(false),
    [enquiryContext, setEnquiryContext] = useState("");
  const flats = useRef(null),
    carouselInteracted = useRef(false);
  function moveFlats(direction, manual = true) {
    const el = flats.current;
    if (!el) return;
    if (manual) carouselInteracted.current = true;
    const step =
        el.firstElementChild.getBoundingClientRect().width +
        parseFloat(getComputedStyle(el).gap),
      cycle = properties.length * step;
    if (direction < 0 && el.scrollLeft < 2) {
      el.scrollTo({ left: cycle, behavior: "instant" });
      requestAnimationFrame(() =>
        el.scrollTo({ left: cycle - step, behavior: "smooth" }),
      );
      return;
    }
    el.scrollTo({
      left: Math.min(cycle, el.scrollLeft + direction * step),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  useEffect(() => {
    const el = flats.current;
    const wrap = () => {
      if (!el) return;
      const cycle =
        properties.length *
        (el.firstElementChild.getBoundingClientRect().width +
          parseFloat(getComputedStyle(el).gap));
      if (el.scrollLeft >= cycle - 2)
        el.scrollTo({ left: 0, behavior: "instant" });
    };
    el?.addEventListener("scrollend", wrap);
    const timer = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? null
      : setInterval(() => {
          if (
            !document.hidden &&
            !carouselInteracted.current &&
            !el?.matches(":hover")
          )
            moveFlats(1, false);
        }, 5000);
    return () => {
      clearInterval(timer);
      el?.removeEventListener("scrollend", wrap);
    };
  }, []);
  useEffect(() => {
    if (!contactOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (e) => {
      if (e.key === "Escape") setContactOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", close);
    };
  }, [contactOpen]);
  useEffect(() => {
    const update = () => setShowScrollTop(window.scrollY > 100);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const [menu, setMenu] = useState(false),
    [query, setQuery] = useState(""),
    [location, setLocation] = useState(""),
    [bed, setBed] = useState(""),
    [type, setType] = useState(""),
    [budget, setBudget] = useState(""),
    [category, setCategory] = useState(""),
    [results, setResults] = useState(properties),
    [selected, setSelected] = useState(null),
    [sent, setSent] = useState(false);
  function search(e, cat = category) {
    e?.preventDefault();
    setResults(
      properties.filter(
        (p) =>
          (!query ||
            `${p[0]} ${p[2]} ${p[6]}`
              .toLowerCase()
              .includes(query.toLowerCase())) &&
          (!location ||
            p[6].toLowerCase().includes(
              dropdownOptions.locations
                .find((o) => o.value === location)
                ?.text.replace(/^-\s*/, "")
                .toLowerCase() || location,
            )) &&
          (!bed || p[4].includes(bed.replace(" BHK", ""))) &&
          (!budget || Number(p[3]) * 10000000 >= Number(budget)) &&
          (!type || type === "apartment") &&
          (!cat ||
            cat === "Apartments" ||
            cat === "Pre Launch" ||
            p[4].includes(cat.replace(" BHK", ""))),
      ),
    );
  }
  const [enquirySending, setEnquirySending] = useState(false),
    [enquiryError, setEnquiryError] = useState("");
  async function handleEnquiry(e) {
    e.preventDefault();
    if (enquirySending) return;
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const payload = enquiryPayload(form, window.location.href);
    setSent(false);
    setEnquiryError("");
    if (!enquiryEndpoint) {
      window.location.href = enquiryEmailUrl(payload);
      setSent(
        "Your email app will open with your enquiry. Send the email there to contact our team.",
      );
      return;
    }
    setEnquirySending(true);
    try {
      await sendEnquiry(payload);
      form.reset();
      setSent(
        "Thank you! Your enquiry has been sent. Our team will contact you.",
      );
    } catch (error) {
      setEnquiryError(
        error.message || "Unable to send your enquiry. Please try again.",
      );
    } finally {
      setEnquirySending(false);
    }
  }
  const openEnquiry = (message = "") => {
    setEnquiryContext(typeof message === "string" ? message : "");
    setSent(false);
    setEnquiryError("");
    setContactOpen(true);
  };
  const renderProperty = (p) => (
    <article className="property-card" key={p[1]}>
      <img className="property-image" src={`/images/${p[1]}.png`} alt={p[0]} />
      <div className="property-content">
        <h2>{p[0]}</h2>
        <p className="description">{p[2]}</p>
        <div className="starting">Starting at</div>
        <div className="price">{p[8] || `${p[3]} Cr Onwards`}</div>
        <div className="property-specs">
          <div>
            <span>Apartments</span>
            <p>{p[4]}</p>
          </div>
          <div>
            <span>Area</span>
            <p>
              {p[5]}
              <span className="area-unit">sq ft</span>
            </p>
          </div>
          <div>
            <span>Status</span>
            <p>New Launch</p>
            <span>Location</span>
            <p>{p[6]}</p>
          </div>
        </div>
        <div className="card-actions flex">
          <button className="muted-button" onClick={() => setSelected(p)}>
            View Details
          </button>
          <button
            type="button"
            className="orange"
            onClick={() => {
              setSent(false);
              setEnquiryError("");
              setContactOpen(true);
            }}
          >
            Contact us
          </button>
        </div>
      </div>
    </article>
  );
  return (
    <>
      <header
        className={isHome || isCareer || detailSlug ? "home-header" : undefined}
      >
        <div className="nav-wrap flex items-center justify-between">
          <a href="/" aria-label="SMART YIELD PROPERTY home">
            <img
              className="logo logo-symbol"
              src="/images/smart-yield-logo.svg?v=7"
              alt="SMART YIELD PROPERTY"
            />
          </a>
          <button
            className="mobile-toggle md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m5 5 14 14M19 5 5 19" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 5h18M3 12h18M3 19h18" />
              </svg>
            )}
          </button>
          <nav
            className={`${menu ? "open" : ""} items-center md:flex`}
            aria-label="Main navigation"
          >
            {(isHome &&
            !isCareer &&
            !isBlogs &&
            !isContact &&
            !isNewsroom &&
            !isAbout &&
            !detailSlug
              ? ["Home", "About Us", "Properties", "News", "Contact Us"]
              : ["Home", "Properties", "Careers", "Blogs", "Contact Us"]
            ).map((n) => (
              <a
                key={n}
                className={
                  (isHome &&
                    !isCareer &&
                    !isBlogs &&
                    !isContact &&
                    !isNewsroom &&
                    !isAbout &&
                    !detailSlug &&
                    n === "Home") ||
                  (isCareer && n === "Careers") ||
                  (isBlogs && n === "Blogs") ||
                  (isContact && n === "Contact Us")
                    ? "home-active"
                    : undefined
                }
                href={
                  n === "Home"
                    ? "/"
                    : n === "About Us"
                      ? "/about-us/"
                      : n === "News"
                        ? "/newsroom/"
                        : n === "Properties"
                          ? "/properties-search/"
                          : n === "Careers"
                            ? "/career/"
                            : n === "Blogs"
                              ? "/blogs/"
                              : n === "Contact Us"
                                ? "/contact-us/"
                                : "#properties"
                }
                onClick={() => setMenu(false)}
              >
                {isHome && n === "About Us"
                  ? "About"
                  : isHome && n === "Contact Us"
                    ? "Contact"
                    : n}
              </a>
            ))}
            <NavPages isHome={isHome} onNavigate={() => setMenu(false)} />
            <a
              className="orange nav-contact"
              href={isHome ? "/properties-search/" : "/contact-us/"}
            >
              {isHome ? "Get Started" : "Get in touch"}
            </a>
          </nav>
        </div>
      </header>
      <main>
        <div
          className={`page-wrap ${isHome ? "homepage" : detailSlug ? "property-detail-wrap" : ""}`}
        >
          {isUnknownRoute ? (
            <NotFound />
          ) : blogSlug ? (
            <BlogArticle slug={blogSlug} />
          ) : jobSlug ? (
            <JobDetails slug={jobSlug} />
          ) : isPrivacy ? (
            <PrivacyPolicy />
          ) : detailSlug ? (
            <PropertyDetails slug={detailSlug} onContact={openEnquiry} />
          ) : isAbout ? (
            <About />
          ) : isNewsroom ? (
            <Newsroom />
          ) : isContact ? (
            <Contact />
          ) : isBlogs ? (
            <Blogs />
          ) : isCareer ? (
            <Career />
          ) : isHome ? (
            <Homepage
              onContact={openEnquiry}
              SearchSelect={Select}
              renderProperty={renderProperty}
              properties={properties}
              onViewProject={setSelected}
            />
          ) : (
            <PropertiesSearch
              initialSearch={initialSearch}
              SearchSelect={Select}
              Pagination={Pagination}
              onContact={openEnquiry}
            />
          )}
          {!isHome &&
            !isUnknownRoute &&
            !isLocalPage &&
            !detailSlug &&
            !isPropertySearch &&
            !isCareer &&
            !isBlogs &&
            !isNewsroom &&
            !isAbout && (
              <section id="contact">
                <div className="contact-grid">
                  <div className="contact-intro">
                    <h2>Get in Touch with Us</h2>
                    <p>
                      Have questions or ready to start your property search?
                      Send us a message, and our team will assist you!
                    </p>
                  </div>
                  <img
                    src="/images/contact.png"
                    alt="Contact our property team"
                  />
                  <form onSubmit={handleEnquiry}>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <label>
                        Name <span className="required">*</span>
                        <input
                          name="name"
                          autoComplete="name"
                          required
                          placeholder="Your Name"
                        />
                      </label>
                      <label>
                        Phone <span className="required">*</span>
                        <input
                          name="phone"
                          autoComplete="tel"
                          required
                          type="tel"
                          placeholder="Your Phone"
                        />
                      </label>
                    </div>
                    <label>
                      Email <span className="required">*</span>
                      <input
                        name="email"
                        autoComplete="email"
                        required
                        type="email"
                        placeholder="Your Email"
                      />
                    </label>
                    <label>
                      Message
                      <textarea
                        name="message"
                        rows="5"
                        placeholder="Your Message"
                        defaultValue={enquiryContext}
                      />
                    </label>
                    <button
                      className="orange"
                      type="submit"
                      disabled={enquirySending}
                    >
                      {enquirySending ? "Sending…" : enquiryButtonLabel}
                    </button>
                    {!enquiryEndpoint && (
                      <p className="enquiry-note">
                        Continue to your email app to review and send your
                        enquiry.
                      </p>
                    )}
                    {sent && <p role="status">{sent}</p>}
                    {enquiryError && <p role="alert">{enquiryError}</p>}
                  </form>
                </div>
              </section>
            )}
          {isContact && (
            <section
              className="contact-page-map home-bleed"
              aria-label="SMART YIELD PROPERTY office location"
            >
              <div className="contact-map-heading">
                <div>
                  <span>BENGALURU OFFICE</span>
                  <h2>SMART YIELD PROPERTY</h2>
                  <p>
                    BMTC Complex, Old Madiwala, Kuvempu Nagar, Stage 2, BTM
                    Layout, Bengaluru, Karnataka 560076
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=SMART%20YIELD%20PROPERTY%20BMTC%20Complex%2C%20Old%20Madiwala%2C%20Kuvempu%20Nagar%2C%20Stage%202%2C%20BTM%20Layout%2C%20Bengaluru%2C%20Karnataka%20560076"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get directions <span aria-hidden="true">↗</span>
                </a>
              </div>
              <iframe
                title="SMART YIELD PROPERTY office on Google Maps"
                src="https://www.google.com/maps?q=BMTC%20Complex%2C%20Old%20Madiwala%2C%20Kuvempu%20Nagar%2C%20Stage%202%2C%20BTM%20Layout%2C%20Bengaluru%2C%20Karnataka%20560076&output=embed"
                width="100%"
                height="450"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </section>
          )}
        </div>
      </main>
      <HomepageFooter />
      <div
        className={`floating-contact ${showScrollTop ? "has-scroll-top" : ""}`}
      >
        <a href="tel:+918095258927" aria-label="Call us">
          <img src="/images/phone.png" alt="" />
        </a>
        <a href="https://wa.me/918095258927" aria-label="WhatsApp">
          <img src="/images/whatsapp.png" alt="" />
        </a>
      </div>
      <button
        type="button"
        className={`scroll-top ${showScrollTop ? "show" : ""}`}
        aria-label="Scroll to top"
        aria-hidden={!showScrollTop}
        tabIndex={showScrollTop ? 0 : -1}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth",
          })
        }
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="m3 10 5-5 5 5" />
        </svg>
      </button>
      {contactOpen && (
        <div
          className="modal-backdrop callback-backdrop"
          onClick={() => setContactOpen(false)}
        >
          <section
            className="callback-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="callback-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="callback-close"
              aria-label="Close callback form"
              onClick={() => setContactOpen(false)}
            >
              ×
            </button>
            <h2 id="callback-title">Interested in Properties?</h2>
            <p>Request a Callback</p>
            <form onSubmit={handleEnquiry}>
              <div className="callback-fields">
                <label>
                  Name <span className="required">*</span>
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Your Name"
                    autoFocus
                  />
                </label>
                <label>
                  Phone <span className="required">*</span>
                  <input
                    name="phone"
                    autoComplete="tel"
                    required
                    type="tel"
                    placeholder="Your Phone"
                  />
                </label>
              </div>
              <label>
                Email <span className="required">*</span>
                <input
                  name="email"
                  autoComplete="email"
                  required
                  type="email"
                  placeholder="Your Email"
                />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  defaultValue={enquiryContext}
                />
              </label>
              <button
                type="submit"
                className="orange"
                disabled={enquirySending}
              >
                {enquirySending ? "Sending…" : enquiryButtonLabel}
              </button>
              {!enquiryEndpoint && (
                <p className="enquiry-note">
                  Continue to your email app to review and send your enquiry.
                </p>
              )}
              {sent && <p role="status">{sent}</p>}
              {enquiryError && <p role="alert">{enquiryError}</p>}
            </form>
          </section>
        </div>
      )}
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={selected[0]}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close"
              aria-label="Close property details"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <img src={`/images/${selected[1]}.png`} alt={selected[0]} />
            <h2>{selected[0]}</h2>
            <p>{selected[2]}</p>
            <strong>{selected[8] || `${selected[3]} Cr Onwards`}</strong>
            <p>
              {selected[4]} · {selected[5]} sq ft
            </p>
            <p>{selected[6]}</p>
            <a
              className="orange"
              href="#contact"
              onClick={() => setSelected(null)}
            >
              Contact us
            </a>
          </section>
        </div>
      )}
    </>
  );
}
