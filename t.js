// ---------- traits ----------
const TRAIT={pnr:['PnR Maestro',1,'Runs the pick-and-roll'],rim:['Rim Finisher',1,'Catches lobs and finishes at the rim'],shoot:['Sharpshooter',1,'Spaces the floor'],hub:['Point Center',1,'A big who runs the offense'],slash:['Slasher',1,'Lives in the paint'],lock:['Lockdown',1,'Shuts down the best scorer'],prot:['Rim Protector',1,'Blocks everything'],glue:['Glue Guy',1,'Does the dirty work'],iso:['Bucket Getter',1,'Gets a bucket whenever'],clutch:['Clutch',1,'Swings close games'],
  stop:['Ball Stopper',0,'The ball goes in and never comes out'],brick:['Bricklayer',0,"Can't shoot, so defenders sag off"],glass:['Glass Joints',0,'Misses 1 in 4 games'],cone:['Traffic Cone',0,'Gets blown by on defense'],tov:['Turnover Machine',0,'Gives it away'],hot:['Hothead',0,'Gets ejected 1 in 10 games'],bench:['Bench Warmer',0,'Just happy to be here']};
const SYN=[['pnr','rim','Lob City',8],['hub','shoot','Hub & Spokes',7],['lock','prot','No Fly Zone',6],['slash','shoot','Drive & Kick',5],['pnr','shoot','Pick & Pop',4],['glue','iso','Dirty Work',4],
  ['stop','stop','Too Many Cooks',-7],['brick','brick','No Spacing',-6],['stop','pnr','Who Has the Ball?',-4],['slash','brick','Clogged Lanes',-4]];
const FLAT={tov:-4,bench:-4,cone:-3};
// Starting five needs 2 guards, 2 forwards and a center; each empty slot costs POS_PEN.
const CHEM_X=3,SLOTS=[['G',2,['PG','SG']],['F',2,['SF','PF']],['C',1,['C']]],POS_PEN=15;
const UNITS=[{k:['shoot'],hole:'brick',n:['3 Shooters Start','4 Shooters Start','Five Out'],v:[3,8,15]},
  {k:['lock','prot'],hole:'cone',n:['3 Defenders Start','4 Defenders Start','No Weak Links'],v:[3,8,15]},
  {k:['slash','rim'],hole:null,n:['3 Paint Attackers','4 Paint Attackers','Bully Ball'],v:[2,6,12]}];
