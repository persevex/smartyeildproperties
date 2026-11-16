import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createServer} from 'vite';

const server=await createServer({server:{middlewareMode:true},appType:'custom'});
try{
 const {projects,hasListedPrice,filterProjects,canEnquire,isClosed,propertyMap}=await server.ssrLoadModule('/src/propertyData.js');
 const source=JSON.parse(fs.readFileSync('src/data/properties.json','utf8'));
 const enrichment=JSON.parse(fs.readFileSync('src/data/property-enrichment.json','utf8'));
 assert.equal(projects.length,source.length,'Every source project must remain visible');
 assert.equal(new Set(projects.map(p=>p.id)).size,projects.length);
 assert.equal(filterProjects({}).length,projects.length);
 for(const original of source){
  const p=projects.find(p=>p.id===original.id),extra=enrichment[p.id];
  for(const [field,value]of Object.entries(original)){
   if(['image','reraIds'].includes(field)||value===null||value===undefined||value==='')continue;
   if(extra?.correctedSuppliedFields?.[field])continue;
   assert.deepEqual(p[field],value,`${p.id}: supplied ${field} changed without a correction`);
  }
  if(isClosed(p)||p.listingKind==='portfolio')assert.equal(canEnquire(p),false,`${p.id}: sale enquiry must be disabled`);
  if(p.location)assert.ok(propertyMap(p),`${p.id}: missing map view`);
  if(p.priceFromLakh!==null)assert.ok(Number.isFinite(p.priceFromLakh)&&p.priceFromLakh>0,`${p.id}: invalid price`);
  for(const [field,correction]of Object.entries(extra?.correctedSuppliedFields||{})){
   assert.deepEqual(original[field],correction.from,`${p.id}: correction baseline changed`);
   assert.deepEqual(p[field],correction.to,`${p.id}: correction not applied`);
  }
  for(const [field,value]of Object.entries(extra?.fields||{})){
   assert.ok(extra.fieldSources[field]?.url,`${p.id}: ${field} lacks provenance`);
   assert.equal(new URL(extra.fieldSources[field].url).protocol,'https:',`${p.id}: source must be HTTPS`);
   assert.ok(value!==null&&value!==undefined&&value!=='',`${p.id}: empty enrichment`);
  }
 }
 const one=id=>projects.find(p=>p.id===id);
 assert.equal(one('sobha-sacred-grove-by-the-lake').priceFromLakh,86);
 assert.equal(one('sobha-sobha-victoria-park-row-houses').propertyType,'Row houses');
 assert.equal(one('lodha-lodha-beaumont-estate').propertyType,'Apartments');
 assert.equal(one('assetz-assetz-house').listingKind,'portfolio');
 assert.equal(hasListedPrice(one('lodha-lodha-whitefield')),false);
 assert.ok(!one('lodha-lodha-whitefield').advertisedPrice,'Unpublished price must stay absent');
 assert.equal(one('assetz-sun-sanctum-phase-2').reraIds[0],'PRM/KA/RERA/1251/309/PR/150324/006702');
 console.log(`Checked ${projects.length} projects, ${Object.keys(enrichment).length} researched records, ${projects.filter(hasListedPrice).length} numeric/listed prices, original-data preservation, sources, maps and phase corrections.`);
}finally{await server.close()}
