// ---------- traits ----------
const TRAIT={pnr:['PnR Maestro',1,'Runs the pick-and-roll'],rim:['Rim Finisher',1,'Catches lobs and finishes at the rim'],shoot:['Sharpshooter',1,'Spaces the floor'],hub:['Point Center',1,'A big who runs the offense'],slash:['Slasher',1,'Lives in the paint'],lock:['Lockdown',1,'Shuts down the best scorer'],prot:['Rim Protector',1,'Blocks everything'],glue:['Glue Guy',1,'Does the dirty work'],iso:['Bucket Getter',1,'Gets a bucket whenever'],clutch:['Clutch',1,'Swings close games'],
  stop:['Ball Stopper',0,'The ball goes in and never comes out'],brick:['Bricklayer',0,"Can't shoot, so defenders sag off"],glass:['Glass Joints',0,'Injury-prone: might miss games, and you never know how many'],cone:['Traffic Cone',0,'Gets blown by on defense'],tov:['Turnover Machine',0,'Gives it away'],hot:['Hothead',0,'Might get ejected from a game'],bench:['Bench Warmer',0,'Just happy to be here']};
const SYN=[['pnr','rim','Lob City',8],['hub','shoot','Hub & Spokes',7],['lock','prot','No Fly Zone',6],['slash','shoot','Drive & Kick',5],['pnr','shoot','Pick & Pop',4],['glue','iso','Dirty Work',4],
  ['stop','stop','Too Many Cooks',-7],['brick','brick','No Spacing',-6],['stop','pnr','Who Has the Ball?',-4],['slash','brick','Clogged Lanes',-4]];
Object.assign(TRAIT,{board:['Glass Cleaner',1,'Owns the boards: 11+ rebounds a game'],iron:['Iron Man',1,'Played every game: never misses one in the Finals either'],tdub:['Triple-Double Threat',1,'Fills the box score: 15+ points, 7+ rebounds, 7+ assists']});
SYN.push(['board','pnr','Outlet Pass',4],['board','shoot','Kick-Out Threes',3],['tdub','shoot','Point-Forward Spacing',4]);
const FLAT={tov:-4,bench:-4,cone:-3,tdub:3};
// Starting five needs 2 guards, 2 forwards and a center; each empty slot costs TU.pos.
const SLOTS=[['G',2,['PG','SG']],['F',2,['SF','PF']],['C',1,['C']]];
// Trait tiers (TFT-style): starters sharing a trait unlock bigger bonuses at each breakpoint. Values are final points.
const TIERS=[{l:'Shooting',d:'shooters',k:['shoot'],hole:'brick',t:[[2,6,'Spacing'],[3,15,'Splash Squad'],[4,30,'Four Out'],[5,45,'Five Out']]},
  {l:'Defense',d:'defenders',k:['lock','prot'],hole:'cone',t:[[2,6,'Stoppers'],[3,15,'Lockdown Unit'],[4,30,'Shutdown Unit'],[5,45,'No Weak Links']]},
  {l:'Paint',d:'paint attackers',k:['slash','rim'],hole:null,t:[[2,6,'Paint Touches'],[3,12,'Paint Attack'],[4,24,'Paint Beasts'],[5,36,'Bully Ball']]},
  {l:'Playmaking',d:'creators',k:['pnr','hub'],hole:null,t:[[2,6,'Two Creators'],[3,15,'Point Forwards Everywhere']]},
  {l:'Glue',d:'glue guys',k:['glue'],hole:null,t:[[2,9,'Glue Guys'],[3,21,'Winning Plays']]},
  {l:'Scoring',d:'bucket getters',k:['iso'],hole:null,t:[[2,6,'Two Bucket Getters'],[3,15,'Iso Heaven']]},
  {l:'Clutch',d:'closers',k:['clutch'],hole:null,t:[[2,6,'Closers'],[3,15,'Ice in the Veins']]},
  {l:'Rebounding',d:'glass cleaners',k:['board'],hole:null,t:[[2,9,'Board Men'],[3,21,'Own the Glass']]},
  {l:'Durability',d:'iron men',k:['iron'],hole:null,t:[[3,9,'Iron Men'],[5,21,'Iron Five']]}];
const tierOf=(g,c)=>{let r=null;for(const x of g.t)if(c>=x[0])r=x;return r};
const TR={'Nikola Jokic':'hub','Shai Gilgeous-Alexander':'iso clutch','Giannis Antetokounmpo':'slash rim','Victor Wembanyama':'prot rim','Luka Doncic':'pnr iso','Anthony Edwards':'slash clutch','Cade Cunningham':'pnr','Jayson Tatum':'iso glass','Jalen Brunson':'pnr clutch','Donovan Mitchell':'iso shoot','Stephen Curry':'shoot clutch','Evan Mobley':'prot','Kevin Durant':'iso shoot','Tyrese Maxey':'slash','Devin Booker':'iso','Jaylen Brown':'slash','Jalen Williams':'lock glass','Paolo Banchero':'slash','Anthony Davis':'rim prot glass','Karl-Anthony Towns':'shoot cone','Kawhi Leonard':'lock glass','LeBron James':'pnr','Alperen Sengun':'hub','Jamal Murray':'pnr clutch','Chet Holmgren':'prot','Joel Embiid':'iso glass','Franz Wagner':'slash glass','Scottie Barnes':'glue','Amen Thompson':'lock brick','Jalen Johnson':'glue','Pascal Siakam':'slash','Cooper Flagg':'glue',
  'Trae Young':'pnr cone','LaMelo Ball':'pnr','Domantas Sabonis':'hub glass','James Harden':'pnr tov','Ja Morant':'slash glass',"De'Aaron Fox":'slash clutch','Bam Adebayo':'prot','Jaren Jackson Jr.':'prot','Jalen Duren':'rim','Zion Williamson':'slash glass','Darius Garland':'pnr','Derrick White':'glue shoot','Austin Reaves':'pnr','Deni Avdija':'slash','Mikal Bridges':'lock','OG Anunoby':'lock','Desmond Bane':'shoot','Lauri Markkanen':'shoot','Trey Murphy III':'shoot','Julius Randle':'stop','Ivica Zubac':'rim','Josh Giddey':'brick','Jarrett Allen':'rim','Norman Powell':'shoot','Zach LaVine':'stop shoot','Michael Porter Jr.':'shoot','Brandon Miller':'shoot','Stephon Castle':'lock brick','Dyson Daniels':'lock brick',
  'Kristaps Porzingis':'shoot glass','Walker Kessler':'prot glass','Rudy Gobert':'prot rim','Myles Turner':'prot shoot','Coby White':'shoot','Jalen Suggs':'lock','Josh Hart':'glue','Aaron Gordon':'rim','Jaden McDaniels':'lock','Onyeka Okongwu':'rim','Isaiah Hartenstein':'rim','Alex Sarr':'prot','Anfernee Simons':'shoot cone','Christian Braun':'glue','Shaedon Sharpe':'slash','Jalen Green':'stop','Naz Reid':'shoot','Herbert Jones':'lock brick','Jrue Holiday':'lock clutch','Bennedict Mathurin':'slash','Zach Edey':'rim glass','Draymond Green':'glue hot brick','Cam Thomas':'stop cone','Alex Caruso':'lock','Nic Claxton':'rim','Tyler Herro':'shoot cone','Paul George':'glass',
  'Russell Westbrook':'brick tov','Kelly Oubre Jr.':'stop','Bobby Portis':'hot','Tim Hardaway Jr.':'shoot cone','Klay Thompson':'shoot','Obi Toppin':'rim','Jusuf Nurkic':'rim cone',"Royce O'Neale":'glue shoot','Marcus Smart':'lock brick','Cason Wallace':'lock','Brook Lopez':'prot shoot','Kentavious Caldwell-Pope':'shoot','Al Horford':'shoot','Gary Trent Jr.':'shoot cone','Buddy Hield':'shoot cone','Kyle Anderson':'glue','Steven Adams':'rim brick','Mitchell Robinson':'rim brick','Caleb Martin':'bench','Clint Capela':'rim','Jeremy Sochan':'brick bench','Dorian Finney-Smith':'bench','Kelly Olynyk':'bench','Tyus Jones':'bench cone'};
