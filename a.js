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
const local=()=>online?(me.team>=0&&me.team<G.teams.length?[me.team]:[]):G.teams.map((t,i)=>t.cpu?-1:i).filter(i=>i>=0);

// ---------- host engine ----------
function newG(names,cpu,e){return{e:e||rid(),v:1,phase:'auction',teams:names.map((n,i)=>({n,c:CAP,r:[],cpu:!!cpu[i]})),pool:shuffle(P.map(p=>p.id)),nom:0,lot:null,log:[],res:null}}
function cpuVal(t,p){const o=SPOTS-t.r.length,aggr=Math.max(.6,t.c/o/(CAP/SPOTS)),ids=t.r.map(r=>r[0]),d=chem(ids.concat(p.id)).total-chem(ids).total;return Math.max(0,Math.round((p.val+d*.3)*aggr*(.85+Math.random()*.4)))}
function startLot(){
  const T=G.teams;if(T.every(full)){finish();return}
  if(!G.pool.length){const own=new Set(T.flatMap(t=>t.r.map(r=>r[0])));G.pool=shuffle(P.map(p=>p.id).filter(id=>!own.has(id)))}
  const id=G.pool.pop();G.nom++;
  const openT=T.map((t,i)=>i).filter(i=>!full(T[i]));
  const clock=openT[(G.nom-1)%openT.length];
  const forced=openT.length===1;
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
function noBid(L){const T=G.teams;if(L.forced)return L.clock;const broke=T.map((t,i)=>i).filter(i=>!full(T[i])&&T[i].c===0);return !broke.length?-1:broke.includes(L.clock)?L.clock:broke[L.n%broke.length]}
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
function series(a,b){
  const T=G.teams,box={},g=[],w=[0,0],out={};
  while(w[0]<4&&w[1]<4){
    const av=[a,b].map(x=>T[x].r.map(r=>r[0]).filter(id=>{const k=trOf(P[id]),miss=(k.includes('glass')&&Math.random()<.25)||(k.includes('hot')&&Math.random()<.1);if(miss)out[id]=(out[id]||0)+1;return !miss}));
    const gp=av.map(ids=>ids.reduce((s,id)=>s+P[id].score,0)+chem(ids).total);
    const sc=[0,1].map(k=>Math.round(108+(gp[k]-gp[1-k])*.3+randn()*10));
    if(Math.abs(sc[0]-sc[1])<=3)[0,1].forEach(k=>{sc[k]+=2*av[k].filter(id=>trOf(P[id]).includes('clutch')).length});
    if(sc[0]===sc[1])sc[Math.random()<.5?0:1]+=2+Math.floor(Math.random()*6);
    av.forEach((ids,k)=>{const sp=ids.reduce((s,id)=>s+P[id].pts,0)||1;ids.forEach(id=>{box[id]=(box[id]||0)+sc[k]*P[id].pts/sp*(.75+Math.random()*.5)})});
    g.push(sc);w[sc[0]>sc[1]?0:1]++;
  }
  const win=w[0]>w[1]?a:b,ids=T[win].r.map(r=>r[0]).sort((x,y)=>(box[y]||0)-(box[x]||0));
  return{a,b,g,w,win,mvp:ids[0],mp:+((box[ids[0]]||0)/g.length).toFixed(1),out:Object.entries(out).map(([id,n])=>[+id,n])};
}
function finish(){
  const T=G.teams,N=T.length,pw=T.map(t=>t.r.reduce((s,r)=>s+P[r[0]].score,0)+chem(t.r.map(r=>r[0])).total),rr=[],wins=T.map(()=>0);
  let fin;
  if(N===2)fin=series(0,1);
  else{for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){const x=series(i,j);wins[x.win]++;rr.push(x)}
    const top=T.map((t,i)=>i).sort((x,y)=>wins[y]-wins[x]||pw[y]-pw[x]).slice(0,2);fin=series(top[0],top[1])}
  G.res={rr,fin,wins,pw:pw.map(Math.round)};
  G.phase='done';G.lot=null;changed();
}
function changed(){G.v++;render();if(online&&isHost)cast()}
function cast(){if(!game||!G)return;lastCast=Date.now();const d=JSON.parse(JSON.stringify(G));if(d.lot)d.lot.left=Math.max(0,deadline-Date.now());game.emit('state',d).catch(()=>{})}

