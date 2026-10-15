import test from 'node:test';
import assert from 'node:assert/strict';
import {sessions,buildQueue,fadeVolume} from '../sessions.js';
test('Original Troilo recordings retain their supplied order',()=>{
 const ids='c9UaO1KQwpI 0YdWK9Lwc6U _B8vvMIClSQ yPHYf_m9QdY KDnItdfc3VI M65wX9AWKMY 1ZThSxVyx7I hMBGbORsQ4E k7r0mUZtFCQ VNwQhcq_ACg MG1bv9smmO0 5MZhIIxz18U 0Lg7PH3JDf0 h7gGJ6v1sfo LiKKGeeKehI dfIZ-8RiIic 0nHk0Uex4Wk qVh5tgAclEY n-SonYyJofY iY0j8MT7cGw Hv9L8voWrNU 2tV629FnCWI yxEOilQIC9A aZSDSEu7zkI JkGPISO_KjM xWS1lSJxmi4 6IMBryjr_9U k0HJWNGX71U qKS6NaUB70Y 3vZ34HQWuqY VGtqdTw_tgE ziGUywoBWYo i4GoMSAPR8A gQdQnEcc09s tuI54xiPXcM pkayqAxjM20 X81qpRtZfAU WVcm07YVFj0 C2n-WB05INk 9dsjFSWvk0M gtOnMH1xgPw uqcUwpD9dY8'.split(' ');
 assert.deepEqual(buildQueue('troilo').filter(t=>t.kind==='recording').map(t=>t.id),ids);
});
test('Each orchestra has exactly one 20-second cortina between groups',()=>{
 for(const id of Object.keys(sessions)){const q=buildQueue(id),cs=q.filter(t=>t.kind==='cortina');assert.equal(cs.length,sessions[id].tandas.length-1);assert.equal(q.at(-1).kind,'recording');for(const c of cs){const i=q.indexOf(c);assert.equal(c.end-c.start,20);assert.equal(q[i-1].tanda,c.tanda);assert.equal(q[i+1].tanda,c.tanda+1);assert.equal(fadeVolume(c,c.end-1,80),40);}}
});
test('Canaro separates singers, ensembles, and recording eras',()=>{
 for(const group of sessions.canaro.tandas){assert.equal(new Set(group.tracks.map(t=>t.singer)).size,1);const years=group.tracks.map(t=>t.year).filter(Number.isFinite);assert.ok(Math.max(...years)-Math.min(...years)<=4);for(const t of group.tracks){assert.match(t.id,/^[\w-]{11}$/);if(group.code==='L')assert.equal(t.ensemble,'Quinteto Pirincho');else assert.notEqual(t.ensemble,'Quinteto Pirincho');}}
 const ids=sessions.canaro.tandas.flatMap(t=>t.tracks.map(t=>t.id));assert.equal(new Set(ids).size,ids.length);
});
test('Cortina offsets belong to an orchestra and a boundary',()=>{const c=buildQueue('canaro').find(t=>t.kind==='cortina');assert.equal(buildQueue('canaro',{[c.key]:33}).find(t=>t.kind==='cortina').end,53);assert.equal(buildQueue('troilo',{[c.key]:33}).find(t=>t.kind==='cortina').start,5);});
