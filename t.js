// ---------- traits ----------
const TRAIT={pnr:['PnR Maestro',1,'Runs the pick-and-roll'],rim:['Rim Finisher',1,'Catches lobs and finishes at the rim'],shoot:['Sharpshooter',1,'Spaces the floor'],hub:['Point Center',1,'A big who runs the offense'],slash:['Slasher',1,'Lives in the paint'],lock:['Lockdown',1,'Shuts down the best scorer'],prot:['Rim Protector',1,'Blocks everything'],glue:['Glue Guy',1,'Does the dirty work'],iso:['Bucket Getter',1,'Gets a bucket whenever'],clutch:['Clutch',1,'Swings close games'],
  stop:['Ball Stopper',0,'The ball goes in and never comes out'],brick:['Bricklayer',0,"Can't shoot, so defenders sag off"],glass:['Glass Joints',0,'Injury-prone: might miss games, and you never know how many'],cone:['Traffic Cone',0,'Gets blown by on defense'],tov:['Turnover Machine',0,'Gives it away'],hot:['Hothead',0,'Might get ejected from a game'],bench:['Bench Warmer',0,'Just happy to be here']};
const SYN=[['pnr','rim','Lob City',8],['hub','shoot','Hub & Spokes',7],['lock','prot','No Fly Zone',6],['slash','shoot','Drive & Kick',5],['pnr','shoot','Pick & Pop',4],['glue','iso','Dirty Work',4],
  ['stop','stop','Too Many Cooks',-7],['brick','brick','No Spacing',-6],['stop','pnr','Who Has the Ball?',-4],['slash','brick','Clogged Lanes',-4]];
const FLAT={tov:-4,bench:-4,cone:-3};
// Starting five needs 2 guards, 2 forwards and a center; each empty slot costs POS_PEN.
const CHEM_X=3,SLOTS=[['G',2,['PG','SG']],['F',2,['SF','PF']],['C',1,['C']]],POS_PEN=15;
// Trait tiers (TFT-style): starters sharing a trait unlock bigger bonuses at each breakpoint. Values are final points.
const TIERS=[{l:'Shooting',k:['shoot'],hole:'brick',t:[[2,6,'Spacing'],[3,15,'Splash Squad'],[4,30,'Four Out'],[5,45,'Five Out']]},
  {l:'Defense',k:['lock','prot'],hole:'cone',t:[[2,6,'Stoppers'],[3,15,'Lockdown Unit'],[4,30,'Shutdown Unit'],[5,45,'No Weak Links']]},
  {l:'Paint',k:['slash','rim'],hole:null,t:[[2,6,'Paint Touches'],[3,12,'Paint Attack'],[4,24,'Paint Beasts'],[5,36,'Bully Ball']]},
  {l:'Playmaking',k:['pnr','hub'],hole:null,t:[[2,6,'Two Creators'],[3,15,'Point Forwards Everywhere']]},
  {l:'Glue',k:['glue'],hole:null,t:[[2,9,'Glue Guys'],[3,21,'Winning Plays']]},
  {l:'Scoring',k:['iso'],hole:null,t:[[2,6,'Two Bucket Getters'],[3,15,'Iso Heaven']]},
  {l:'Clutch',k:['clutch'],hole:null,t:[[2,6,'Closers'],[3,15,'Ice in the Veins']]}];
