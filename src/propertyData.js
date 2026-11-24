import sourceProjects from './data/properties.json' with {type: 'json'};
import projectImages from './data/project-images.json' with {type: 'json'};
import regionMapping from './data/property-regions.json' with {type: 'json'};
import projectResearch from './data/property-research.json' with {type: 'json'};
import projectEnrichment from './data/property-enrichment.json' with {type: 'json'};

// Restore the full inventory. Enrichment fills gaps without erasing supplied facts.
export const hasListedPrice=p=>Number.isFinite(p.priceFromLakh)||Boolean(p.advertisedPrice?.trim()&&!/on request|not provided|call|contact|TBA/i.test(p.advertisedPrice));
const projects=sourceProjects.map(source=>{
 const enrichment=projectEnrichment[source.id],research=projectResearch[source.id],image=projectImages[source.id];
 const merged={...source};
 for(const [key,value] of Object.entries(enrichment?.fields||{})){
  const missing=merged[key]===null||merged[key]===undefined||merged[key]==='';
  if(missing||enrichment?.correctedSuppliedFields?.[key])merged[key]=value;
 }
 return {...merged,...(image?{image:image.src,imageSource:image}:{}),...(research?.rera?.ids?.length?{reraIds:research.rera.ids}:{}),reraResearch:research?.rera||null,mapLocation:research?.location||null,enrichment:enrichment||null,priceContext:enrichment?.priceContext||null};
});
export {projects};
export const PAGE_SIZE=6;
export const provided=value=>value??'Not provided';
export const projectPath=p=>`/properties/${p.id}/`;
export const normalize=value=>(value||'').toLowerCase().replace(/bengaluru/g,'bangalore').replace(/[^a-z0-9.]+/g,' ').trim();
export const isClosed=p=>/sold\s*out|completed/i.test(p.status||'');
export const isLegacy=p=>/legacy|historical/i.test(p.notes||'');
export const canEnquire=p=>p.listingKind!=='portfolio'&&!isClosed(p)&&!isLegacy(p);
export function priceLabel(p){return p.listingKind==='portfolio'?'Portfolio reference':p.advertisedPrice??(Number.isFinite(p.priceFromLakh)?`₹${p.priceFromLakh} lakh`:'Price on request')}
export function priceHeading(p){if(p.listingKind==='portfolio')return 'Project information';if(!hasListedPrice(p))return 'Speak to our property team';if(p.priceContext)return p.priceContext.label;return isClosed(p)||isLegacy(p)?'Advertised price (historical)':'Starting price as listed'}
export function bedroomOptions(p){
 if(!p.configuration)return [];
 const text=p.configuration.replace(/Type\s*\d+/gi,'');
 const range=text.match(/(\d+)\s*[–-]\s*(\d+)\s*BHK/i);
 return range?Array.from({length:Number(range[2])-Number(range[1])+1},(_,i)=>Number(range[1])+i):[...new Set((text.match(/\d+(?:\.\d+)?/g)||[]).map(Number))];
}
export function readFilters(search=typeof window==='undefined'?'':window.location.search){
 const q=new URLSearchParams(search);
 const incomingType=q.get('type')||'';
 const isCategory=['Ready to Move','Ongoing','Pre Launch'].includes(incomingType);
 return {query:q.get('keyword')||'',location:q.get('area')||q.get('location')||'',type:isCategory?'':incomingType,bed:q.get('bed')||'',budget:q.get('budget')||'',price:q.get('price')||'',builder:q.get('builder')||'',status:q.get('status')||'',region:q.get('region')||'',category:q.get('category')||(isCategory?incomingType:'')};
}
export function filterProjects(filters){
 const {query='',location='',type='',bed='',budget='',category='',region='',builder='',status='',price=''}=filters;
 return projects.filter(p=>{
  if(region&&propertyRegion(p)!==region)return false;
  if(builder&&p.builder!==builder)return false;
  if(status&&p.status!==status)return false;
  if(price==='missing'&&p.priceFromLakh!==null)return false;
  if(price&&price!=='missing'){const [min,max]=price.split(':').map(Number);if(p.priceFromLakh===null||!Number.isFinite(min)||!Number.isFinite(max)||p.priceFromLakh<min||p.priceFromLakh>max)return false;}
  const searchable=[p.name,p.builder,p.sourceBrand,p.location,p.configuration,p.propertyType,p.status].filter(Boolean).join(' ');
  if(query&&!normalize(searchable).includes(normalize(query)))return false;
  const locality=normalize(location);
  if(locality&&locality!=='bangalore'&&!normalize(p.location).includes(locality))return false;
  if(type&&!projectTypes(p).includes(typeGroup(type)))return false;
  if(bed&&(bed==='studio'?!/studio/i.test(p.configuration||''):!bedroomOptions(p).includes(Number(bed))))return false;
  // The existing budget control specifies a minimum price in rupees.
  if(budget&&(p.priceFromLakh===null||p.priceFromLakh*100000<Number(budget)))return false;
  if(category==='Ready to Move'&&!/ready\s*to\s*move/i.test(p.status||''))return false;
  if(category==='Pre Launch'&&!/upcoming|pre.?launch/i.test(p.status||''))return false;
  if(category==='Ongoing'&&!/ongoing|under construction/i.test(p.status||''))return false;
  if(['Apartments','Villas','Plots'].includes(category)&&!projectTypes(p).includes(typeGroup(category)))return false;
  if(/BHK$/.test(category)&&!bedroomOptions(p).includes(Number(category.replace(' BHK',''))))return false;
  return true;
 });
}

