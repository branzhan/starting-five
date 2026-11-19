const P=RAW.split('\n').map((l,i)=>{const[name,pos,g,pts,reb,ast,stl,blk]=l.split('|');const p={id:i,name,pos,g:+g,pts:+pts,reb:+reb,ast:+ast,stl:+stl,blk:+blk};p.score=p.pts+1.2*p.reb+1.5*p.ast+2.5*p.stl+2.5*p.blk;p.val=Math.max(0,(p.score-22)*.33);return p});
const CAP=30,SPOTS=7,OPEN_MS=12000,BID_MS=8000,SOLD_MS=2800,FORCED_MS=3000;
const $=s=>document.querySelector(s),V=$('#view');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const randn=()=>{let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)};
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const rid=()=>Math.random().toString(36).slice(2,10);
const full=t=>t.r.length>=SPOTS;
let G=null,mode='landing',online=false,isHost=false,room,game=null,peers=[],me={nick:'',team:-1};
let deadline=0,nextAt=0,cpuPlan={},lastCast=0,lastState=0,lastV=null,code='',cfg=null,hostGone=false,joinErr='',pending=false,unsub=[];
try{me.nick=localStorage.getItem('d30nick')||''}catch(e){}
(async()=>{try{room=window.claude&&window.claude.use?await window.claude.use('room'):null}catch(e){room=null}if(mode==='landing')setTimeout(()=>{if(typeof render==='function')render()})})();
const canPeer=()=>!!(window.Peer&&window.RTCPeerConnection);
const netOK=()=>room||canPeer();
const viaPeer=()=>!room&&canPeer();
const hashCode=(location.hash||'').replace('#','').toUpperCase();
setTimeout(()=>{if(mode==='landing'&&room===null&&typeof render==='function')render()},2500);
{const pj=document.querySelector('script[src*=peerjs]');if(pj)pj.addEventListener('load',()=>{if(mode==='landing'&&typeof render==='function')render()})}

function av(p,s){let h=0;for(const ch of p.name)h=(h*31+ch.charCodeAt(0))%360;
  const ini=p.name.split(/[\s-]+/).filter(w=>/^[A-Z]/.test(w)).slice(0,2).map(w=>w[0]).join('');
  return`<svg class="av" width="${s}" height="${s}" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48" fill="hsl(${h} 40% 86%)"/><path d="M33 14h9q8 12 16 0h9l3 20q11 4 13 15l-3 41H20l-3-41q2-11 13-15z" fill="hsl(${h} 60% 38%)" stroke="hsl(${h} 60% 24%)" stroke-width="2.5"/><text x="50" y="73" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="27" fill="#fff">${esc(ini)}</text></svg>`}
const tn=i=>esc(G.teams[i].n);
const local=()=>online?(me.team===0||me.team===1?[me.team]:[]):G.teams.map((t,i)=>t.cpu?-1:i).filter(i=>i>=0);