const TR={'Nikola Jokic':'hub','Shai Gilgeous-Alexander':'iso clutch','Giannis Antetokounmpo':'slash rim','Victor Wembanyama':'prot rim','Luka Doncic':'pnr iso','Anthony Edwards':'slash clutch','Cade Cunningham':'pnr','Jayson Tatum':'iso glass','Jalen Brunson':'pnr clutch','Donovan Mitchell':'iso shoot','Stephen Curry':'shoot clutch','Evan Mobley':'prot','Kevin Durant':'iso shoot','Tyrese Maxey':'slash','Devin Booker':'iso','Jaylen Brown':'slash','Jalen Williams':'lock glass','Paolo Banchero':'slash','Anthony Davis':'rim prot glass','Karl-Anthony Towns':'shoot cone','Kawhi Leonard':'lock glass','LeBron James':'pnr','Alperen Sengun':'hub','Jamal Murray':'pnr clutch','Chet Holmgren':'prot','Joel Embiid':'iso glass','Franz Wagner':'slash glass','Scottie Barnes':'glue','Amen Thompson':'lock brick','Jalen Johnson':'glue','Pascal Siakam':'slash','Cooper Flagg':'glue',
  'Trae Young':'pnr cone','LaMelo Ball':'pnr','Domantas Sabonis':'hub glass','James Harden':'pnr tov','Ja Morant':'slash glass',"De'Aaron Fox":'slash clutch','Bam Adebayo':'prot','Jaren Jackson Jr.':'prot','Jalen Duren':'rim','Zion Williamson':'slash glass','Darius Garland':'pnr','Derrick White':'glue shoot','Austin Reaves':'pnr','Deni Avdija':'slash','Mikal Bridges':'lock','OG Anunoby':'lock','Desmond Bane':'shoot','Lauri Markkanen':'shoot','Trey Murphy III':'shoot','Julius Randle':'stop','Ivica Zubac':'rim','Josh Giddey':'brick','Jarrett Allen':'rim','Norman Powell':'shoot','Zach LaVine':'stop shoot','Michael Porter Jr.':'shoot','Brandon Miller':'shoot','Stephon Castle':'lock brick','Dyson Daniels':'lock brick',
  'Kristaps Porzingis':'shoot glass','Walker Kessler':'prot glass','Rudy Gobert':'prot rim','Myles Turner':'prot shoot','Coby White':'shoot','Jalen Suggs':'lock','Josh Hart':'glue','Aaron Gordon':'rim','Jaden McDaniels':'lock','Onyeka Okongwu':'rim','Isaiah Hartenstein':'rim','Alex Sarr':'prot','Anfernee Simons':'shoot cone','Christian Braun':'glue','Shaedon Sharpe':'slash','Jalen Green':'stop','Naz Reid':'shoot','Herbert Jones':'lock brick','Jrue Holiday':'lock clutch','Bennedict Mathurin':'slash','Zach Edey':'rim glass','Draymond Green':'glue hot brick','Cam Thomas':'stop cone','Alex Caruso':'lock','Nic Claxton':'rim','Tyler Herro':'shoot cone','Paul George':'glass',
  'Russell Westbrook':'brick tov','Kelly Oubre Jr.':'stop','Bobby Portis':'hot','Tim Hardaway Jr.':'shoot cone','Klay Thompson':'shoot','Obi Toppin':'rim','Jusuf Nurkic':'rim cone',"Royce O'Neale":'glue shoot','Marcus Smart':'lock brick','Cason Wallace':'lock','Brook Lopez':'prot shoot','Kentavious Caldwell-Pope':'shoot','Al Horford':'shoot','Gary Trent Jr.':'shoot cone','Buddy Hield':'shoot cone','Kyle Anderson':'glue','Steven Adams':'rim brick','Mitchell Robinson':'rim brick','Caleb Martin':'bench','Clint Capela':'rim','Jeremy Sochan':'brick bench','Dorian Finney-Smith':'bench','Kelly Olynyk':'bench','Tyus Jones':'bench cone'};