const trBase=p=>p.tr||(p.tr=(TR[p.name]||'').split(' ').filter(Boolean));
// Stat-based traits for everyone: 11+ boards, a full 82 games (past seasons), or a 15/7/7 line.
P.forEach(p=>{const b=trBase(p).slice(),add=k=>{if(!b.includes(k)&&b.length<4)b.push(k)};if(p.reb>=11)add('board');if(p.yr!==CUR&&p.g>=82&&!b.includes('glass'))add('iron');if(p.pts>=15&&p.reb>=7&&p.ast>=7)add('tdub');p.tr=b});
// Famous duos and trios: [names, name, points, how many of them you need].
const DUOS=[[['LeBron James','Kyrie Irving'],'3–1 Comeback',24],[["Shaquille O'Neal",'Kobe Bryant'],'Three-Peat',24],[['Michael Jordan','Scottie Pippen'],'Six Rings',30],
  [['Michael Jordan','Scottie Pippen','Dennis Rodman'],'72–10',24],[['Stephen Curry','Klay Thompson'],'Splash Bros',24],[['Stephen Curry','Klay Thompson','Draymond Green'],'Dynasty Warriors',18],
  [['John Stockton','Karl Malone'],'Stockton to Malone',20],[['Tim Duncan','Tony Parker','Manu Ginobili'],'Big Fundamentals',30],[['Kevin Garnett','Paul Pierce','Ray Allen'],'Ubuntu',30],
  [['LeBron James','Dwyane Wade','Chris Bosh'],'Heatles',30],[['Magic Johnson','Kareem Abdul-Jabbar'],'Showtime',24],[['Larry Bird','Kevin McHale','Robert Parish'],"The '86 Big Three",30],
  [['Kevin Durant','Russell Westbrook','James Harden'],'OKC Kids',24],[['Kevin Durant','Russell Westbrook'],'Before the Snake Emoji',12],[['Steve Nash',"Amar'e Stoudemire"],'Seven Seconds or Less',20],
  [['Kobe Bryant','Pau Gasol'],'Back-to-Back',18],[['Hakeem Olajuwon','Clyde Drexler'],'Phi Slama Jama',20],[['Chris Paul','Blake Griffin','DeAndre Jordan'],'Lob City Originals',24],
  [['Giannis Antetokounmpo','Khris Middleton'],'Bucks in Six',18],[['Nikola Jokic','Jamal Murray'],'Joker & Blue Arrow',18],[['Isiah Thomas','Joe Dumars','Bill Laimbeer','Dennis Rodman'],'Detroit Bad Boys',24,2],
  [['Jayson Tatum','Jaylen Brown'],'The Jays',18],[['Luka Doncic','Kyrie Irving'],'Luka & Uncle Drew',15],[['Dirk Nowitzki','Jason Kidd'],'2011 Ring',18],[['Gary Payton','Shawn Kemp'],'Reign Man & The Glove',20],
  [["Shaquille O'Neal",'Penny Hardaway'],'Blue Chips',18],[['Kawhi Leonard','Paul George'],'Load Management',-12],[['Yao Ming','Tracy McGrady'],'13 in 35 Seconds',18],
  [['Zach Randolph','Marc Gasol','Mike Conley','Tony Allen'],'Grit and Grind',24,3],[['Joel Embiid','Ben Simmons'],'Trust the Process',-9],[['Damian Lillard','CJ McCollum'],'Dame & CJ',15],
  [["Shaquille O'Neal",'Dwyane Wade'],'Flash & the Diesel',15],[['LeBron James','Anthony Davis'],'Bubble Ring',18],[['Allen Iverson','Carmelo Anthony'],'Two Ball Hogs',-9],
  [['Chris Webber','Mike Bibby','Peja Stojakovic','Vlade Divac'],'Greatest Show on Court',18,3],[['Ben Wallace','Rasheed Wallace','Chauncey Billups','Richard Hamilton'],'Goin to Work',24,3],
  [['Shai Gilgeous-Alexander','Chet Holmgren','Jalen Williams'],'Thunder Rising',18],[['Jimmy Butler','Bam Adebayo'],'Heat Culture, Concentrated',15],[['Kyle Lowry','DeMar DeRozan'],'Lowry & DeRozan',12],
  [['Ron Artest','Reggie Miller'],'Malice at the Palace',-6],[['Jalen Brunson','Josh Hart'],'Nova Knicks',12]];
