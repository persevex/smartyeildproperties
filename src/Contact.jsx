import React from 'react';

function Icon({type}){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={type==='phone'?2:1} aria-hidden="true">{type==='email'?<><rect x="2" y="5" width="20" height="14" rx="3"/><path d="m6 9 6 4 6-4"/></>:type==='phone'?<path d="M5 3H2c0 11 8 19 19 19v-6l-5-1-2 3c-4-2-7-5-8-8l3-2-1-5z"/>:<path d="m3 10 15-7c3-1 4 1 3 3l-7 15c-1 2-3 1-3-1l-1-6-6-1c-2 0-3-2-1-3Z"/>}</svg>}
const cards=[
 {title:'Website',text:'smartyieldproperties.com',href:'https://smartyieldproperties.com',icon:'website'},
 {title:'HR Email',text:'hr@smartyieldpropeties.com',href:'mailto:hr@smartyieldpropeties.com',icon:'email'},
 {title:'Phone',text:'+91 80952 58927',href:'tel:+918095258927',icon:'phone'},
 {title:'BENGALURU OFFICE',text:'SMART YIELD PROPERTY, BMTC Complex, Old Madiwala, Kuvempu Nagar, Stage 2, BTM Layout, Bengaluru, Karnataka 560076',icon:'location'},
];
export default function Contact(){return <section className="contact-page-intro">
 <div className="contact-page-heading"><div><span className="contact-eyebrow">LET’S TALK · SMART YIELD PROPERTY BANGALORE</span><h1>Your Next Move<br/>Starts With a Conversation.</h1></div><div><p>Have questions or ready to start your property search? Connect with our Bangalore team for guidance on homes, builders, and your next steps.</p><a className="contact-hero-link" href="#contact">Send us a message <span aria-hidden="true">↗</span></a></div></div>
 <div className="contact-page-cards">{cards.map(c=><article className={`contact-page-card ${c.icon}`} key={c.title}><span className="contact-page-icon"><Icon type={c.icon}/></span><div><h2>{c.title}</h2>{c.href?<a href={c.href}>{c.text}</a>:<><p>{c.text}</p><a className="contact-directions" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('SMART YIELD PROPERTY '+c.text)}`} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a></>}</div></article>)}</div>
 </section>}
