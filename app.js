import {sessions,buildQueue,fadeVolume} from './sessions.js';
const $=id=>document.getElementById(id);
let offsets={};try{offsets=JSON.parse(localStorage.getItem('tangodj-cortina-offsets')||'{}');}catch{}
let sessionId=new URLSearchParams(location.search).get('orchestra')==='canaro'?'canaro':'troilo';
if(!sessions[sessionId].tandas.length)sessionId='troilo';
let queue=buildQueue(sessionId,offsets),index=0,player,ready=false,started=false,finished=false,volume=70,playbackArmed=false;
const format=s=>`${Math.floor(Math.max(0,s)/60)}:${String(Math.floor(Math.max(0,s)%60)).padStart(2,'0')}`;
function matches(){try{return new URL(player.getVideoUrl()).searchParams.get('v')===queue[index].id;}catch{return false;}}
function render(){
 $('queue').replaceChildren();
 $('session-description').textContent=sessions[sessionId].description;
 $('session-count').textContent=`${queue.filter(t=>t.kind==='recording').length} recordings · ${sessions[sessionId].tandas.length} tandas · ${queue.filter(t=>t.kind==='cortina').length} cortinas`;
 $('selection-count').textContent=`${queue.length} selections`;
 $('orchestra').value=sessionId;
 $('youtube-playlist').href=sessions[sessionId].youtube||'#';
 $('youtube-playlist').hidden=!sessions[sessionId].youtube;
 document.title=`${sessions[sessionId].name} · TangoDJ`;
 queue.forEach((track,i)=>{
  if(track.kind==='recording'&&track.position===1){const heading=document.createElement('h3');heading.className='tanda-heading';const group=sessions[sessionId].tandas[track.tanda];heading.textContent=`${group.code} / ${group.label}`;$('queue').append(heading);if(group.note){const note=document.createElement('p');note.className='tanda-note';note.textContent=group.note;$('queue').append(note);}}
  const row=document.createElement('div');if(track.kind==='cortina')row.className='cortina-row';
  const button=document.createElement('button');button.className='track';button.dataset.index=i;
  const number=document.createElement('span');number.className='number';number.textContent=track.kind==='cortina'?'↗':track.position;
  const name=document.createElement('span');name.className='name';name.textContent=track.title;
  if(track.kind==='recording'&&(track.year||track.singer||track.ensemble||track.dateStatus)){const sub=document.createElement('small');sub.textContent=[track.year||track.dateStatus,track.singer||track.ensemble||'Instrumental'].filter(Boolean).join(' · ');name.append(sub);}
  if(track.kind==='cortina'){const sub=document.createElement('small');sub.textContent=`${track.artist} · Cortina · 20 seconds`;name.append(sub);}
  button.append(number,name);button.addEventListener('click',()=>select(i));row.append(button);
  if(track.kind==='cortina'){
   const editor=document.createElement('div');editor.className='clip-editor';
   const label=document.createElement('label');label.textContent='Highlight starts at ';
   const input=document.createElement('input');input.type='number';input.min='0';input.step='1';input.value=track.start;input.setAttribute('aria-label',`Highlight start in seconds for ${track.title}`);label.append(input);
   const range=document.createElement('span');range.textContent=`${format(track.start)}–${format(track.end)}`;
   input.addEventListener('change',()=>{const value=Number(input.value);if(!Number.isFinite(value)||value<0){input.value=track.start;return;}offsets[track.key]=value;queue=buildQueue(sessionId,offsets);try{localStorage.setItem('tangodj-cortina-offsets',JSON.stringify(offsets));}catch{}range.textContent=`${format(value)}–${format(value+20)}`;if(index===i&&started)select(i);});
   const preview=document.createElement('button');preview.textContent='Preview 20s';preview.addEventListener('click',()=>select(i));
   editor.append(label,range,preview);row.append(editor);
  }
  $('queue').append(row);
 });
 update();
}
function update(){
 const t=queue[index];$('title').textContent=t.title;$('artist').textContent=t.kind==='cortina'?t.artist:t.label;
 $('kind').textContent=t.kind==='cortina'?`CORTINA · CLEAR THE FLOOR · AFTER TANDA ${t.tanda+1}`:`TANDA ${t.tanda+1} OF ${sessions[sessionId].tandas.length} · TRACK ${t.position}`;
 $('upnext').textContent=index<queue.length-1?`Up next: ${queue[index+1].title}${queue[index+1].kind==='cortina'?' · 20-second cortina':''}`:'Last recording of the session';
 document.querySelectorAll('.track').forEach(b=>{const active=Number(b.dataset.index)===index;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current');});
 $('previous').disabled=!ready||index===0;$('next').disabled=!ready||index===queue.length-1;$('progress').style.width='0%';$('elapsed').textContent='0:00';$('duration').textContent=t.kind==='cortina'?'0:20':'—';
}
function select(i){
 if(!ready){$('status').textContent='Wait for the YouTube player to connect, then press Play.';return;}
 playbackArmed=false;index=Math.max(0,Math.min(queue.length-1,i));started=true;finished=false;update();$('status').textContent='Loading…';
 const t=queue[index];player.setVolume(volume);const spec={videoId:t.id,startSeconds:t.start};if(t.end!==undefined)spec.endSeconds=t.end;player.loadVideoById(spec);
}
$('orchestra').addEventListener('change',e=>{if(ready)player.pauseVideo();sessionId=e.target.value;queue=buildQueue(sessionId,offsets);index=0;started=false;finished=false;const url=new URL(location.href);url.searchParams.set('orchestra',sessionId);history.replaceState(null,'',url);render();$('play').textContent='Play session';$('status').textContent='Press Play session to start this orchestra.';});
function advance(){if(!playbackArmed)return;playbackArmed=false;if(index<queue.length-1)select(index+1);else{finished=true;player.pauseVideo();$('play').textContent='Replay session';$('status').textContent='Session complete.';}}
$('play').addEventListener('click',()=>{if(!ready)return;if(finished){select(0);return;}if(!started){select(index);return;}if(player.getPlayerState()===YT.PlayerState.PLAYING)player.pauseVideo();else player.playVideo();});
$('previous').addEventListener('click',()=>select(index-1));$('next').addEventListener('click',()=>select(index+1));
$('volume').addEventListener('input',e=>{volume=Number(e.target.value);if(ready)player.setVolume(volume);});
window.onYouTubeIframeAPIReady=()=>{
 player=new YT.Player('player',{width:'100%',height:'100%',videoId:queue[0].id,playerVars:{playsinline:1,origin:location.origin,rel:0},events:{
  onReady:()=>{ready=true;player.setVolume(volume);$('play').disabled=false;$('status').textContent='Press Play session. The 20-second cortinas run automatically between tandas.';update();},
  onStateChange:event=>{
   if(!matches()||finished||!started)return;
   if(event.data===YT.PlayerState.ENDED&&started&&playbackArmed&&player.getPlayerState()===YT.PlayerState.ENDED){advance();return;}
   if(event.data===YT.PlayerState.PLAYING){playbackArmed=true;$('play').textContent='Pause';$('status').textContent=queue[index].kind==='cortina'?'Clear the floor. The next tanda starts after this 20-second highlight.':'Playing the full recording.';}
   else if(event.data===YT.PlayerState.PAUSED){$('play').textContent='Resume';$('status').textContent='Paused.';}
   else if(event.data===YT.PlayerState.BUFFERING){$('status').textContent='Buffering…';}
  },
  onAutoplayBlocked:()=>{$('play').textContent='Resume';$('status').textContent='Your browser paused automatic playback. Press Resume or play inside the video.';},
  onError:event=>{$('status').textContent=`YouTube cannot play this video (error ${event.data}). Use the next arrow to continue.`;$('play').textContent='Retry';started=false;}
 }});
};
setInterval(()=>{
 if(!ready||!started||finished||!matches())return;
 const t=queue[index],time=player.getCurrentTime(),duration=t.kind==='cortina'?20:player.getDuration();
 const elapsed=t.kind==='cortina'?Math.max(0,time-t.start):time;
 $('elapsed').textContent=format(elapsed);$('duration').textContent=duration?format(duration):'—';$('progress').style.width=`${duration?Math.min(100,elapsed/duration*100):0}%`;
 if(player.getPlayerState()===YT.PlayerState.PLAYING){player.setVolume(fadeVolume(t,time,volume));if(playbackArmed&&t.kind==='cortina'&&time>=t.end)advance();}
},100);
render();const api=document.createElement('script');api.src='https://www.youtube.com/iframe_api';api.onerror=()=>{$('status').textContent='Cannot connect to YouTube. Check your connection and reload.';};document.head.append(api);