const DUO_IDX={};DUOS.forEach((d,j)=>d[0].forEach(n=>(DUO_IDX[n]=DUO_IDX[n]||[]).push(j)));
// With scouting on, a hidden trait counts for everything but is only shown to the team that scouted him, his owner, and everyone once the series is played.
let SEEALL=false;
const seen=id=>{if(SEEALL||G.phase==='done')return true;const L=local();if(L.some(i=>hasA(G.teams[i],'eye')))return true;return L.includes(G.scout[id])||G.teams.some((t,i)=>L.includes(i)&&t.r.some(r=>r[0]===id))};
const isHid=(p,k)=>!!(G&&G.hid&&G.hid[p.id]===k);
const trOf=p=>{const b=trBase(p),h=G&&G.hid&&G.hid[p.id],e=G&&G.emb&&G.emb[p.id],r=h&&G.teams&&seen(p.id)?b.concat(h):b;return e?r.concat(e):r};
const isEmb=(p,k)=>!!(G&&G.emb&&G.emb[p.id]&&G.emb[p.id].includes(k));
// Lineup order: slot 1 is the star, slots 1-5 start, 6-7 come off the bench.
const ROLE_W=[TU.star,1,1,1,1,TU.bench,TU.bench];
const r1=v=>Math.round(v*10)/10;
const rw=(t,k)=>k===0?(hasA(t,'tank')?1.1:hasA(t,'max')?1.8:hasA(t,'star')?1.55:ROLE_W[0]):k===5&&hasA(t,'sixth')?.95:k>=5&&hasA(t,'deep')?.8:ROLE_W[k];
const wOf=t=>{const m={};t.r.forEach((r,k)=>m[r[0]]=rw(t,k));return m};
// Every qualifying pair counts (bonuses stack); each pair is scaled by the two players' role weights.
const sn=id=>{const w=P[id].name.replace(/\s+(Jr\.?|Sr\.?|II|III|IV)$/,'').split(' ');return w.length>1?w.slice(1).join(' '):w[0]};
function chem(ids,w,allPos){
  const W=id=>w&&w[id]!=null?w[id]:1,has=ids.map(id=>trOf(P[id])),out=[];let total=0;const X=TU.chem;
  // Each row: [name, points, kind, who's involved].
  // Repeats of the same pair add less each time (1, ½, ⅓, …) so one combo can't snowball.
  for(const[a,b,n,v]of SYN){let c=0,s=0;const pr=[],ws=[];
    for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){const A=has[i],B=has[j];
      if(a===b?A.includes(a)&&B.includes(a):(A.includes(a)&&B.includes(b))||(A.includes(b)&&B.includes(a))){c++;ws.push((W(ids[i])+W(ids[j]))/2);pr.push(sn(ids[i])+' + '+sn(ids[j]))}}
    ws.sort((x,y)=>Math.abs(y)-Math.abs(x)).forEach((x,k)=>s+=X*v*x/(k+1));
    if(c){s=r1(s);out.push([n,s,'pair',pr.length>3?pr.slice(0,3).join(', ')+` and ${pr.length-3} more`:pr.join(', ')]);total+=s}}
  for(const k in FLAT){let c=0,s=0;const who=[];ids.forEach((id,i)=>{if(has[i].includes(k)){c++;s+=X*FLAT[k]*W(id);who.push(sn(id))}});
    if(c){s=r1(s);out.push([TRAIT[k][0],s,'flat',who.join(', ')]);total+=s}}
  // Franchise groups, real teammates (same team, same season) and famous duos; they scale with the chemistry multiplier and bench members count half.
  const CX=X/3,aw=m=>m.reduce((a,id)=>a+Math.min(1,W(id)),0)/m.length;
  const frc={};ids.forEach(id=>{const f=P[id].fr;if(f&&FR[f])(frc[f]=frc[f]||[]).push(id)});
  for(const f in frc){const m=frc[f];if(m.length<2)continue;const v=r1([0,0,6,15,30][Math.min(4,m.length)]*CX*aw(m));out.push([FR[f][1],v,'fr',`${m.length} ${FR[f][0]}: ${m.map(sn).join(', ')}`]);total+=v}
  const mates=[];for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){const A=P[ids[i]],B=P[ids[j]];if(A.tm&&A.tm===B.tm&&A.yr===B.yr)mates.push([ids[i],ids[j]])}
  if(mates.length){const v=r1(mates.reduce((a,[x,y])=>a+4*CX*(Math.min(1,W(x))+Math.min(1,W(y)))/2,0));out.push(['Real Teammates',v,'mates',mates.map(([x,y])=>`${sn(x)} + ${sn(y)} ('${P[x].yr.slice(-2)} ${P[x].tm})`).join(', ')]);total+=v}
  const byName={};ids.forEach(id=>byName[P[id].name]=id);
  for(const[ns,n,v,need]of DUOS){const m=ns.filter(x=>byName[x]!=null).map(x=>byName[x]);if(m.length>=(need||ns.length)){const s=r1(v*CX*aw(m));out.push([n,s,'duo',m.map(sn).join(' + ')]);total+=s}}
  // Trait tiers: the more starters share a trait, the bigger the bonus. One hole in the unit cancels it.
  const st=has.filter((_,i)=>W(ids[i])>=1);
  for(const u of TIERS){const c=Math.min(5,st.filter(t=>u.k.some(k=>t.includes(k))).length),tr=tierOf(u,c);if(!tr)continue;
    const holes=u.hole?st.filter(t=>t.includes(u.hole)).length:0,v=holes?0:r1(tr[1]*TU.tier);
    out.push([tr[2],v,'tier',holes?`cancelled: a ${TRAIT[u.hole][0]} starts`:`${c} starting ${u.d}`]);total+=v}
  // Every position needs a starter: each one missing from the starting five costs points.
  if(ids.length||allPos){const sp=ids.filter(id=>W(id)>=1).map(id=>P[id].pos),miss=[];let n=0;
    for(const[l,need,ps]of SLOTS){const k=Math.max(0,need-sp.filter(q=>ps.includes(q)).length);if(k){n+=k;miss.push(k+' '+l)}}
    if(n){const v=-TU.pos*n;out.push(['Starting five short '+miss.join(', '),v,'pos','needs 2 G, 2 F, 1 C']);total+=v}}
  return{total:r1(total),list:out};
}
const power=(ids,w)=>ids.reduce((s,id)=>s+P[id].eff*(w[id]!=null?w[id]:1),0)+chem(ids,w).total;
const HEX=[['PTS','pts'],['REB','reb'],['AST','ast'],['STL','stl'],['BLK','blk']];
const HEXMAX={};HEX.forEach(([,k])=>{HEXMAX[k]=P.filter(p=>p.yr===CUR).map(p=>p[k]).sort((x,y)=>y-x).slice(0,7).reduce((s,v,i)=>s+v*ROLE_W[i],0)*.75});
function hexSVG(t){
  const w=wOf(t),ids=t.r.map(r=>r[0]),tot=k=>ids.reduce((s,id)=>s+P[id][k]*w[id],0),c=Math.round(chemShown(ids,w,t).total);
  const ax=HEX.map(([l,k])=>[l,Math.round(tot(k)*10)/10,tot(k)/HEXMAX[k]]).concat([['CHEM',c,(c+45)/120]]);
  const R=54,cx=95,cy=86,pt=(i,f)=>{const a=-Math.PI/2+i*Math.PI/3;return[cx+R*f*Math.cos(a),cy+R*f*Math.sin(a)]},poly=f=>ax.map((_,i)=>pt(i,typeof f==='number'?f:f(i)).map(n=>n.toFixed(1)).join(',')).join(' ');
  const cl=v=>Math.max(.04,Math.min(1,v));
  return`<svg class="hex" viewBox="0 0 190 172" role="img" aria-label="Lineup profile: ${ax.map(a=>a[0]+' '+a[1]).join(', ')}">
   ${[.25,.5,.75,1].map(f=>`<polygon points="${poly(f)}" class="hg"/>`).join('')}${ax.map((_,i)=>{const[x,y]=pt(i,1);return`<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" class="hg"/>`}).join('')}
   <polygon points="${poly(i=>cl(ax[i][2]))}" class="hv"/>
   ${ax.map(([l,v],i)=>{const[x,y]=pt(i,1.32);return`<text x="${x.toFixed(1)}" y="${(y-2).toFixed(1)}" class="hl">${l}</text><text x="${x.toFixed(1)}" y="${(y+9).toFixed(1)}" class="hn">${l==='CHEM'?sgn(v):v}</text>`}).join('')}</svg>`}
const chip=(k,sm,h,e)=>`<span class="tr ${TRAIT[k][1]?'up':'dn'}${sm?' sm':''}${h?' hid':''}${e?' emb':''}" title="${h?'Hidden trait: ':e?'Emblem: ':''}${esc(TRAIT[k][2])}">${e?'⬢ ':''}${TRAIT[k][0]}</span>`;
const chips=(p,sm)=>fogOn()?'':trOf(p).map(k=>chip(k,sm,isHid(p,k),isEmb(p,k))).join('');
// What he'd complete for your team: a famous duo, or a franchise group.
const famFor=(p,t)=>{if(!t)return[];const names=new Set(t.r.map(r=>P[r[0]].name)),r=[];
  (DUO_IDX[p.name]||[]).forEach(j=>{const[ns,n,v,need]=DUOS[j],have=ns.filter(x=>x!==p.name&&names.has(x)).length;if(have+1===(need||ns.length))r.push(`${v>0?'⭐':'⚠️'} ${n} ${v>0?'+':''}${Math.round(v*TU.chem/3)}`)});
  const fm=t.r.filter(r=>P[r[0]].fr&&P[r[0]].fr===p.fr&&P[r[0]].name!==p.name).length;if(fm&&FR[p.fr])r.push(`🏟️ ${FR[p.fr][1]} (${fm+1} ${FR[p.fr][0]})`);return r};
const combos=p=>{const ks=trOf(p),r=[];for(const[a,b,n,v]of SYN){if(ks.includes(a)||ks.includes(b)){const o=ks.includes(a)?b:a;r.push(`${n} ${v>0?'+':''}${v*TU.chem} with ${a===b?'another':'a'} ${TRAIT[o][0]}`)}}return r.slice(0,3)};
const sgn=v=>{const r=Math.round(v);return(r>0?'+':'')+r};
const chemLine=(ids,w)=>chem(ids,w).list.map(([n,v])=>`<span class="${v>0?'cu':'cd'}">${esc(n)} ${sgn(v)}</span>`).join(' · ');
const CKIND={pair:'Pair',flat:'Trait',tier:'Tier',pos:'Lineup',fr:'Franchise',mates:'Teammates',duo:'Duo'};
const posPending=n=>G&&G.phase==='auction'&&n<SPOTS;
// Positionless waives the position rule; scoring refunds it through augBonus, so the panel just shows it as waived.
const posWaived=t=>!!(t&&opt('aug')&&hasA(t,'pos'));
function chemShown(ids,w,t){const c=chem(ids,w),p=c.list.find(x=>x[2]==='pos');if(!p)return c;
  if(posWaived(t))return{total:r1(c.total-p[1]),list:c.list.map(x=>x===p?[x[0].replace('Starting five short','Positions waived: no'),0,'todo','Positionless augment']:x)};
  if(!posPending(ids.length))return c;
  return{total:r1(c.total-p[1]),list:c.list.map(x=>x===p?[x[0].replace('Starting five short','Still need'),0,'todo',`−${TU.pos} each if still empty at the end`]:x)}}
function chemBox(ids,w,t){const c=chemShown(ids,w,t),l=c.list.filter(x=>Math.round(x[1])!==0||x[2]==='tier'||x[2]==='todo').sort((x,y)=>y[1]-x[1]);if(!l.length)return'';
  return`<div class="chm"><div class="chh"><span>Chemistry</span><b class="${c.total>=0?'cu':'cd'}">${sgn(c.total)}</b></div>${l.map(([n,v,k,d])=>`<div class="chr"><span class="chi ${v>0?'cu':v<0?'cd':'note'}">${v>0?'▲':v<0?'▼':'–'}</span><span class="chn"><b>${esc(n)}</b>${d?`<span class="note"> · ${esc(d)}</span>`:''}</span><span class="chv ${v>0?'cu':v<0?'cd':'note'}">${k==='todo'?'':sgn(v)}</span></div>`).join('')}<div class="note chf">Pairs count fully between starters; the star counts 1.3×, bench players ½. Repeats of the same pair add less each time.</div></div>`}

// ---------- options ----------
// Optional rules, chosen when a game is set up. Stored on G.opt.
const OPTS=[['cards','Hole cards','Each team is dealt 2 secret objectives worth bonus points. Everyone\'s cards are revealed at the end.'],
  ['scout','Scouting reports','Some players carry a hidden trait. One team secretly knows it before he hits the block.'],
  ['nom','Nominations','Teams take turns choosing who goes on the block, from 6 options.'],
  ['hide','Hidden budgets','You only see a range for other teams\' money, and what they paid is hidden.'],
  ['blind','Blind bids for legends','Each team gets one sealed bid on a Legend. Highest wins and pays its bid. In single-era games, it applies to that era\'s superstars.'],
  ['int','Interest','Every 5 players, each team still drafting earns $1 for every $10 it holds.'],
  ['aug','Augments','After your 2nd and 5th signings, pick 1 of 3 rule-benders. The auction waits for everyone to pick (20 seconds, then a random pick).'],
  ['fog','Fog of war','You only see 2 stats per player (set the number in Tune values). Traits, chemistry and team totals stay hidden until the results.'],
  ['bounty','Rivalry bounties','Each team secretly gets a bounty: keep a named rival from signing any player with a certain trait. Pull it off for +25.'],
  ['reroll','Rerolls','Once your roster is full, spend leftover money to reroll your last signing: $1, then $2, $4, $8…']];
const opt=k=>!!(G&&G.opt&&G.opt[k]);
let offOpt={};try{offOpt=JSON.parse(localStorage.getItem('d30opt')||'{}')||{}}catch(e){}
const aiRow=(sel,edit)=>{const v=(sel&&sel.ai)||'normal';return`<label class="opt sl"><span style="flex:1"><b>CPU skill</b><br><span class="note">Easy bids on points alone and makes impulse buys. Normal is the classic CPU. Hard plans its budget, reads what rivals need and sets its lineup to win. Expert plays out the rest of the draft before every bid and mixes up its limits so you can't read it.</span></span><select ${edit?'data-optsel="ai"':'disabled'} aria-label="CPU skill">${[['easy','Easy'],['normal','Normal'],['hard','Hard'],['expert','Expert']].map(([k,l])=>`<option value="${k}"${v===k?' selected':''}>${l}</option>`).join('')}</select></label>`};
const clockRow=(sel,edit)=>{const v=Math.max(6,Math.min(30,+((sel&&sel.clock)||12)));return`<label class="opt sl"><span style="flex:1"><b>Bid clock: <span class="clv">${v}</span> seconds</b><br><span class="note">How long each player is on the block. A bid resets it to at least <span class="clb">${Math.max(4,Math.round(v*2/3))}</span> seconds.</span><input type="range" min="6" max="30" step="1" value="${v}" ${edit?'data-optv="clock"':'disabled'} aria-label="Bid clock in seconds"></span></label>`};
let tuneOpen=false,offSel={n:'2',who:'cpu'};try{Object.assign(offSel,JSON.parse(localStorage.getItem('d30sel')||'{}'))}catch(e){}
const tuneBox=(sel,edit)=>{const v=Object.assign({},sel&&sel.tune),ch=TUNE.filter(x=>v[x[0]]!=null&&+v[x[0]]!==x[2]);
  if(!edit)return ch.length?`<p class="note" style="margin:8px 0 0"><b>Tuned:</b> ${ch.map(x=>esc(x[1])+' '+v[x[0]]).join(' · ')}</p>`:'';
  return`<details class="tune"${tuneOpen?' open':''}><summary class="tsum"><b>Tune values</b>${ch.length?` <span class="note">(${ch.length} changed)</span>`:''}</summary><div class="tg">${TUNE.map(([k,l,d,mn,mx,st])=>`<label class="${v[k]!=null&&+v[k]!==d?'chg':''}"><span>${esc(l)}<span class="note"> · default ${d}</span></span><input type="number" data-tune="${k}" min="${mn}" max="${mx}" step="${st}" value="${v[k]!=null?v[k]:d}"></label>`).join('')}</div>${ch.length?'<button data-act="tunereset" style="margin-top:8px">Reset to defaults</button>':''}</details>`};
const eraRow=(sel,edit)=>{const on=sel&&sel.eras&&sel.eras.length?sel.eras:ERAS.map(e=>e[0]),n=P.filter(p=>on.includes(p.era)).length;
  return`<div class="eras"><b>Eras</b> <span class="note">· ${n} players in the pool${n<70?' (small pool: some players may come up twice)':''}</span><div class="erl">${ERAS.map(([k,l])=>`<label class="era"><input type="checkbox" ${edit?`data-era="${k}"`:'disabled'} ${on.includes(k)?'checked':''}><span>${l}</span></label>`).join('')}</div></div>`};
const optRows=(sel,edit)=>OPTS.map(([k,n,d])=>`<label class="opt"><input type="checkbox" ${edit?`data-opt="${k}"`:'disabled'} ${sel&&sel[k]?'checked':''}><span><b>${n}</b><br><span class="note">${d}</span></span></label>`).join('');
// Hole cards: [key, name, condition, points, test(ids, starters, team)]
const cnt=(ids,ks)=>ids.filter(id=>trOf(P[id]).some(k=>ks.includes(k))).length;
const CARDS=[['old','Old School','3+ players from before 2000',20,ids=>ids.filter(id=>['old','90s'].includes(P[id].era)).length>=3],
  ['now','Win Now','2+ players from this season',25,ids=>ids.filter(id=>P[id].yr===CUR).length>=2],
  ['towers','Twin Towers','2+ centers in your starting five',25,(ids,st)=>st.filter(id=>P[id].pos==='C').length>=2],
  ['small','Small Ball','No center in your starting five',15,(ids,st)=>st.length>0&&!st.some(id=>P[id].pos==='C')],
  ['cheap','Bargain Bin','Finish with $5 or more unspent',35,(ids,st,t)=>t.c>=5],
  ['splash','Big Splash','Pay $12+ for one player',20,(ids,st,t)=>t.r.some(r=>r[1]>=12)],
  ['pg','Point God','Your star is a PG',12,ids=>ids.length>0&&P[ids[0]].pos==='PG'],
  ['bigstar','Big Man Star','Your star is a C',12,ids=>ids.length>0&&P[ids[0]].pos==='C'],
  ['legend','Legendary','Your star is a Legend',35,ids=>ids.length>0&&isLeg(P[ids[0]])],
  ['shoot','Splash Brothers','3+ Sharpshooters on your roster',30,ids=>cnt(ids,['shoot'])>=3],
  ['def','Defense Wins','3+ Lockdown or Rim Protector players',30,ids=>cnt(ids,['lock','prot'])>=3],
  ['bad','Bad Boys','A Hothead in your starting five',20,(ids,st)=>cnt(st,['hot'])>=1],
  ['tank','Embrace the Tank','3+ players with a bad trait',20,ids=>ids.filter(id=>trOf(P[id]).some(k=>!TRAIT[k][1])).length>=3],
  ['clutch','Clutch Gene','A Clutch player in your starting five',20,(ids,st)=>cnt(st,['clutch'])>=1],
  ['balanced','Balanced Attack','No starter scores 25+ a game',15,(ids,st)=>st.length===5&&st.every(id=>P[id].pts<25)],
  ['benchmob','Bench Mob','Both bench players score 14+ a game',12,ids=>ids.length===7&&ids.slice(5).every(id=>P[id].pts>=14)],
  ['franchise','Franchise Player','Another player from your star\'s franchise',20,ids=>ids.length>1&&!!P[ids[0]].fr&&ids.slice(1).some(id=>P[id].fr===P[ids[0]].fr)],
  ['mates','Two-Way Star','Your star is a Lockdown or Rim Protector',15,ids=>ids.length>0&&trOf(P[ids[0]]).some(k=>k==='lock'||k==='prot')],
  ['broke','Moneyball','3+ players for $1 or less',15,(ids,st,t)=>t.r.filter(r=>r[1]<=1).length>=3],
  ['boards','Board Man','A Glass Cleaner in your starting five',15,(ids,st)=>cnt(st,['board'])>=1],
  ['ironmen','Iron Men','2+ Iron Men on your roster',20,ids=>cnt(ids,['iron'])>=2],
  ['decades','Time Machine','Players from 5+ different eras',20,ids=>new Set(ids.map(id=>P[id].era)).size>=5],
  ['duo','Reunion Tour','Two real teammates from the same season, or any famous duo',50,ids=>{const nm=new Set(ids.map(id=>P[id].name));return ids.some((x,i)=>ids.some((y,j)=>j>i&&P[x].tm&&P[x].tm===P[y].tm&&P[x].yr===P[y].yr))||DUOS.some(([ns,n,v,need])=>v>0&&ns.filter(x=>nm.has(x)).length>=(need||ns.length))}],
  ['stuffer','Stat Sheet','A Triple-Double Threat on your roster',40,ids=>cnt(ids,['tdub'])>=1]];
const CARD={};CARDS.forEach(c=>CARD[c[0]]=c);
const CLASH=[['broke','splash'],['bad','tank'],['franchise','pg'],['franchise','bigstar'],['mates','pg'],['mates','legend'],['old','now'],['towers','small'],['cheap','splash'],['pg','bigstar'],['pg','legend'],['bigstar','legend']];
function dealCards(teams,eras){const deck=shuffle(CARDS.map(c=>c[0]).filter(k=>!(k==='now'&&!tbOn(eras))&&!(k==='old'&&!(eraSet(eras).some(e=>['old','90s'].includes(e))&&eraSet(eras).some(e=>!['old','90s'].includes(e))))&&!(k==='legend'&&!legOn(eras))&&!(k==='decades'&&eraSet(eras).length<5)));teams.forEach(t=>{const a=deck.pop(),b=deck.find(k=>!CLASH.some(([x,y])=>(x===a&&y===k)||(y===a&&x===k)));deck.splice(deck.indexOf(b),1);t.cards=[a,b]})}
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
  return`<div class="hc">${(t.cards||[]).map(k=>{const c=CARD[k],ok=!fogOn()&&cardHit(t,k);return`<div class="hcc${ok?' ok':''}"><b>${ok?'✓ ':''}${c[1]}</b> <span class="note">${c[2]}</span> <span class="${ok?'cu':'note'}">+${c[3]}</span></div>`}).join('')}</div>`}