export const propertyRegions=['North Bangalore','South Bangalore','East Bangalore','West Bangalore','Central Bangalore','Uncategorized'];
// Exact reviewed locality mapping; project names never determine region.
const localityKey=value=>normalize(value).replace(/\./g,' ').replace(/\s+/g,' ').trim();
const localityRegions=new Map(Object.entries(regionMapping.locations).flatMap(([region,locations])=>locations.map(location=>[localityKey(location),region])));
export function propertyRegion(p){
 if(p.enrichment?.region)return p.enrichment.region;
 if(/require confirmation/i.test(p.notes||''))return 'Uncategorized';
 return localityRegions.get(localityKey(p.location))||'Uncategorized';
}
export function propertyIllustration(p){
 if(p.image)return {src:p.image,illustrative:false,alt:`${p.name} — builder-published project visual`,source:p.imageSource};
 const type=normalize(p.propertyType);
 if(/plot/.test(type)&&!/row houses/.test(type))return {src:'/images/placeholders/plot.jpg',illustrative:true,alt:'Illustrative plot landscape, not an image of this project'};
 if(/villa|row hous/.test(type))return {src:'/images/placeholders/villa.jpg',illustrative:true,alt:'Illustrative villa, not an image of this project'};
 return {src:'/images/placeholders/apartments.jpg',illustrative:true,alt:'Illustrative building, not an image of this project'};
}

// Group only property types explicitly present in the source fields.
export function typeGroup(value){
 const type=normalize(value);
 if(/row hous/.test(type))return 'Row Houses';
 if(/apartment|flat/.test(type))return 'Apartments/Flats';
 if(/villa/.test(type))return 'Villas';
 if(/plot/.test(type))return 'Plots';
 if(/township/.test(type))return 'Townships';
 if(/commercial/.test(type))return 'Commercial';
 return value;
}
export function projectTypes(p){
 const type=normalize(p.propertyType),configuration=normalize(p.configuration);
 const groups=[];
 if(/row hous/.test(type)||/row hous/.test(configuration))groups.push('Row Houses');
 if(/apartment|flat/.test(type)&&!/row hous/.test(configuration))groups.push('Apartments/Flats');
 if(/villa/.test(type))groups.push('Villas');
 if(/plot/.test(type))groups.push('Plots');
 if(/township/.test(type))groups.push('Townships');
 if(/commercial/.test(type))groups.push('Commercial');
 return groups;
}
const uniqueValues=key=>[...new Set(projects.map(p=>p[key]).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
const presentTypes=new Set(projects.flatMap(projectTypes));
export const propertyTypeOptions=['Apartments/Flats','Villas','Plots','Row Houses','Townships','Commercial'].filter(type=>presentTypes.has(type));
export const builderOptions=uniqueValues('builder');
export const statusOptions=uniqueValues('status');
export const bhkOptions=[...new Set(projects.flatMap(bedroomOptions))].sort((a,b)=>a-b).map(n=>({text:n+' BHK',value:String(n)}));
if(projects.some(p=>/studio/i.test(p.configuration||'')))bhkOptions.unshift({text:'Studio',value:'studio'});
const listedPrices=[...new Set(projects.map(p=>p.priceFromLakh).filter(v=>v!==null))].sort((a,b)=>a-b);
const priceText=value=>value>=100?'₹'+Number((value/100).toFixed(2))+' Cr':'₹'+value+' L';
export const priceRangeOptions=[];
const priceGroupSize=Math.ceil(listedPrices.length/5);
for(let i=0;i<listedPrices.length;i+=priceGroupSize){const min=listedPrices[i],max=listedPrices[Math.min(i+priceGroupSize-1,listedPrices.length-1)];priceRangeOptions.push({text:min===max?priceText(min):priceText(min)+' – '+priceText(max),value:min+':'+max});}
if(projects.some(p=>p.priceFromLakh===null))priceRangeOptions.push({text:'Price on request',value:'missing'});

// Keep supplied locality text intact; never treat a locality search as an exact pin.
export function propertyMap(p){
 if(!p.location?.trim())return null;
 const pin=p.mapLocation;
 const hasCoordinates=Number.isFinite(pin?.latitude)&&Number.isFinite(pin?.longitude)&&pin.latitude>=-90&&pin.latitude<=90&&pin.longitude>=-180&&pin.longitude<=180;
 const hasEmbed=typeof pin?.embedUrl==='string'&&pin.embedUrl.startsWith('https://www.google.com/maps/embed?');
 const exact=hasCoordinates||hasEmbed;
 const query=hasCoordinates?`${pin.latitude},${pin.longitude}`:`${p.name}, ${p.location}, Karnataka, India`;
 return {exact,sourceUrl:exact?pin.sourceUrl:null,url:pin?.mapsUrl||`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,embedUrl:hasEmbed?pin.embedUrl:`https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${exact?16:13}&output=embed`};
}
