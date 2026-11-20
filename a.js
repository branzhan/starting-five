const CUR='2025-26';
const P=RAW.split('\n').map(l=>{const[name,pos,g,pts,reb,ast,stl,blk]=l.split('|');return{name,yr:CUR,pos,g:+g,pts:+pts,reb:+reb,ast:+ast,stl:+stl,blk:+blk}})
  .concat(HIST.split('\n').map(l=>{const[name,yr,pos,g,pts,reb,ast,stl,blk,tr]=l.split('|');return{name,yr,pos,g:+g,pts:+pts,reb:+reb,ast:+ast,stl:+stl,blk:+blk,na:stl==='',tr:tr.split(' ').filter(Boolean)}}))
  .map((p,i)=>{p.id=i;p.score=p.pts+2*p.reb+2*p.ast+4*p.stl+4*p.blk;p.val=Math.max(0,(p.score-35)*.3);return p});
// Legends are rare: each one makes a given game's pool only about 1 time in 7. Role players and busts always do.
const isLeg=p=>p.yr!==CUR&&p.score>=60;
const poolFor=owned=>shuffle(P.filter(p=>!owned.has(p.name)&&(!isLeg(p)||Math.random()<TU.leg/100)).map(p=>p.id));
const yrTag=p=>p.yr===CUR?'':`<span class="yr">’${p.yr.slice(-2)}</span>`;
const SPOTS=7,OPEN_MS=12000,BID_MS=8000,SOLD_MS=2800,FORCED_MS=3000,BLIND_MS=15000,NOM_N=6;
// Tunable values (the "Tune values" panel). Stored on G.opt.tune so every device uses the same numbers.
const TUNE=[['cap','Starting money ($)',30,10,100,1],['fee1','Pass fee ($)',1,0,5,1],['fee2','Pass fee once any roster is full ($)',2,0,5,1],['leg','Legend chance (%)',15,0,100,5],
  ['chem','Chemistry multiplier (pairs and traits)',3,0,6,.5],['tier','Trait tier multiplier',1,0,3,.25],['pos','Penalty per missing position',15,0,40,1],['star','Star weight',1.3,1,2,.1],['bench','Bench weight',.5,0,1,.1],
  ['wreb','Rebound weight',2,0,6,.5],['wast','Assist weight',2,0,6,.5],['wstl','Steal weight',4,0,8,.5],['wblk','Block weight',4,0,8,.5],
  ['glass','Glass Joints max miss chance (%)',30,0,60,5],['hot','Hothead max ejection chance (%)',20,0,50,5],['edge','How much team score decides games',.18,.05,.5,.01],
  ['intEvery','Interest: every N players',5,1,15,1],['intPer','Interest: $1 per this many $ held',10,3,20,1],['lock','Bid buttons pause after a new bid (seconds)',1,0,3,.25],['augS','Augment pick time (seconds)',20,5,60,5],['nomS','Nomination time (seconds)',15,5,60,5]];
const TU={};let tuKey=null;
function applyTune(t){const k=JSON.stringify(t||{});if(k===tuKey)return;tuKey=k;
  TUNE.forEach(([x,,d,mn,mx])=>{const v=t&&t[x]!=null?+t[x]:d;TU[x]=isFinite(v)?Math.min(mx,Math.max(mn,v)):d});
  try{ROLE_W[0]=TU.star;ROLE_W[5]=ROLE_W[6]=TU.bench}catch(e){}
  P.forEach(p=>{p.score=p.pts+TU.wreb*p.reb+TU.wast*p.ast+TU.wstl*p.stl+TU.wblk*p.blk;p.val=Math.max(0,(p.score-35)*.3)})}
applyTune();
const NOM_MS_=()=>TU.nomS*1000,AUG_MS_=()=>TU.augS*1000;
const $=s=>document.querySelector(s),V=$('#view');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const randn=()=>{let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)};
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const rid=()=>Math.random().toString(36).slice(2,10);
const full=t=>t.r.length>=SPOTS;
// Bid clock from the setup slider: each player opens with this many seconds; a bid resets it to 2/3 of that (at least 4s).
const clockS=()=>Math.max(6,Math.min(30,Math.round(+((G&&G.opt&&G.opt.clock)||12)))),openMs=()=>clockS()*1000,bidMs=()=>Math.max(4000,Math.round(clockS()*2/3)*1000),cpuF=()=>Math.min(1,clockS()/12);
let G=null,mode='landing',online=false,isHost=false,room,game=null,peers=[],me={nick:'',team:-1};
let deadline=0,nextAt=0,cpuPlan={},sealedBids={},lastCast=0,lastState=0,lastV=null,code='',cfg=null,hostGone=false,joinErr='',pending=false,unsub=[];
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
function newG(names,cpu,e,o){applyTune(o&&o.tune);const g={e:e||rid(),v:1,phase:'auction',opt:Object.assign({},o||{}),teams:names.map((n,i)=>({n,c:TU.cap,r:[],cpu:!!cpu[i],cu:0,rd:0})),pool:poolFor(new Set()),nom:0,lot:null,log:[],res:null};
  if(g.opt.cards)dealCards(g.teams);if(g.opt.scout)hideTraits(g,names.length);return g}