// Augments: [name, description, option it needs]
const hasA=(t,k)=>!!(t&&t.aug&&t.aug.some(a=>a.split(':')[0]===k));
const AUGS={max:['Max Contract','Your star counts ×1.8. Costs $3 now.'],sixth:['Sixth Man','Your first bench player counts almost fully (×0.95).'],
  dfi:['Defensive Identity','Steals and blocks count 1.5× for your team score.'],pace:['Pace and Space','+8 team score for each starting Sharpshooter.'],home:['Hometown Discount',''],
  tank:['Tank Job','Get $8 now, but your star only counts ×1.1.'],locker:['Locker Room Leader','Bad chemistry doesn\'t count against you (missing positions still do).'],big3:['Big Three','+20 if 3 of your starters are rated 50+.'],
  ftag:['Franchise Tag','+10 team score, and your franchise and famous-duo bonuses count double.'],cash:['Cash Injection','Get $5 right now.'],star:['Superstar','Your star counts ×1.55 instead of ×1.3.'],deep:['Deep Bench','Your bench counts ×0.8 instead of ½.'],
  nofee:['Tax Haven','You skip every other pass fee.'],chem:['Chemistry Lab','Your positive chemistry counts 1.25×.'],hoard:['Hoarder','+6 team score for every $ you finish with (up to +60).'],
  coupon:['Coupon Book','Your next 3 wins cost $2 less.'],pos:['Positionless','Your starting five has no position requirements: no center, no problem.'],vet:['Old Heads','+4 team score for each throwback on your roster.'],
  thrift:['Thrift Store','+9 team score for each player you got for $1 or less.'],emb:['Emblem',''],eye:['Scouting Department','See every hidden trait, and get $3.','scout'],
  free:['Free Rerolls','Your first 3 rerolls are free, and get $1.','reroll'],rich:['Compound Interest','Interest pays $1 per $5 you hold, not per $10 (max $8), and get $2.','int']};
