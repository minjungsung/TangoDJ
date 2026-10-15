import {tandas as troiloTandas,cortinas} from './playlist.js';
import {canaroTandas} from './canaro.js';
export {fadeVolume} from './playlist.js';
export const sessions={
 troilo:{name:'Aníbal Troilo',description:'Golden-age phrasing, rich instrumentals, and the voices of Fiorentino, Marino, Ruiz, Goyeneche, and Rufino.',youtube:'https://www.youtube.com/playlist?list=PLH8G31ySbHyY',tandas:troiloTandas.map(([label,tracks],i)=>({code:String(i+1).padStart(2,'0'),label,genre:i===9?'Vals':i===10?'Milonga':'Tango',tracks:tracks.map(([title,id])=>({title,id}))}))},
 canaro:{name:'Francisco Canaro',description:'A study session grouped by era, singer, and energy. The main orchestra and Quinteto Pirincho stay separate.',youtube:null,tandas:canaroTandas}
};
export function buildQueue(sessionId='troilo',offsets={}){
 const queue=[],session=sessions[sessionId];
 session.tandas.forEach((group,tanda)=>{
  group.tracks.forEach((track,position)=>queue.push({...track,kind:'recording',tanda,label:group.label,genre:group.genre,position:position+1,start:0}));
  if(tanda<session.tandas.length-1){const c=cortinas[tanda%cortinas.length];const key=`${sessionId}:${tanda}:${c.id}`;const start=Number.isFinite(offsets[key])?Math.max(0,offsets[key]):c.start;queue.push({...c,key,kind:'cortina',tanda,label:'Clear the floor',start,end:start+20});}
 });
 return queue;
}