// ---------- host engine ----------
function newG(names,cpu,e){return{e:e||rid(),v:1,phase:'auction',teams:names.map((n,i)=>({n,c:CAP,r:[],cpu:!!cpu[i]})),pool:shuffle(P.map(p=>p.id)),nom:0,lot:null,log:[],res:null}}
function cpuVal(t,p){const o=SPOTS-t.r.length,aggr=Math.max(.6,t.c/o/(CAP/SPOTS));return Math.round(p.val*aggr*(.85+Math.random()*.4))}
function startLot(){
  const T=G.teams;if(T.every(full)){finish();return}
  if(!G.pool.length){const own=new Set(T.flatMap(t=>t.r.map(r=>r[0])));G.pool=shuffle(P.map(p=>p.id).filter(id=>!own.has(id)))}
  const id=G.pool.pop();G.nom++;
  let clock=(G.nom-1)%2;if(full(T[clock]))clock=1-clock;
  const forced=full(T[1-clock]);
  G.lot={id,n:G.nom,clock,hi:0,by:-1,bn:'',done:0,forced:forced?1:0};
  deadline=Date.now()+(forced?FORCED_MS:OPEN_MS);cpuPlan={};
  T.forEach((t,i)=>{if(t.cpu)cpuPlan[i]={val:cpuVal(t,P[id]),at:Date.now()+1500+Math.random()*3500}});
  changed();
}
function bid(i,amt,nick){
  const L=G.lot,t=G.teams[i];
  if(G.phase!=='auction'||!L||L.done||L.forced||!t||i===L.by||full(t)||!(amt>L.hi)||amt>t.c||!Number.isInteger(amt))return;
  L.hi=amt;L.by=i;L.bn=nick;const now=Date.now();deadline=Math.max(deadline,now+BID_MS);
  for(const j in cpuPlan)if(+j!==i&&cpuPlan[j].at!==Infinity)cpuPlan[j].at=now+1200+Math.random()*2800;
  changed();
}
function noBid(L){const T=G.teams;if(L.forced)return L.clock;const broke=[0,1].filter(i=>!full(T[i])&&T[i].c===0);return broke.length===1?broke[0]:broke.length?L.clock:-1}
function award(){
  const L=G.lot;
  if(L.by<0){const tg=noBid(L);
    if(tg<0){L.done=1;L.passed=1;G.log.unshift([L.id,-1,0]);G.log=G.log.slice(0,6);nextAt=Date.now()+SOLD_MS;changed();return}
    L.by=tg;L.hi=L.forced?Math.min(1,G.teams[tg].c):0;L.bn=''}
  const t=G.teams[L.by];t.r.push([L.id,L.hi]);t.c-=L.hi;L.done=1;
  G.log.unshift([L.id,L.by,L.hi]);G.log=G.log.slice(0,6);nextAt=Date.now()+SOLD_MS;changed();
}
function tick(now){
  const L=G.lot;if(!L){startLot();return}
  if(L.done){if(now>=nextAt)startLot();return}
  if(now>=deadline){award();return}
  if(L.forced)return;
  G.teams.forEach((t,i)=>{const pl=cpuPlan[i];if(!pl||i===L.by||full(t)||now<pl.at)return;
    const cap=Math.min(pl.val,t.c);
    if(L.hi<cap){const inc=cap-L.hi>4&&Math.random()<.4?3:1;bid(i,Math.min(cap,L.hi+inc),'CPU')}else pl.at=Infinity});
}
function finish(){
  const T=G.teams,pw=T.map(t=>t.r.reduce((s,r)=>s+P[r[0]].score,0)),box={},g=[],w=[0,0];
  while(w[0]<4&&w[1]<4){
    const sc=[0,1].map(i=>Math.round(108+(pw[i]-pw[1-i])*.3+randn()*10));
    if(sc[0]===sc[1])sc[Math.random()<.5?0:1]+=2+Math.floor(Math.random()*6);
    T.forEach((t,i)=>{const sp=t.r.reduce((s,r)=>s+P[r[0]].pts,0)||1;t.r.forEach(r=>{box[r[0]]=(box[r[0]]||0)+sc[i]*P[r[0]].pts/sp*(.75+Math.random()*.5)})});
    g.push(sc);w[sc[0]>sc[1]?0:1]++;
  }
  const win=w[0]>w[1]?0:1,ids=T[win].r.map(r=>r[0]).sort((a,b)=>box[b]-box[a]);
  G.res={g,win,mvp:ids[0],mp:+(box[ids[0]]/g.length).toFixed(1),pw:pw.map(Math.round)};
  G.phase='done';G.lot=null;changed();
}
function changed(){G.v++;render();if(online&&isHost)cast()}
function cast(){if(!game||!G)return;lastCast=Date.now();const d=JSON.parse(JSON.stringify(G));if(d.lot)d.lot.left=Math.max(0,deadline-Date.now());game.emit('state',d).catch(()=>{})}