const EMB=['shoot','lock','prot','rim','slash','pnr','glue','clutch'];
function embFor(t){const id=t.last;if(id==null)return null;const b=trBase(P[id]).concat(G.hid&&G.hid[id]?[G.hid[id]]:[],G.emb&&G.emb[id]||[]);
  const c=EMB.filter(k=>!b.includes(k)&&!(k==='shoot'&&b.includes('brick'))&&!(k==='lock'&&b.includes('cone')));return c.length?'emb:'+c[Math.floor(Math.random()*c.length)]+':'+id:null}
function augOffer(t){const own=new Set((t.aug||[]).concat((t.offers||[]).flat()).map(a=>a.split(':')[0]));
  return shuffle(Object.keys(AUGS).filter(k=>!own.has(k)&&(!AUGS[k][2]||opt(AUGS[k][2]))&&!(k==='vet'&&!tbOn(G.opt.eras)))).map(k=>k==='emb'?embFor(t):k==='home'?homeFor():k).filter(Boolean).slice(0,3)}
const homeFor=()=>{const fs=[...new Set(P.filter(p=>eraOn(p,G.opt.eras)&&FR[p.fr]).map(p=>p.fr))];return fs.length?'home:'+fs[Math.floor(Math.random()*fs.length)]:null};
const augInfo=a=>{const[k,x,id]=a.split(':');if(k==='home')return['Hometown Discount',`Get $2 now, and ${FR[x][0]} players cost you $3 less.`];return k==='emb'?[TRAIT[x][0]+' Emblem',`${P[+id].name} gains ${TRAIT[x][0]}.`]:AUGS[k]};
function pickAug(t,a){if(!t.offers||!t.offers.length||!t.offers[0].includes(a))return false;t.offers.shift();(t.aug=t.aug||[]).push(a);const[k,x,id]=a.split(':');
  if(k==='max')t.c=Math.max(0,t.c-3);else if(k==='tank')t.c+=8;else if(k==='eye'||k==='home')t.c+=k==='eye'?3:2;else if(k==='rich')t.c+=2;else if(k==='cash')t.c+=5;else if(k==='coupon')t.cp=3;else if(k==='free'){t.free=3;t.c+=1}else if(k==='emb'){G.emb=G.emb||{};G.emb[id]=(G.emb[id]||[]).concat(x)}return true}
