import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const projects=JSON.parse(fs.readFileSync('src/data/properties.json'));
const catalog=JSON.parse(fs.readFileSync('src/data/floorplans.json'));
const sources=JSON.parse(fs.readFileSync('docs/floor-plan-sources.json'));
assert.equal(Object.keys(catalog).length,projects.length);
let files=0,available=0;
for(const p of projects){
 const entry=catalog[p.id];assert.ok(entry,`${p.id}: missing floor-plan section`);
 assert.equal(entry.status,entry.plans.length?'available':'request');
 if(entry.plans.length)available++;
 const seen=new Set();
 for(const plan of entry.plans){
  assert.match(plan.src,/^\/images\/floorplans\/[a-z0-9-]+\/[a-z0-9.-]+$/);
  assert.ok(!seen.has(plan.src),`${p.id}: duplicate plan`);seen.add(plan.src);
  assert.ok(plan.label&&plan.width>=280&&plan.height>=250,`${p.id}: invalid plan metadata`);
  const bytes=fs.readFileSync(`public${plan.src}`);assert.ok(bytes.length>1500);
  const provenance=sources[p.id].assets.find(a=>a.asset===plan.src);assert.ok(provenance?.originUrl);
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),provenance.fileSha256,`${p.id}: asset integrity failed`);
  files++;
 }
}
console.log(`Checked ${projects.length} floor-plan sections: ${available} properties with ${files} local layouts; ${projects.length-available} honest request states; asset integrity and internal provenance passed.`);
