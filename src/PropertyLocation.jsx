import React,{useState} from 'react';
import {propertyMap} from './propertyData.js';

export function PropertyRera({property:p,compact=false}){
 const ids=p.reraIds||[];
 return <div className={`property-rera ${compact?'compact':''}`}><span className="property-rera-label">RERA {ids.length>1?'registrations':'number'}</span>{ids.length?<><ul>{(compact?ids.slice(0,1):ids).map(id=><li key={id}>{id}</li>)}</ul>{compact&&ids.length>1&&<a href={`/properties/${p.id}/#rera`}>+{ids.length-1} more registrations</a>}{!compact&&<><p>Match the registration to your phase or tower.</p>{p.reraResearch?.basis&&<p>{p.reraResearch.basis}</p>}<a href={ids.some(id=>id.startsWith('TN/'))?'https://rera.tn.gov.in/':'https://rera.karnataka.gov.in/'} target="_blank" rel="noreferrer">Check on {ids.some(id=>id.startsWith('TN/'))?'Tamil Nadu':'Karnataka'} RERA ↗</a></>}</>:<p>Registration number not confirmed</p>}</div>;
}

export function PropertyLocation({property:p,compact=false}){
 const map=propertyMap(p),[open,setOpen]=useState(!compact);
 if(!map)return compact?<p className="property-map-unavailable">Location awaiting confirmation</p>:<section className="property-location-section" id="location"><h2>Project location</h2><p>Location awaiting confirmation. A map will be available when the project location is supplied.</p></section>;
 return <section className={`property-location-section ${compact?'compact':''}`} id={compact?undefined:'location'} aria-label={`${p.name} location`}>
 {compact?<button type="button" className="property-map-toggle" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?'Hide map':'View on map'} <span aria-hidden="true">{open?'−':'+'}</span></button>:<h2>Project location</h2>}
 {open&&<><p className="property-map-address">{p.location}</p><iframe title={`${p.name} — ${map.exact?'project location':'location search'}`} src={map.embedUrl} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"/><div className="property-map-caption"><span>{map.exact?'Published project map':'Map search · exact project pin unconfirmed'}</span><a href={map.url} target="_blank" rel="noreferrer">Open Google Maps ↗</a></div></>}
 </section>;
}