function augBonus(t){if(!opt('aug')||!t.aug)return 0;const ids=t.r.map(r=>r[0]);let s=0;
  if(hasA(t,'hoard'))s+=Math.min(60,6*t.c);if(hasA(t,'vet'))s+=4*ids.filter(id=>P[id].yr!==CUR).length;if(hasA(t,'thrift'))s+=9*t.r.filter(r=>r[1]<=1).length;
  const w=wOf(t),st=ids.filter(id=>w[id]>=1);
  if(hasA(t,'dfi'))s+=.5*ids.reduce((a,id)=>a+w[id]*(TU.wstl*P[id].stl+TU.wblk*P[id].blk),0);
  if(hasA(t,'pace'))s+=8*st.filter(id=>trOf(P[id]).includes('shoot')).length;
  if(hasA(t,'big3')&&st.filter(id=>P[id].score>=50).length>=3)s+=20;
  if(hasA(t,'locker')||hasA(t,'ftag')){const l=chem(ids,w).list;if(hasA(t,'locker'))s-=l.filter(x=>x[1]<0&&x[2]!=='pos').reduce((a,x)=>a+x[1],0);if(hasA(t,'ftag'))s+=10+l.filter(x=>x[2]==='fr'||x[2]==='duo').reduce((a,x)=>a+x[1],0)}
  if(hasA(t,'chem')||hasA(t,'pos')){const l=chem(ids,wOf(t)).list;if(hasA(t,'chem'))s+=.25*l.filter(x=>x[1]>0).reduce((a,x)=>a+x[1],0);
    if(hasA(t,'pos'))s-=l.filter(x=>/^Starting five short/.test(x[0])).reduce((a,x)=>a+x[1],0)}
  return r1(s)}
