import React, {useState} from 'react';
import data from './homeData.json';
import moreBlogs from './blogPosts.json';

const allBlogs=[...new Map([...data.blogs,...moreBlogs].map(blog=>[blog.url,blog])).values()];
const categories=['All',...['Godrej','Brigade','Prestige','Sobha','Assetz','Provident','Lodha','Puravankara'].filter(name=>allBlogs.some(blog=>blog.title.toLowerCase().includes(name.toLowerCase())))];
export default function Blogs(){
 const [category,setCategory]=useState('All'),[query,setQuery]=useState('');
 const featured=allBlogs[0];
 const blogs=allBlogs.filter(blog=>(category==='All'||blog.title.toLowerCase().includes(category.toLowerCase()))&&(!query||`${blog.title} ${blog.excerpt}`.toLowerCase().includes(query.trim().toLowerCase())));
 return <section className="blogs-page">
  <div className="blogs-hero"><div className="blogs-container blogs-heading"><div><span className="blogs-eyebrow">THE SMART YIELD PROPERTY JOURNAL</span><h1>A Little Insight.<br/><em>A Clearer Next Move.</em></h1></div><p>Explore Bangalore project guides from SMART YIELD PROPERTY. Get to know the places, projects, and homes behind your next property decision.</p></div></div>
  <div className="blogs-container">
   <article className="blogs-featured blogs-featured-banner"><img className="blogs-featured-background" src={featured.image} style={{objectPosition:featured.imagePosition||'center'}} alt={featured.name} fetchPriority="high"/><div className="blogs-featured-banner-top"><span>THE FEATURED READ</span><time>{featured.date}</time></div><div className="blogs-featured-banner-bottom"><div><span className="blogs-featured-category">BANGALORE · PROJECT GUIDE</span><h2><a href={featured.url}>{featured.name}</a></h2><p>Get to know the project. Take a closer look with SMART YIELD PROPERTY.</p></div><a className="blogs-banner-link" href={featured.url}>Explore the Guide <span aria-hidden="true">↗</span></a></div></article>
   <div className="blogs-collection-heading"><div><span className="blogs-eyebrow">EXPLORE THE JOURNAL</span><h2>Project Stories &amp; Guides</h2></div><span>{allBlogs.length} articles in our collection</span></div>
   <div className="blogs-toolbar"><div className="blogs-categories" role="group" aria-label="Filter reviews by builder">{categories.map(c=><button key={c} className={category===c?'active':''} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c==='All'?'All Guides':c}</button>)}</div><form className="blogs-search" role="search" onSubmit={e=>e.preventDefault()}><input placeholder="Find a project or builder…" aria-label="Search blog articles" value={query} onChange={e=>setQuery(e.target.value)}/><button type="submit" aria-label="Search blogs"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="7"/><path d="m15 15 7 7"/></svg></button></form></div>
   <p className="blogs-result-count" role="status" aria-live="polite">{blogs.length} {blogs.length===1?'guide':'guides'}{category!=='All'?` · ${category}`:''}</p>
   <div className="blogs-grid">{blogs.map(blog=><article className="blogs-card" key={blog.url}><a className="blogs-card-photo" href={blog.url}><img src={blog.image} style={{objectPosition:blog.imagePosition||'center'}} alt={blog.imageKind==='illustrative'?'Illustrative residential architecture':blog.name} loading="lazy"/><span>{blog.imageKind==='illustrative'?'Architectural illustration':'Project Guide'}</span></a><div className="blogs-card-content"><time>{blog.date}</time><h2><a href={blog.url}>{blog.title}</a></h2><p>{blog.excerpt}…</p><a className="blogs-read-link" href={blog.url}>Read guide <span aria-hidden="true">↗</span></a></div></article>)}</div>
   {!blogs.length&&<div className="blogs-empty"><h2>No matching guides</h2><p>Try another project name or explore all guides.</p><button onClick={()=>{setCategory('All');setQuery('')}}>Clear filters</button></div>}
   <div className="blogs-bottom-note"><span className="blogs-eyebrow">FROM RESEARCH TO YOUR NEXT STEP</span><h2>Found a Place That Feels Like You?</h2><a href="/properties-search/">Explore Bangalore Properties <span aria-hidden="true">↗</span></a></div>
  </div>
 </section>;
}
