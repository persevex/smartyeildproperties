import React, {useState,useEffect,useRef} from 'react';

const lifeCards=[
 ['Purpose Driven Work','Make a real difference by helping people find the right property. Every interaction is a step toward building trust and lasting value.'],
 ['Supportive Team Culture','Work with a team that values respect, collaboration, and growth. At SMART YIELD PROPERTY, you’re never working alone — we grow together.'],
 ['Learning Every Day','We believe in continuous learning through real world experiences. Every project is a chance to improve, adapt, and get better.'],
 ['Commitment to Integrity','Transparency and honesty are at the core of what we do. We build relationships that go beyond just closing a deal.'],
];
import {jobs} from './jobs.js';
export {jobs} from './jobs.js';
function JobFilter({label,options,value,onChange}){
 const ref=useRef(null);
 useEffect(()=>{const close=e=>{if(!ref.current?.contains(e.target)||e.key==='Escape')ref.current.open=false};document.addEventListener('pointerdown',close);document.addEventListener('keydown',close);return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',close)}},[]);
 return <details className="career-job-filter" ref={ref}><summary>{value||label}</summary><div className="career-job-options">{['',...options].map(v=><button type="button" key={v} className={value===v?'selected':''} onClick={()=>{onChange(v);ref.current.open=false}}>{v||label}</button>)}</div></details>;
}
export default function Career(){
 const [query,setQuery]=useState(''),[term,setTerm]=useState(''),[type,setType]=useState(''),[location,setLocation]=useState('');
 const bangaloreJobs=jobs.filter(j=>j.specs[1]==='Bangalore');
 const shownJobs=bangaloreJobs.filter(j=>(!term||j.title.toLowerCase().includes(term.toLowerCase()))&&(!type||j.specs[0]===type)&&(!location||j.specs[1]===location));
 return <div className="career-page"><section className="career-hero">
  <div className="career-hero-inner">
   <span className="career-eyebrow">CAREERS AT SMART YIELD PROPERTY · BANGALORE</span><h1>Build Your Career.<br/><em>Help Shape Their Future.</em></h1>
   <p>At SMART YIELD PROPERTY, we help people find the right properties by making real estate simple, transparent, and valuable. Our mission is to create meaningful experiences and long-term value for every client. Join our Bangalore team and become part of a purpose-driven workplace committed to making a real difference in the property world.</p>
   <div className="career-hero-actions"><a className="career-explore" href="#jobopenings">Explore Bangalore Roles <span aria-hidden="true">↗</span></a><span>{bangaloreJobs.length} roles in our career listings</span></div>
  </div><div className="career-hero-photo"><img src="/images/placeholders/apartments.jpg" alt="Contemporary residential architecture" fetchPriority="high"/><span>Build your future in real estate.</span></div>
 </section>
 <section className="career-life career-container"><div className="career-section-heading"><span className="career-eyebrow">GROW TOGETHER</span><h2>Life at SMART YIELD PROPERTY</h2><p>Purpose, support, and learning at every step of your career.</p></div><div className="career-life-grid">{lifeCards.map(([title,text],i)=><article className="career-life-card" key={title}><img src={["/images/placeholders/apartments.jpg","/images/about-hero.webp","/images/placeholders/villa.jpg","/images/placeholders/apartments.jpg"][i]} alt={title}/><span className="career-value-number">0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
 <section className="career-jobs career-container" id="jobopenings">
  <div className="career-section-heading"><span className="career-eyebrow">YOUR NEXT CHAPTER</span><h2>Find Your Role in Bangalore</h2><p>Explore our listed roles in sales, property advisory, and digital marketing.</p></div>
  <form className="career-job-search" onSubmit={e=>{e.preventDefault();setTerm(query)}}>
   <div className="career-search-input"><input aria-label="Search jobs" placeholder="Search by role or keyword" value={query} onChange={e=>{setQuery(e.target.value);setTerm(e.target.value)}}/><button aria-label="Search jobs" type="submit"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></svg></button></div>
   <JobFilter label="All Job Type" options={['Full Time']} value={type} onChange={setType}/><JobFilter label="All Job Location" options={['Bangalore']} value={location} onChange={setLocation}/>
  </form>
  <p className="career-result-count" role="status" aria-live="polite">{shownJobs.length} Bangalore {shownJobs.length===1?'role':'roles'} listed</p><div className="career-job-list">{shownJobs.map(j=><article className="career-job-row" key={j.url}><h3><a href={j.url}>{j.title.replace(/\s*\(BLR\)/,'')}</a></h3><div className="career-job-specs">{j.specs.map((text,i)=><span key={i}>{text}</span>)}</div><a className="career-job-details" href={j.url}>View Role <span aria-hidden="true">→</span></a></article>)}{!shownJobs.length&&<div className="career-empty"><h3>No matching roles</h3><p>Try another keyword or clear the filters to see our Bangalore listings.</p><button onClick={()=>{setQuery('');setTerm('');setType('');setLocation('')}}>Clear filters</button></div>}</div>
 </section>
 <section className="career-office"><div className="career-container"><div><span className="career-eyebrow">OUR BANGALORE OFFICE</span><h2>Your Next Chapter<br/>Starts Here.</h2></div><div><p>BMTC Complex, Old Madiwala, Kuvempu Nagar, Stage 2, BTM Layout, Bengaluru, Karnataka 560076</p><p>Email your resume to <a href="mailto:hr@smartyieldpropeties.com">hr@smartyieldpropeties.com</a></p><a href="/contact-us/">Connect with SMART YIELD PROPERTY <span aria-hidden="true">↗</span></a></div></div></section></div>;
}