// Rivalry bounties: a secret target (a rival team and a trait). Keep that rival from signing any player with the trait and collect.
const BTY_TR=['shoot','lock','prot','rim','pnr','slash','glue','iso'],BTY_PTS=25;
function dealBounties(teams){teams.forEach((t,i)=>{const o=teams.map((_,j)=>j).filter(j=>j!==i);t.bty={v:o[Math.floor(Math.random()*o.length)],k:BTY_TR[Math.floor(Math.random()*BTY_TR.length)]}})}
const btyCount=t=>{const r=G.teams[t.bty.v];return r?r.r.filter(([id])=>trOf(P[id]).includes(t.bty.k)).length:0};
const bountyBonus=t=>opt('bounty')&&t.bty&&btyCount(t)===0?BTY_PTS:0;
function bountyBox(i){if(!opt('bounty'))return'';const t=G.teams[i];if(!t.bty)return'';
  if(G.phase!=='done'&&!local().includes(i))return'<div class="bty"><span class="note">🎯 Bounty: hidden</span></div>';
  if(fogOn())return`<div class="bty">🎯 <b>Bounty:</b> keep <b>${tn(t.bty.v)}</b> from signing a ${TRAIT[t.bty.k][0]} <span class="note">(hidden in the fog)</span></div>`;
  const n=btyCount(t),ok=n===0;return`<div class="bty${ok?' ok':''}">🎯 <b>Bounty:</b> keep <b>${tn(t.bty.v)}</b> from signing a ${TRAIT[t.bty.k][0]} <span class="${ok?'cu':'cd'}">(${n} now${G.phase==='done'?(ok?' ✓ +'+BTY_PTS:' ✗'):''})</span></div>`}