function cpuVal(t,p){const o=SPOTS-t.r.length,aggr=Math.max(.6,t.c/o/(TU.cap/SPOTS)),ids=t.r.map(r=>r[0]),d=chem(ids.concat(p.id),null,1).total-chem(ids,null,1).total;return Math.max(0,Math.round((p.val+d*.3)*aggr*(.85+Math.random()*.4)))}
function startLot(){
  const T=G.teams;if(T.every(full)){if(T.some(t=>!t.cpu)){G.phase='lineup';G.lot=null;changed()}else finish();return}
  if(opt('int')&&G.nom&&G.nom%TU.intEvery===0&&(!G.int||G.int.n!==G.nom))payInterest();
  const owned=new Set(T.flatMap(t=>t.r.map(r=>P[r[0]].name)));
  const draw=()=>{let id=G.pool.pop();while(id!=null&&owned.has(P[id].name))id=G.pool.pop();if(id==null){G.pool=poolFor(owned);id=G.pool.pop()}return id};
  G.nom++;
  const openT=T.map((t,i)=>i).filter(i=>!full(T[i])),clock=openT[(G.nom-1)%openT.length],forced=openT.length===1;
  if(opt('nom')&&!forced){const ch=[];for(let k=0;k<60&&ch.length<NOM_N;k++){const x=draw();if(x==null)break;if(!ch.some(y=>P[y].name===P[x].name))ch.push(x)}
    G.lot={n:G.nom,clock,pick:1,ch,hi:0,by:-1,bn:'',done:0,forced:0};deadline=Date.now()+NOM_MS_();cpuPlan={};changed();return}
  openLot(draw(),clock,forced);
}
function openLot(id,clock,forced){
  const blind=!forced&&opt('blind')&&isLeg(P[id]);
  G.lot={id,n:G.nom,clock,hi:0,by:-1,bn:'',done:0,forced:forced?1:0,blind:blind?1:0,sealed:[],ps:[]};
  deadline=Date.now()+(forced?FORCED_MS:blind?BLIND_MS:openMs());cpuPlan={};sealedBids={};
  G.teams.forEach((t,i)=>{if(t.cpu)cpuPlan[i]={val:cpuVal(t,P[id]),at:Date.now()+(1500+Math.random()*3500)*cpuF()}});
  changed();
}
// The nominating team picks one of its options; the rest go back to the bottom of the pool.
function nominate(team,id){const L=G.lot;if(!L||!L.pick||team!==L.clock||!L.ch.includes(id))return;L.ch.filter(x=>x!==id).forEach(x=>G.pool.unshift(x));openLot(id,L.clock,0)}
const cpuNom=L=>{const c=L.ch.slice().sort((x,y)=>P[y].val-P[x].val).slice(0,3);return c[Math.floor(Math.random()*c.length)]};
// Blind round: one sealed bid per team. The round ends early once every team that can bid has sealed.
function seal(i,amt,n){const L=G.lot,t=G.teams[i];
  if(!L||!L.blind||L.done||L.n!==n||!t||full(t)||!(amt>=0)||amt>t.c||!Number.isInteger(amt)||L.sealed.includes(i))return;
  sealedBids[i]=amt;L.sealed.push(i);
  if(G.teams.every((x,j)=>full(x)||x.c===0||L.sealed.includes(j)))deadline=Date.now();changed()}