const tierOf=(g,c)=>{let r=null;for(const x of g.t)if(c>=x[0])r=x;return r};
const TR={'Nikola Jokic':'hub','Shai Gilgeous-Alexander':'iso clutch','Giannis Antetokounmpo':'slash rim','Victor Wembanyama':'prot rim','Luka Doncic':'pnr iso','Anthony Edwards':'slash clutch','Cade Cunningham':'pnr','Jayson Tatum':'iso glass','Jalen Brunson':'pnr clutch','Donovan Mitchell':'iso shoot','Stephen Curry':'shoot clutch','Evan Mobley':'prot','Kevin Durant':'iso shoot','Tyrese Maxey':'slash','Devin Booker':'iso','Jaylen Brown':'slash','Jalen Williams':'lock glass','Paolo Banchero':'slash','Anthony Davis':'rim prot glass','Karl-Anthony Towns':'shoot cone','Kawhi Leonard':'lock glass','LeBron James':'pnr','Alperen Sengun':'hub','Jamal Murray':'pnr clutch','Chet Holmgren':'prot','Joel Embiid':'iso glass','Franz Wagner':'slash glass','Scottie Barnes':'glue','Amen Thompson':'lock brick','Jalen Johnson':'glue','Pascal Siakam':'slash','Cooper Flagg':'glue',
  'Trae Young':'pnr cone','LaMelo Ball':'pnr','Domantas Sabonis':'hub glass','James Harden':'pnr tov','Ja Morant':'slash glass',"De'Aaron Fox":'slash clutch','Bam Adebayo':'prot','Jaren Jackson Jr.':'prot','Jalen Duren':'rim','Zion Williamson':'slash glass','Darius Garland':'pnr','Derrick White':'glue shoot','Austin Reaves':'pnr','Deni Avdija':'slash','Mikal Bridges':'lock','OG Anunoby':'lock','Desmond Bane':'shoot','Lauri Markkanen':'shoot','Trey Murphy III':'shoot','Julius Randle':'stop','Ivica Zubac':'rim','Josh Giddey':'brick','Jarrett Allen':'rim','Norman Powell':'shoot','Zach LaVine':'stop shoot','Michael Porter Jr.':'shoot','Brandon Miller':'shoot','Stephon Castle':'lock brick','Dyson Daniels':'lock brick',
  'Kristaps Porzingis':'shoot glass','Walker Kessler':'prot glass','Rudy Gobert':'prot rim','Myles Turner':'prot shoot','Coby White':'shoot','Jalen Suggs':'lock','Josh Hart':'glue','Aaron Gordon':'rim','Jaden McDaniels':'lock','Onyeka Okongwu':'rim','Isaiah Hartenstein':'rim','Alex Sarr':'prot','Anfernee Simons':'shoot cone','Christian Braun':'glue','Shaedon Sharpe':'slash','Jalen Green':'stop','Naz Reid':'shoot','Herbert Jones':'lock brick','Jrue Holiday':'lock clutch','Bennedict Mathurin':'slash','Zach Edey':'rim glass','Draymond Green':'glue hot brick','Cam Thomas':'stop cone','Alex Caruso':'lock','Nic Claxton':'rim','Tyler Herro':'shoot cone','Paul George':'glass',
  'Russell Westbrook':'brick tov','Kelly Oubre Jr.':'stop','Bobby Portis':'hot','Tim Hardaway Jr.':'shoot cone','Klay Thompson':'shoot','Obi Toppin':'rim','Jusuf Nurkic':'rim cone',"Royce O'Neale":'glue shoot','Marcus Smart':'lock brick','Cason Wallace':'lock','Brook Lopez':'prot shoot','Kentavious Caldwell-Pope':'shoot','Al Horford':'shoot','Gary Trent Jr.':'shoot cone','Buddy Hield':'shoot cone','Kyle Anderson':'glue','Steven Adams':'rim brick','Mitchell Robinson':'rim brick','Caleb Martin':'bench','Clint Capela':'rim','Jeremy Sochan':'brick bench','Dorian Finney-Smith':'bench','Kelly Olynyk':'bench','Tyus Jones':'bench cone'};