const extra=t=>cardBonus(t)+augBonus(t)+bountyBonus(t);
// Fog of war: each player shows only a few stats (the same ones all game, picked per player); everything else waits for the results.
const fogOn=()=>!!(G&&G.opt&&G.opt.fog&&G.phase!=='done');
const FOGK=['pts','reb','ast','stl','blk'];
function fogKeys(p){const seed=(G&&G.fs)||1,h=k=>{let x=(p.id*2654435761^seed^(k*40503))>>>0;x^=x>>>15;x=Math.imul(x,2246822519)>>>0;x^=x>>>13;return x};
  return FOGK.map((k,j)=>[k,h(j+1)]).filter(([k])=>!(p.na&&(k==='stl'||k==='blk'))).sort((a,b)=>a[1]-b[1]).slice(0,Math.round(TU.fogN)).map(x=>x[0]).sort((a,b)=>FOGK.indexOf(a)-FOGK.indexOf(b))}
const fogLine=(p,one)=>{const k=fogKeys(p);return(one?k.slice(0,1):k).map(x=>p[x]+' '+x).join(' · ')};
// Rerolls: swap your last signing for a random undrafted player. Cost doubles each time.
const rrCost=t=>t.free>0?0:Math.pow(2,t.rr||0);
function reroll(t){if(!opt('reroll')||!t||!full(t)||t.rd||t.last==null||(G.phase!=='auction'&&G.phase!=='lineup'))return false;const c=rrCost(t);if(c>t.c)return false;
  const busy=new Set(G.teams.flatMap(x=>x.r.map(r=>P[r[0]].name)));if(G.lot){if(G.lot.id!=null)busy.add(P[G.lot.id].name);(G.lot.ch||[]).forEach(x=>busy.add(P[x].name))}
  const cand=P.filter(p=>eraOn(p,G.opt.eras)&&!busy.has(p.name)&&gate(p,G.opt.eras));if(!cand.length)return false;
  const np=cand[Math.floor(Math.random()*cand.length)],k=t.r.findIndex(r=>r[0]===t.last);if(k<0)return false;
  t.rrLog=[t.last,np.id];t.r[k]=[np.id,t.r[k][1]];if(t.free>0)t.free--;else t.rr=(t.rr||0)+1;t.c-=c;t.last=np.id;t.nrr=(t.nrr||0)+1;
  if(!t.cu)t.r.sort((x,y)=>P[y[0]].score-P[x[0]].score);return true}
// Interest
function payInterest(){const a=G.teams.map(t=>full(t)?0:hasA(t,'rich')?Math.min(8,Math.floor(t.c/Math.max(1,Math.round(TU.intPer/2)))):Math.floor(t.c/TU.intPer));G.teams.forEach((t,i)=>t.c+=a[i]);G.int={n:G.nom,a}}
// Trait tracker: every trait tier on your roster, with each breakpoint and what it's worth.
function tracker(t){const ids=t.r.map(r=>r[0]);if(!ids.length)return'';const w=wOf(t),st=ids.filter(id=>w[id]>=1),T=id=>trOf(P[id]),rows=[];
  for(const u of TIERS){const m=id=>u.k.some(k=>T(id).includes(k)),c=Math.min(5,st.filter(m).length),bn=ids.filter(m).length-c;if(!c&&!bn)continue;
    const tr=tierOf(u,c),hole=u.hole&&st.some(id=>T(id).includes(u.hole));
    const lad=u.t.map(x=>`<span class="tl${tr===x?(hole?' x':' on'):c>=x[0]?' past':''}" title="${esc(x[2])}">${x[0]} +${r1(x[1]*TU.tier)}</span>`).join('');
    rows.push([tr&&!hole?1:0,c,`<div class="tk${tr&&!hole?' act':''}"><span class="tn"><b>${u.l}</b> ${c}${bn?`<span class="note"> +${bn} bench</span>`:''}</span><span class="lad">${lad}</span>${hole&&tr?`<div class="cd" style="font-size:12px">Cancelled: a ${TRAIT[u.hole][0]} starts</div>`:''}</div>`])}
  const nx=[];for(const[a,b,n,v]of SYN){if(v<=0||a===b)continue;const A=ids.some(id=>T(id).includes(a)),B=ids.some(id=>T(id).includes(b));if(A!==B)nx.push(`${n}: add a ${TRAIT[A?b:a][0]} (+${v*TU.chem})`)}
  const nms=new Set(ids.map(id=>P[id].name));for(const[ns,n,v,need]of DUOS){if(v<=0)continue;const have=ns.filter(x=>nms.has(x)),miss=ns.filter(x=>!nms.has(x));if(have.length&&have.length===(need||ns.length)-1)nx.unshift(`⭐ ${n}: add ${miss.length===1?miss[0]:'one of '+miss.join(', ')} (+${Math.round(v*TU.chem/3)})`)}
  const wn=[];for(const[a,b,n,v]of SYN){if(v>=0)continue;const ca=ids.filter(id=>T(id).includes(a)).length,cb=ids.filter(id=>T(id).includes(b)).length;if(a===b?ca===1:(ca>0)!==(cb>0))wn.push(`${n} (${v*TU.chem}) if you add ${a===b?'another':'a'} ${TRAIT[ca?b:a][0]}`)}
  if(!rows.length&&!nx.length&&!wn.length)return'';
  return`<div class="trk"><div class="trh">Traits <span class="note">· starters count toward tiers</span></div>${rows.sort((x,y)=>y[0]-x[0]||y[1]-x[1]).map(r=>r[2]).join('')}${nx.length?`<div class="note" style="margin-top:4px">Pairs in reach: ${nx.slice(0,4).join(' · ')}</div>`:''}${wn.length?`<div class="note"><span class="cd">Watch out:</span> ${wn.slice(0,3).join(' · ')}</div>`:''}</div>`}
const augChips=t=>opt('aug')&&t.aug&&t.aug.length?`<div class="augs">${t.aug.map(a=>{const[n,d]=augInfo(a);return`<span class="aug" title="${esc(d)}">${esc(n)}</span>`}).join('')}</div>`:'';
function augPanel(i){const t=G.teams[i];if(!opt('aug')||!t.offers||!t.offers.length)return'';
  return`<div class="card augp"><h3 style="margin:0">${local().length>1?tn(i)+': choose':'Choose'} an augment</h3><span class="note">Pick 1 of 3. Everyone can see your augments.</span><div class="augo">${t.offers[0].map(a=>{const[n,d]=augInfo(a);return`<button data-aug="${i}|${esc(a)}"><b>${esc(n)}</b><span class="note">${esc(d)}</span></button>`}).join('')}</div></div>`}

