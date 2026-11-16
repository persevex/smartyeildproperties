import fs from 'node:fs';

const input=process.argv[2];
if(!input)throw new Error('Usage: node scripts/import-properties.mjs <tab-separated property file>');
const clean=value=>value.replaceAll('‚Äì','–').replaceAll('‚Äî','—').replaceAll('‚Çπ','₹').replaceAll('¬†',' ').replaceAll('‚Äô','’').trim()||null;
const lines=fs.readFileSync(input,'utf8').split(/\r?\n/);
const header=lines.findIndex(line=>line.startsWith('Source brand\t'));
if(header<0)throw new Error('Property table header not found');
const rows=lines.slice(header+1).filter(line=>line.trim()).map((line,index)=>{
 const cells=line.split('\t').map(clean);
 if(cells.length!==16)throw new Error(`Expected 16 columns on source row ${index+1}, found ${cells.length}`);
 return cells;
});
const normalize=value=>(value||'').normalize('NFKC').toLowerCase().replace(/bengaluru/g,'bangalore').replace(/[^a-z0-9]+/g,' ').trim();
const slug=value=>normalize(value).replaceAll(' ','-');
const unique=new Map();
for(const [i,r] of rows.entries()){
 const [sourceBrand,name,location,propertyType,configuration,size,status,price,priceFrom, possession,rera,siteArea,units,sourceUrl,projectUrl,notes]=r;
 if(!name||!sourceBrand)throw new Error(`Missing project identity on row ${i+1}`);
 const builder=sourceBrand==='Casatrance'?null:sourceBrand;
 const phase=name.match(/\bphase\s+[\w.-]+/i)?.[0]||null;
 const key=[normalize(name),normalize(sourceBrand),normalize(location),normalize(phase)].join('|');
 const reraIds=rera?.match(/PRM\/[A-Z0-9/]+/g)||[];
 const p={id:slug(`${sourceBrand}-${name}`),name,builder,sourceBrand,phase,location,propertyType,configuration,sizeSqFt:size,status,advertisedPrice:price,priceFromLakh:priceFrom===null?null:Number(priceFrom),possessionDate:possession,reraIds,reraAsListed:rera,siteArea,totalUnits:units,sourceUrls:[sourceUrl].filter(Boolean),projectUrl,notes,image:null,sourceRows:[i+1],sourceDate:'2026-11-12'};
 if(p.priceFromLakh!==null&&!Number.isFinite(p.priceFromLakh))throw new Error(`Invalid price on row ${i+1}`);
 if(unique.has(key)){
  const old=unique.get(key);
  for(const field of Object.keys(p)){
   if(Array.isArray(p[field]))old[field]=[...new Set([...old[field],...p[field]])];
   else if(old[field]===null)old[field]=p[field];
   else if(p[field]!==null&&p[field]!==old[field]){old.alternateValues??={};old.alternateValues[field]=[...new Set([old[field],...(old.alternateValues[field]||[]),p[field]])]}
  }
 }else unique.set(key,p);
}
const projects=[...unique.values()];
const ids=new Set();for(const p of projects){if(ids.has(p.id))p.id+=`-${slug(p.location||p.phase||String(p.sourceRows[0]))}`;if(ids.has(p.id))throw new Error('Duplicate project URL');ids.add(p.id)}
const fields=['builder','location','propertyType','configuration','sizeSqFt','status','advertisedPrice','priceFromLakh','possessionDate','reraIds','siteArea','totalUnits','projectUrl','image'];
const report={sourceRows:rows.length,uniqueProjects:projects.length,duplicatesRemoved:rows.length-projects.length,missing:Object.fromEntries(fields.map(key=>[key,projects.filter(p=>p[key]===null||(Array.isArray(p[key])&&!p[key].length)).length])),sourceBrands:[...new Set(projects.map(p=>p.sourceBrand))]};
fs.mkdirSync('src/data',{recursive:true});fs.writeFileSync('src/data/properties.json',JSON.stringify(projects,null,2)+'\n');fs.writeFileSync('src/data/property-import-report.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