const trBase=p=>p.tr||(p.tr=(TR[p.name]||'').split(' ').filter(Boolean));
// With scouting on, a hidden trait counts for everything but is only shown to the team that scouted him, his owner, and everyone once the series is played.
let SEEALL=false;
const seen=id=>{if(SEEALL||G.phase==='done')return true;const L=local();if(L.some(i=>hasA(G.teams[i],'eye')))return true;return L.includes(G.scout[id])||G.teams.some((t,i)=>L.includes(i)&&t.r.some(r=>r[0]===id))};
const isHid=(p,k)=>!!(G&&G.hid&&G.hid[p.id]===k);
const trOf=p=>{const b=trBase(p),h=G&&G.hid&&G.hid[p.id],e=G&&G.emb&&G.emb[p.id],r=h&&G.teams&&seen(p.id)?b.concat(h):b;return e?r.concat(e):r};
const isEmb=(p,k)=>!!(G&&G.emb&&G.emb[p.id]&&G.emb[p.id].includes(k));
// Lineup order: slot 1 is the star, slots 1-5 start, 6-7 come off the bench.
const ROLE_W=[1.3,1,1,1,1,.5,.5];
const r1=v=>Math.round(v*10)/10;
const rw=(t,k)=>k===0&&hasA(t,'star')?1.6:k>=5&&hasA(t,'deep')?.8:ROLE_W[k];
const wOf=t=>{const m={};t.r.forEach((r,k)=>m[r[0]]=rw(t,k));return m};
// Every qualifying pair counts (bonuses stack); each pair is scaled by the two players' role weights.
function chem(ids,w,allPos){
  const W=id=>w&&w[id]!=null?w[id]:1,has=ids.map(id=>trOf(P[id])),out=[];let total=0;const X=CHEM_X;
  for(const[a,b,n,v]of SYN){let c=0,s=0;
    for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){const A=has[i],B=has[j];
      if(a===b?A.includes(a)&&B.includes(a):(A.includes(a)&&B.includes(b))||(A.includes(b)&&B.includes(a))){c++;s+=X*v*(W(ids[i])+W(ids[j]))/2}}
    if(c){s=r1(s);out.push([n+(c>1?' ×'+c:''),s]);total+=s}}
  for(const k in FLAT){let c=0,s=0;ids.forEach((id,i)=>{if(has[i].includes(k)){c++;s+=X*FLAT[k]*W(id)}});
    if(c){s=r1(s);out.push([TRAIT[k][0]+(c>1?' ×'+c:''),s]);total+=s}}
  // Trait tiers: the more starters share a trait, the bigger the bonus. One hole in the unit cancels it.
  const st=has.filter((_,i)=>W(ids[i])>=1);
  for(const u of TIERS){const c=Math.min(5,st.filter(t=>u.k.some(k=>t.includes(k))).length),tr=tierOf(u,c);if(!tr)continue;
    const holes=u.hole?st.filter(t=>t.includes(u.hole)).length:0,v=holes?0:tr[1];
    out.push([tr[2]+(holes?` (cancelled: a ${TRAIT[u.hole][0]} starts)`:''),v]);total+=v}
  // Every position needs a starter: each one missing from the starting five costs points.
  if(ids.length||allPos){const sp=ids.filter(id=>W(id)>=1).map(id=>P[id].pos),miss=[];let n=0;
    for(const[l,need,ps]of SLOTS){const k=Math.max(0,need-sp.filter(q=>ps.includes(q)).length);if(k){n+=k;miss.push(k+' '+l)}}
    if(n){const v=-POS_PEN*n;out.push(['Starting five short '+miss.join(', '),v]);total+=v}}
  return{total:r1(total),list:out};
}
const power=(ids,w)=>ids.reduce((s,id)=>s+P[id].score*(w[id]!=null?w[id]:1),0)+chem(ids,w).total;
const HEX=[['PTS','pts'],['REB','reb'],['AST','ast'],['STL','stl'],['BLK','blk']];
const HEXMAX={};HEX.forEach(([,k])=>{HEXMAX[k]=P.filter(p=>p.yr===CUR).map(p=>p[k]).sort((x,y)=>y-x).slice(0,7).reduce((s,v,i)=>s+v*ROLE_W[i],0)*.75});
function hexSVG(t){
  const w=wOf(t),ids=t.r.map(r=>r[0]),tot=k=>ids.reduce((s,id)=>s+P[id][k]*w[id],0),c=chem(ids,w).total;
  const ax=HEX.map(([l,k])=>[l,Math.round(tot(k)*10)/10,tot(k)/HEXMAX[k]]).concat([['CHEM',c,(c+45)/120]]);
  const R=54,cx=95,cy=86,pt=(i,f)=>{const a=-Math.PI/2+i*Math.PI/3;return[cx+R*f*Math.cos(a),cy+R*f*Math.sin(a)]},poly=f=>ax.map((_,i)=>pt(i,typeof f==='number'?f:f(i)).map(n=>n.toFixed(1)).join(',')).join(' ');
  const cl=v=>Math.max(.04,Math.min(1,v));
  return`<svg class="hex" viewBox="0 0 190 172" role="img" aria-label="Lineup profile: ${ax.map(a=>a[0]+' '+a[1]).join(', ')}">
   ${[.25,.5,.75,1].map(f=>`<polygon points="${poly(f)}" class="hg"/>`).join('')}${ax.map((_,i)=>{const[x,y]=pt(i,1);return`<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" class="hg"/>`}).join('')}
   <polygon points="${poly(i=>cl(ax[i][2]))}" class="hv"/>
   ${ax.map(([l,v],i)=>{const[x,y]=pt(i,1.32);return`<text x="${x.toFixed(1)}" y="${(y-2).toFixed(1)}" class="hl">${l}</text><text x="${x.toFixed(1)}" y="${(y+9).toFixed(1)}" class="hn">${l==='CHEM'?sgn(v):v}</text>`}).join('')}</svg>`}
const chip=(k,sm,h,e)=>`<span class="tr ${TRAIT[k][1]?'up':'dn'}${sm?' sm':''}${h?' hid':''}${e?' emb':''}" title="${h?'Hidden trait: ':e?'Emblem: ':''}${esc(TRAIT[k][2])}">${e?'⬢ ':''}${TRAIT[k][0]}</span>`;
const chips=(p,sm)=>trOf(p).map(k=>chip(k,sm,isHid(p,k),isEmb(p,k))).join('');
const combos=p=>{const ks=trOf(p),r=[];for(const[a,b,n,v]of SYN){if(ks.includes(a)||ks.includes(b)){const o=ks.includes(a)?b:a;r.push(`${n} ${v>0?'+':''}${v*CHEM_X} with ${a===b?'another':'a'} ${TRAIT[o][0]}`)}}return r.slice(0,3)};
const sgn=v=>(v>0?'+':'')+r1(v);
const chemLine=(ids,w)=>chem(ids,w).list.map(([n,v])=>`<span class="${v>0?'cu':'cd'}">${esc(n)} ${sgn(v)}</span>`).join(' · ');

// ---------- options ----------
// Optional rules, chosen when a game is set up. Stored on G.opt.
const OPTS=[['cards','Hole cards','Each team is dealt 2 secret objectives worth bonus points. Everyone\'s cards are revealed at the end.'],
  ['scout','Scouting reports','Some players carry a hidden trait. One team secretly knows it before he hits the block.'],
  ['nom','Nominations','Teams take turns choosing who goes on the block, from 6 options.'],
  ['hide','Hidden budgets','You only see a range for other teams\' money, and what they paid is hidden.'],
  ['blind','Blind bids for legends','Each team gets one sealed bid on a Legend. Highest wins and pays its bid.'],
  ['int','Interest','Every 5 players, each team still drafting earns $1 for every $10 it holds.'],
  ['aug','Augments','After your 2nd and 5th signings, pick 1 of 3 rule-benders. The auction waits for everyone to pick (20 seconds, then a random pick).'],
  ['reroll','Rerolls','Once your roster is full, spend leftover money to reroll your last signing: $1, then $2, $4, $8…']];
const opt=k=>!!(G&&G.opt&&G.opt[k]);
let offOpt={};try{offOpt=JSON.parse(localStorage.getItem('d30opt')||'{}')||{}}catch(e){}
const clockRow=(sel,edit)=>{const v=Math.max(6,Math.min(30,+((sel&&sel.clock)||12)));return`<label class="opt sl"><span style="flex:1"><b>Bid clock: <span class="clv">${v}</span> seconds</b><br><span class="note">How long each player is on the block. A bid resets it to at least <span class="clb">${Math.max(4,Math.round(v*2/3))}</span> seconds.</span><input type="range" min="6" max="30" step="1" value="${v}" ${edit?'data-optv="clock"':'disabled'} aria-label="Bid clock in seconds"></span></label>`};
const optRows=(sel,edit)=>OPTS.map(([k,n,d])=>`<label class="opt"><input type="checkbox" ${edit?`data-opt="${k}"`:'disabled'} ${sel&&sel[k]?'checked':''}><span><b>${n}</b><br><span class="note">${d}</span></span></label>`).join('');
// Hole cards: [key, name, condition, points, test(ids, starters, team)]
const cnt=(ids,ks)=>ids.filter(id=>trOf(P[id]).some(k=>ks.includes(k))).length;
const CARDS=[['old','Old School','3+ throwback players on your roster',30,ids=>ids.filter(id=>P[id].yr!==CUR).length>=3],
  ['now','Win Now','No throwback players on your roster',20,ids=>ids.length>0&&ids.every(id=>P[id].yr===CUR)],
  ['towers','Twin Towers','2+ centers in your starting five',25,(ids,st)=>st.filter(id=>P[id].pos==='C').length>=2],
  ['small','Small Ball','No center in your starting five',35,(ids,st)=>st.length>0&&!st.some(id=>P[id].pos==='C')],
  ['cheap','Bargain Bin','Finish with $8 or more unspent',30,(ids,st,t)=>t.c>=8],
  ['splash','Big Splash','Pay $12+ for one player',20,(ids,st,t)=>t.r.some(r=>r[1]>=12)],
  ['pg','Point God','Your star is a PG',20,ids=>ids.length>0&&P[ids[0]].pos==='PG'],
  ['bigstar','Big Man Star','Your star is a C',20,ids=>ids.length>0&&P[ids[0]].pos==='C'],
  ['legend','Legendary','Your star is a Legend',35,ids=>ids.length>0&&isLeg(P[ids[0]])],
  ['shoot','Splash Brothers','3+ Sharpshooters on your roster',25,ids=>cnt(ids,['shoot'])>=3],
  ['def','Defense Wins','3+ Lockdown or Rim Protector players',25,ids=>cnt(ids,['lock','prot'])>=3],
  ['bad','Bad Boys','2+ Hotheads on your roster',30,ids=>cnt(ids,['hot'])>=2],
  ['tank','Embrace the Tank','3+ players with a bad trait',30,ids=>ids.filter(id=>trOf(P[id]).some(k=>!TRAIT[k][1])).length>=3],
  ['clutch','Clutch Gene','2+ Clutch players',25,ids=>cnt(ids,['clutch'])>=2],
  ['balanced','Balanced Attack','No starter scores 25+ a game',25,(ids,st)=>st.length===5&&st.every(id=>P[id].pts<25)],
  ['benchmob','Bench Mob','Both bench players score 10+ a game',20,ids=>ids.length===7&&ids.slice(5).every(id=>P[id].pts>=10)]];
const CARD={};CARDS.forEach(c=>CARD[c[0]]=c);
const CLASH=[['old','now'],['towers','small'],['cheap','splash'],['pg','bigstar'],['pg','legend'],['bigstar','legend']];
function dealCards(teams){const deck=shuffle(CARDS.map(c=>c[0]));teams.forEach(t=>{const a=deck.pop(),b=deck.find(k=>!CLASH.some(([x,y])=>(x===a&&y===k)||(y===a&&x===k)));deck.splice(deck.indexOf(b),1);t.cards=[a,b]})}
const cardHit=(t,k)=>{const ids=t.r.map(r=>r[0]);return!!CARD[k][4](ids,ids.slice(0,5),t)};
const cardBonus=t=>opt('cards')&&t.cards?t.cards.reduce((s,k)=>s+(cardHit(t,k)?CARD[k][3]:0),0):0;
// Scouting: about 30% of players get a hidden trait, and one random team knows each one.
const HID=['clutch','glue','shoot','lock','glass','hot','tov','cone'];
function hideTraits(g,n){g.hid={};g.scout={};P.forEach(p=>{if(Math.random()>=.3)return;const b=trBase(p),c=HID.filter(k=>!b.includes(k)&&!(k==='shoot'&&b.includes('brick'))&&!(k==='cone'&&b.includes('lock'))&&!(k==='lock'&&b.includes('cone')));
  if(c.length){g.hid[p.id]=c[Math.floor(Math.random()*c.length)];g.scout[p.id]=Math.floor(Math.random()*n)}})}
// Hidden budgets
const seesCash=i=>!opt('hide')||G.phase==='done'||local().includes(i);
const cashTxt=i=>{const c=G.teams[i].c;if(seesCash(i)||c===0)return'$'+c;const lo=Math.floor((c-1)/5)*5+1;return`$${lo}–${lo+4}`};
const priceTxt=(i,v)=>seesCash(i)?'$'+v:'$?';
function cardBox(i){if(!opt('cards'))return'';const t=G.teams[i];
  if(G.phase!=='done'&&!local().includes(i))return'<div class="hc"><span class="note">2 hole cards, face down</span></div>';
  return`<div class="hc">${(t.cards||[]).map(k=>{const c=CARD[k],ok=cardHit(t,k);return`<div class="hcc${ok?' ok':''}"><b>${ok?'✓ ':''}${c[1]}</b> <span class="note">${c[2]}</span> <span class="${ok?'cu':'note'}">+${c[3]}</span></div>`}).join('')}</div>`}


// Augments: [name, description, option it needs]
const hasA=(t,k)=>!!(t&&t.aug&&t.aug.some(a=>a.split(':')[0]===k));
const AUGS={cash:['Cash Injection','Get $5 right now.'],star:['Superstar','Your star counts ×1.6 instead of ×1.3.'],deep:['Deep Bench','Your bench counts ×0.8 instead of ½.'],
  nofee:['Tax Haven','You never pay pass fees.'],chem:['Chemistry Lab','Your positive chemistry counts 1.5×.'],hoard:['Hoarder','+3 team score for every $ you finish with.'],
  coupon:['Coupon Book','Your next 3 wins cost $2 less.'],pos:['Positionless','Your starting five has no position requirements.'],vet:['Old Heads','+8 team score for each throwback on your roster.'],
  thrift:['Thrift Store','+5 team score for each player you got for $1 or less.'],emb:['Emblem',''],eye:['Scouting Department','See every hidden trait.','scout'],
  free:['Free Rerolls','Your first 2 rerolls are free.','reroll'],rich:['Compound Interest','Interest pays $1 per $5 you hold, not per $10 (max $5).','int']};
const EMB=['shoot','lock','prot','rim','slash','pnr','glue','clutch'];
function embFor(t){const id=t.last;if(id==null)return null;const b=trBase(P[id]).concat(G.hid&&G.hid[id]?[G.hid[id]]:[],G.emb&&G.emb[id]||[]);
  const c=EMB.filter(k=>!b.includes(k)&&!(k==='shoot'&&b.includes('brick'))&&!(k==='lock'&&b.includes('cone')));return c.length?'emb:'+c[Math.floor(Math.random()*c.length)]+':'+id:null}
function augOffer(t){const own=new Set((t.aug||[]).concat((t.offers||[]).flat()).map(a=>a.split(':')[0]));
  return shuffle(Object.keys(AUGS).filter(k=>!own.has(k)&&(!AUGS[k][2]||opt(AUGS[k][2])))).map(k=>k==='emb'?embFor(t):k).filter(Boolean).slice(0,3)}
const augInfo=a=>{const[k,x,id]=a.split(':');return k==='emb'?[TRAIT[x][0]+' Emblem',`${P[+id].name} gains ${TRAIT[x][0]}.`]:AUGS[k]};
function pickAug(t,a){if(!t.offers||!t.offers.length||!t.offers[0].includes(a))return false;t.offers.shift();(t.aug=t.aug||[]).push(a);const[k,x,id]=a.split(':');
  if(k==='cash')t.c+=5;else if(k==='coupon')t.cp=3;else if(k==='free')t.free=2;else if(k==='emb'){G.emb=G.emb||{};G.emb[id]=(G.emb[id]||[]).concat(x)}return true}
function augBonus(t){if(!opt('aug')||!t.aug)return 0;const ids=t.r.map(r=>r[0]);let s=0;
  if(hasA(t,'hoard'))s+=3*t.c;if(hasA(t,'vet'))s+=8*ids.filter(id=>P[id].yr!==CUR).length;if(hasA(t,'thrift'))s+=5*t.r.filter(r=>r[1]<=1).length;
  if(hasA(t,'chem')||hasA(t,'pos')){const l=chem(ids,wOf(t)).list;if(hasA(t,'chem'))s+=.5*l.filter(x=>x[1]>0).reduce((a,x)=>a+x[1],0);
    if(hasA(t,'pos'))s-=l.filter(x=>/^Starting five short/.test(x[0])).reduce((a,x)=>a+x[1],0)}
  return r1(s)}
const extra=t=>cardBonus(t)+augBonus(t);
// Rerolls: swap your last signing for a random undrafted player. Cost doubles each time.
const rrCost=t=>t.free>0?0:Math.pow(2,t.rr||0);
function reroll(t){if(!opt('reroll')||!t||!full(t)||t.rd||t.last==null||(G.phase!=='auction'&&G.phase!=='lineup'))return false;const c=rrCost(t);if(c>t.c)return false;
  const busy=new Set(G.teams.flatMap(x=>x.r.map(r=>P[r[0]].name)));if(G.lot){if(G.lot.id!=null)busy.add(P[G.lot.id].name);(G.lot.ch||[]).forEach(x=>busy.add(P[x].name))}
  const cand=P.filter(p=>!busy.has(p.name)&&(!isLeg(p)||Math.random()<LEG_RATE));if(!cand.length)return false;
  const np=cand[Math.floor(Math.random()*cand.length)],k=t.r.findIndex(r=>r[0]===t.last);if(k<0)return false;
  t.rrLog=[t.last,np.id];t.r[k]=[np.id,t.r[k][1]];if(t.free>0)t.free--;else t.rr=(t.rr||0)+1;t.c-=c;t.last=np.id;t.nrr=(t.nrr||0)+1;
  if(!t.cu)t.r.sort((x,y)=>P[y[0]].score-P[x[0]].score);return true}
// Interest
function payInterest(){const a=G.teams.map(t=>full(t)?0:hasA(t,'rich')?Math.min(5,Math.floor(t.c/5)):Math.floor(t.c/10));G.teams.forEach((t,i)=>t.c+=a[i]);G.int={n:G.nom,a}}
// Trait tracker: every trait tier on your roster, with each breakpoint and what it's worth.
function tracker(t){const ids=t.r.map(r=>r[0]);if(!ids.length)return'';const w=wOf(t),st=ids.filter(id=>w[id]>=1),T=id=>trOf(P[id]),rows=[];
  for(const u of TIERS){const m=id=>u.k.some(k=>T(id).includes(k)),c=Math.min(5,st.filter(m).length),bn=ids.filter(m).length-c;if(!c&&!bn)continue;
    const tr=tierOf(u,c),hole=u.hole&&st.some(id=>T(id).includes(u.hole));
    const lad=u.t.map(x=>`<span class="tl${tr===x?(hole?' x':' on'):c>=x[0]?' past':''}" title="${esc(x[2])}">${x[0]} +${x[1]}</span>`).join('');
    rows.push([tr&&!hole?1:0,c,`<div class="tk${tr&&!hole?' act':''}"><span class="tn"><b>${u.l}</b> ${c}${bn?`<span class="note"> +${bn} bench</span>`:''}</span><span class="lad">${lad}</span>${hole&&tr?`<div class="cd" style="font-size:12px">Cancelled: a ${TRAIT[u.hole][0]} starts</div>`:''}</div>`])}
  const nx=[];for(const[a,b,n,v]of SYN){if(v<=0||a===b)continue;const A=ids.some(id=>T(id).includes(a)),B=ids.some(id=>T(id).includes(b));if(A!==B)nx.push(`${n}: add a ${TRAIT[A?b:a][0]} (+${v*CHEM_X})`)}
  const wn=[];for(const[a,b,n,v]of SYN){if(v>=0)continue;const ca=ids.filter(id=>T(id).includes(a)).length,cb=ids.filter(id=>T(id).includes(b)).length;if(a===b?ca===1:(ca>0)!==(cb>0))wn.push(`${n} (${v*CHEM_X}) if you add ${a===b?'another':'a'} ${TRAIT[ca?b:a][0]}`)}
  if(!rows.length&&!nx.length&&!wn.length)return'';
  return`<div class="trk"><div class="trh">Traits <span class="note">· starters count toward tiers</span></div>${rows.sort((x,y)=>y[0]-x[0]||y[1]-x[1]).map(r=>r[2]).join('')}${nx.length?`<div class="note" style="margin-top:4px">Pairs in reach: ${nx.slice(0,4).join(' · ')}</div>`:''}${wn.length?`<div class="note"><span class="cd">Watch out:</span> ${wn.slice(0,3).join(' · ')}</div>`:''}</div>`}
const augChips=t=>opt('aug')&&t.aug&&t.aug.length?`<div class="augs">${t.aug.map(a=>{const[n,d]=augInfo(a);return`<span class="aug" title="${esc(d)}">${esc(n)}</span>`}).join('')}</div>`:'';
function augPanel(i){const t=G.teams[i];if(!opt('aug')||!t.offers||!t.offers.length)return'';
  return`<div class="card augp"><h3 style="margin:0">${local().length>1?tn(i)+': choose':'Choose'} an augment</h3><span class="note">Pick 1 of 3. Everyone can see your augments.</span><div class="augo">${t.offers[0].map(a=>{const[n,d]=augInfo(a);return`<button data-aug="${i}|${esc(a)}"><b>${esc(n)}</b><span class="note">${esc(d)}</span></button>`}).join('')}</div></div>`}