function bid(i,amt,nick){
  const L=G.lot,t=G.teams[i];
  if(G.phase!=='auction'||!L||L.done||L.forced||L.blind||L.pick||!t||i===L.by||full(t)||!(amt>L.hi)||amt>t.c||!Number.isInteger(amt))return;
  L.hi=amt;L.by=i;L.bn=nick;L.ps=(L.ps||[]).filter(x=>x!==i);const now=Date.now();deadline=Math.max(deadline,now+bidMs());
  for(const j in cpuPlan)if(+j!==i&&cpuPlan[j].at!==Infinity)cpuPlan[j].at=now+(1200+Math.random()*2800)*cpuF();
  changed();
}
// Pass button: once every team that could still bid has passed (or can't afford to), the clock ends right away.
function passLot(i,n){const L=G.lot,t=G.teams[i];if(!L||L.done||L.forced||L.blind||L.pick||L.n!==n||!t||full(t)||i===L.by)return;L.ps=L.ps||[];if(!L.ps.includes(i)){L.ps.push(i);changed()}}
const allOut=L=>G.teams.every((t,j)=>j===L.by||full(t)||t.c<=L.hi||(L.ps||[]).includes(j));
// Passing costs every unfilled team $1, or $2 once any team's roster is full.
const passFee=()=>G.teams.some(full)?TU.fee2:TU.fee1;
function noBid(L){const T=G.teams;if(L.forced)return L.clock;const broke=T.map((t,i)=>i).filter(i=>!full(T[i])&&T[i].c===0);return !broke.length?-1:broke.includes(L.clock)?L.clock:broke[L.n%broke.length]}
function award(){
  const L=G.lot;
  if(L.blind&&!L.reveal){L.reveal=G.teams.map((t,i)=>sealedBids[i]!=null?sealedBids[i]:null);const bs=L.reveal.map((a,i)=>[i,a]).filter(([i,a])=>a>0);
    if(bs.length){const top=Math.max(...bs.map(x=>x[1])),w=bs.filter(x=>x[1]===top);L.by=w[Math.floor(Math.random()*w.length)][0];L.hi=top;L.bn=''}}
  if(L.by<0){const tg=noBid(L);
    if(tg<0){L.done=1;L.passed=1;const fee=passFee();G.teams.forEach(t=>{if(!full(t)&&!hasA(t,'nofee'))t.c-=Math.min(fee,t.c)});L.fee=fee;G.log.unshift([L.id,-1,0]);G.log=G.log.slice(0,6);nextAt=Date.now()+SOLD_MS;changed();return}
    L.by=tg;L.hi=L.forced?Math.min(1,G.teams[tg].c):0;L.bn=''}
  const t=G.teams[L.by];let pay=L.hi;if(t.cp>0&&pay>0){pay=Math.max(0,pay-2);t.cp--;L.disc=L.hi-pay}
  t.r.push([L.id,pay]);if(!t.cu)t.r.sort((x,y)=>P[y[0]].score-P[x[0]].score);t.c-=pay;t.last=L.id;L.done=1;
  if(opt('aug')&&(t.r.length===2||t.r.length===5)){const o=augOffer(t);if(o.length){t.offers=(t.offers||[]).concat([o]);if(t.cpu)while(t.offers.length)pickAug(t,t.offers[0][Math.floor(Math.random()*t.offers[0].length)])}}
  if(t.cpu&&full(t)&&opt('reroll'))for(let k=0;k<6&&rrCost(t)<=t.c&&P[t.last].score<30;k++)if(!reroll(t))break;
  G.log.unshift([L.id,L.by,pay]);G.log=G.log.slice(0,6);nextAt=Date.now()+SOLD_MS;changed();
}
function tick(now){
  const L=G.lot;if(!L){startLot();return}
  if(L.pick){if(now>=deadline)nominate(L.clock,L.ch[Math.floor(Math.random()*L.ch.length)]);else if(G.teams[L.clock].cpu&&now>=deadline-NOM_MS_()+2500)nominate(L.clock,cpuNom(L));return}
  // Augment picks pause the auction until everyone has chosen; whoever hasn't when the clock runs out gets a random one.
  if(L.done){const pend=G.teams.filter(t=>t.offers&&t.offers.length);
    if(L.aug){if(now>=deadline||!pend.length){pend.forEach(t=>{while(t.offers.length)pickAug(t,t.offers[0][Math.floor(Math.random()*t.offers[0].length)])});L.aug=0;startLot()}return}
    if(now>=nextAt){if(pend.length){L.aug=1;deadline=now+AUG_MS_();changed()}else startLot()}return}
  if(now>=deadline||(!L.forced&&!L.blind&&allOut(L))){award();return}
  if(L.forced)return;
  if(L.blind){G.teams.forEach((t,i)=>{const pl=cpuPlan[i];if(!pl||full(t)||t.c===0||now<pl.at||pl.at===Infinity)return;pl.at=Infinity;
    seal(i,Math.min(t.c,Math.max(0,Math.round(pl.val*(.65+Math.random()*.35)))),L.n)});return}
  G.teams.forEach((t,i)=>{const pl=cpuPlan[i];if(!pl||i===L.by||full(t)||now<pl.at)return;
    const cap=Math.min(pl.val,t.c);
    if(L.hi<cap){const inc=cap-L.hi>4&&Math.random()<.4?3:1;bid(i,Math.min(cap,L.hi+inc),'CPU')}else{pl.at=Infinity;L.ps=L.ps||[];if(!L.ps.includes(i)){L.ps.push(i);changed()}}});
}
function series(a,b){
  const T=G.teams,box={},g=[],w=[0,0],out={},cb=[extra(T[a]),extra(T[b])];
  // One game's lineup: injured or ejected players sit, and the top bench player fills each empty starting spot.
  // Each series rolls a fresh risk for every Glass Joints player (0-30% a game) and Hothead (0-20%): some series they never miss, some they miss a lot.
  const risk={};[a,b].forEach(x=>T[x].r.forEach(([id])=>{const k=trOf(P[id]);risk[id]=[k.includes('glass')?Math.random()*TU.glass/100:0,k.includes('hot')?Math.random()*TU.hot/100:0]}));
  const gameW=x=>{const ids=T[x].r.map(r=>r[0]),miss=new Set(ids.filter(id=>Math.random()<risk[id][0]||Math.random()<risk[id][1]));
    miss.forEach(id=>out[id]=(out[id]||0)+1);
    const m={};let holes=0;ids.forEach((id,k)=>{if(miss.has(id)){if(k<5)holes++;return}m[id]=k<5?rw(T[x],k):holes>0?(holes--,1):rw(T[x],k)});return m};
  while(w[0]<4&&w[1]<4){
    const ws=[gameW(a),gameW(b)],av=ws.map(m=>Object.keys(m).map(Number));
    const gp=av.map((ids,k)=>power(ids,ws[k])+cb[k]);
    const sc=[0,1].map(k=>Math.round(108+(gp[k]-gp[1-k])*TU.edge+randn()*10));
    if(Math.abs(sc[0]-sc[1])<=3)[0,1].forEach(k=>{sc[k]+=Math.round(av[k].filter(id=>trOf(P[id]).includes('clutch')).reduce((s,id)=>s+2*ws[k][id],0))});
    if(sc[0]===sc[1])sc[Math.random()<.5?0:1]+=2+Math.floor(Math.random()*6);
    av.forEach((ids,k)=>{const sp=ids.reduce((s,id)=>s+P[id].pts*ws[k][id],0)||1;ids.forEach(id=>{box[id]=(box[id]||0)+sc[k]*P[id].pts*ws[k][id]/sp*(.75+Math.random()*.5)})});
    g.push(sc);w[sc[0]>sc[1]?0:1]++;
  }
  const win=w[0]>w[1]?a:b,ids=T[win].r.map(r=>r[0]).sort((x,y)=>(box[y]||0)-(box[x]||0));
  return{a,b,g,w,win,mvp:ids[0],mp:+((box[ids[0]]||0)/g.length).toFixed(1),out:Object.entries(out).map(([id,n])=>[+id,n])};
}
function finish(){
  G.teams.forEach(t=>{while(t.offers&&t.offers.length)pickAug(t,t.offers[0][Math.floor(Math.random()*t.offers[0].length)])});
  SEEALL=true;const T=G.teams,N=T.length,pw=T.map(t=>power(t.r.map(r=>r[0]),wOf(t))+extra(t)),rr=[],wins=T.map(()=>0);
  let fin;
  if(N===2)fin=series(0,1);
  else{for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){const x=series(i,j);wins[x.win]++;rr.push(x)}
    const top=T.map((t,i)=>i).sort((x,y)=>wins[y]-wins[x]||pw[y]-pw[x]).slice(0,2);fin=series(top[0],top[1])}
  G.res={rr,fin,wins,pw:pw.map(Math.round)};SEEALL=false;
  G.phase='done';G.lot=null;changed();
}
function changed(){G.v++;render();if(online&&isHost)cast()}
function lineupAct(d){
  if(d.k==='nom'){if(G&&G.phase==='auction')nominate(+d.team,+d.id);return}
  if(d.k==='pass'){if(G&&G.phase==='auction')passLot(+d.team,+d.n);return}
  if(d.k==='seal'){if(G&&G.phase==='auction')seal(+d.team,+d.amt,+d.n);return}
  const t=G&&G.teams&&G.teams[+d.team];if(!t||t.rd||(G.phase!=='auction'&&G.phase!=='lineup'))return;
  if(d.k==='rr'){if(reroll(t))changed();return}
  if(d.k==='aug'){if(pickAug(t,String(d.key)))changed();return}
  if(d.k==='mv'){const a=+d.a,b=a+(+d.dir);if(Math.abs(+d.dir)!==1||!(a>=0&&b>=0&&a<t.r.length&&b<t.r.length))return;[t.r[a],t.r[b]]=[t.r[b],t.r[a]];t.cu=1;changed()}
  else if(d.k==='rdy'&&G.phase==='lineup'){t.rd=1;if(G.teams.every(x=>x.cpu||x.rd))finish();else changed()}
}
function cast(){if(!game||!G)return;lastCast=Date.now();const d=JSON.parse(JSON.stringify(G));if(d.lot)d.lot.left=Math.max(0,deadline-Date.now());game.emit('state',d).catch(()=>{})}