const trBase=p=>p.tr||(p.tr=(TR[p.name]||'').split(' ').filter(Boolean));
// With scouting on, a hidden trait counts for everything but is only shown to the team that scouted him, his owner, and everyone once the series is played.
let SEEALL=false;
const seen=id=>{if(SEEALL||G.phase==='done')return true;const L=local();return L.includes(G.scout[id])||G.teams.some((t,i)=>L.includes(i)&&t.r.some(r=>r[0]===id))};
const isHid=(p,k)=>!!(G&&G.hid&&G.hid[p.id]===k);
const trOf=p=>{const b=trBase(p),h=G&&G.hid&&G.hid[p.id];return h&&G.teams&&seen(p.id)?b.concat(h):b};
// Lineup order: slot 1 is the star, slots 1-5 start, 6-7 come off the bench.
const ROLE_W=[1.3,1,1,1,1,.5,.5];
const r1=v=>Math.round(v*10)/10;
const wOf=t=>{const m={};t.r.forEach((r,k)=>m[r[0]]=ROLE_W[k]);return m};
// Every qualifying pair counts (bonuses stack); each pair is scaled by the two players' role weights.
function chem(ids,w,allPos){
  const W=id=>w&&w[id]!=null?w[id]:1,has=ids.map(id=>trOf(P[id])),out=[];let total=0;const X=CHEM_X;
  for(const[a,b,n,v]of SYN){let c=0,s=0;
    for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){const A=has[i],B=has[j];
      if(a===b?A.includes(a)&&B.includes(a):(A.includes(a)&&B.includes(b))||(A.includes(b)&&B.includes(a))){c++;s+=X*v*(W(ids[i])+W(ids[j]))/2}}
    if(c){s=r1(s);out.push([n+(c>1?' ×'+c:''),s]);total+=s}}
  for(const k in FLAT){let c=0,s=0;ids.forEach((id,i)=>{if(has[i].includes(k)){c++;s+=X*FLAT[k]*W(id)}});
    if(c){s=r1(s);out.push([TRAIT[k][0]+(c>1?' ×'+c:''),s]);total+=s}}
  // Unit bonuses: the more of the starting five share an identity, the bigger the bonus. One hole in the unit cancels it.
  const st=has.filter((_,i)=>W(ids[i])>=1);
  for(const u of UNITS){const c=Math.min(5,st.filter(t=>u.k.some(k=>t.includes(k))).length);if(c<3)continue;
    const holes=u.hole?st.filter(t=>t.includes(u.hole)).length:0,v=holes?0:X*u.v[c-3];
    out.push([u.n[c-3]+(holes?` (cancelled: a ${TRAIT[u.hole][0]} starts)`:''),v]);total+=v}
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
const chip=(k,sm,h)=>`<span class="tr ${TRAIT[k][1]?'up':'dn'}${sm?' sm':''}${h?' hid':''}" title="${h?'Hidden trait: ':''}${esc(TRAIT[k][2])}">${TRAIT[k][0]}</span>`;
const chips=(p,sm)=>trOf(p).map(k=>chip(k,sm,isHid(p,k))).join('');
const combos=p=>{const ks=trOf(p),r=[];for(const[a,b,n,v]of SYN){if(ks.includes(a)||ks.includes(b)){const o=ks.includes(a)?b:a;r.push(`${n} ${v>0?'+':''}${v*CHEM_X} with ${a===b?'another':'a'} ${TRAIT[o][0]}`)}}return r.slice(0,3)};
const sgn=v=>(v>0?'+':'')+r1(v);
const chemLine=(ids,w)=>chem(ids,w).list.map(([n,v])=>`<span class="${v>0?'cu':'cd'}">${esc(n)} ${sgn(v)}</span>`).join(' · ');

// ---------- options ----------
// Optional rules, chosen when a game is set up. Stored on G.opt.
const OPTS=[['cards','Hole cards','Each team is dealt 2 secret objectives worth bonus points. Everyone\'s cards are revealed at the end.'],
  ['scout','Scouting reports','Some players carry a hidden trait. One team secretly knows it before he hits the block.'],
  ['nom','Nominations','Teams take turns choosing who goes on the block, from 6 options.'],
  ['hide','Hidden budgets','You only see a range for other teams\' money, and what they paid is hidden.'],
  ['blind','Blind bids for legends','Each team gets one sealed bid on a Legend. Highest wins and pays its bid.']];
const opt=k=>!!(G&&G.opt&&G.opt[k]);
let offOpt={};try{offOpt=JSON.parse(localStorage.getItem('d30opt')||'{}')||{}}catch(e){}
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
const cashTxt=i=>{const c=G.teams[i].c;if(seesCash(i)||c===0)return'$'+c;const lo=Math.floor((c-1)/5)*5+1;return`$${lo}–${Math.min(CAP,lo+4)}`};
const priceTxt=(i,v)=>seesCash(i)?'$'+v:'$?';
function cardBox(i){if(!opt('cards'))return'';const t=G.teams[i];
  if(G.phase!=='done'&&!local().includes(i))return'<div class="hc"><span class="note">2 hole cards, face down</span></div>';
  return`<div class="hc">${(t.cards||[]).map(k=>{const c=CARD[k],ok=cardHit(t,k);return`<div class="hcc${ok?' ok':''}"><b>${ok?'✓ ':''}${c[1]}</b> <span class="note">${c[2]}</span> <span class="${ok?'cu':'note'}">+${c[3]}</span></div>`}).join('')}</div>`}

