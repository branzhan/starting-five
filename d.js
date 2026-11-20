function auction(){
  const L=G.lot,T=G.teams;if(!L)return'<div class="card">Getting the first player…</div>';
  const mine=local(),side=`<div>${T.map((t,i)=>teamCard(i)).join('')}</div>`;
  const clock='<div class="clock"><div class="timer"><div id="bar"></div></div><span id="cd"></span></div>';
  const on=OPTS.filter(o=>opt(o[0])).map(o=>o[1]);if(G.opt.eras&&G.opt.eras.length&&G.opt.eras.length<ERAS.length)on.unshift('Eras: '+ERAS.filter(e=>G.opt.eras.includes(e[0])).map(e=>e[1]).join(', '));
  const nxt=Math.ceil(G.nom/TU.intEvery)*TU.intEvery||TU.intEvery,ip=G.int;
  const intL=opt('int')?`<p class="note" style="margin:14px 0 0">💰 Interest: $1 per $${TU.intPer} for teams still drafting, paid after player ${nxt}.${ip?` Last payout (after player ${ip.n}): ${ip.a.map((a,i)=>tn(i)+' +'+(seesCash(i)?'$'+a:'$?')).join(' · ')}.`:''}</p>`:'';
  const augs=mine.map(augPanel).join('');
  const log=`${intL}${on.length?`<p class="note" style="margin:14px 0 0">Optional rules on: ${on.join(' · ')}</p>`:''}<div class="card log" style="margin-top:14px"><h2 style="font-size:20px">Auction log</h2><ol>${G.log.map(([id,t,pr])=>`<li><b>${esc(P[id].name)}</b>${yrTag(P[id])} ${t<0?'<span class="note">passed</span>':`to ${tn(t)} for ${priceTxt(t,pr)}`}</li>`).join('')||'<li class="note">Nothing yet.</li>'}</ol></div>`;
  if(L.pick){const me=mine.includes(L.clock);
    const card=id=>{const q=P[id];return`<div class="nomc">${av(q,56)}<div>${yrBadge(q)}<div><b>${esc(q.name)}</b> <span style="opacity:.75">${q.pos}</span></div><div style="opacity:.8;font-size:14px">${q.pts} pts · ${q.reb} reb · ${q.ast} ast</div><div>${chips(q,1)}</div></div><button class="go" data-nom="${L.clock}:${id}">Put him on the block</button></div>`};
    return`<div class="stage"><div><div class="block"><div class="lot">Nomination ${L.n}</div>
     <div class="pname" style="font-size:clamp(24px,4vw,36px)">${me?'Your pick: who goes on the block?':tn(L.clock)+' is picking who goes on the block…'}</div>
     ${me?`<p style="opacity:.85;margin:8px 0 0">Nominate someone you want, or someone you'd like your rivals to overpay for. If nobody bids, every team pays the pass fee.</p><div class="noms">${L.ch.map(card).join('')}</div>`:''}${clock}</div>${augs}${log}</div>${side}</div>`}
  const p=P[L.id],keys=!online&&mine.length===2&&T.length===2?[['Q','W','E'],['I','O','P']]:null;
  const reveal=L.reveal?`Sealed bids: ${L.reveal.map((a,i)=>a==null?null:tn(i)+' $'+a).filter(Boolean).join(' · ')||'none'}. `:'';
  let msg;
  const tg=noBid(L),aw=L.aug?G.teams.map((t,i)=>i).filter(i=>G.teams[i].offers&&G.teams[i].offers.length):[];
  if(L.done&&L.passed)msg=`<span class="sold">PASSED</span>${reveal}Nobody bid, so he's off the board and every team pays $${L.fee||1}.`;
  else if(L.done)msg=`<span class="sold">SOLD</span>${reveal}to <b>${tn(L.by)}</b> for $${L.hi}${L.disc?` (coupon: pays $${L.hi-L.disc})`:''}${L.bn?` (bid by ${esc(L.bn)})`:''}`;
  else if(L.forced)msg=`${T.length>2?'Every other team is full':tn(T.findIndex((t,i)=>i!==L.clock))+' is full'}, so <b>${tn(L.clock)}</b> must take him${T[L.clock].c?' for $1':' for free'}.`;
  else if(L.blind)msg=`Blind round: each team gets one sealed bid, and the highest wins and pays it. Sealed so far: ${L.sealed.length?L.sealed.map(tn).join(', '):'nobody'}.`;
  else if(L.by<0)msg=tg<0?`No bids yet. If the clock runs out with no bids, he gets passed and every team loses $${passFee()}.`:`No bids yet. <b>${tn(tg)}</b> is out of money, so if nobody bids they must take him for free.`;
  else msg=`High bid: <b>${tn(L.by)}</b>${L.bn?` (${esc(L.bn)})`:''}.`;
  if(!L.done&&!L.forced&&!L.blind&&L.ps&&L.ps.length)msg+=`<div class="psd">Out on this player: ${L.ps.map(tn).join(', ')}. When everyone who can bid is out, the clock ends.</div>`;
  if(aw.length)msg+=`<div style="margin-top:8px">Waiting for augment picks: <b>${aw.map(tn).join(', ')}</b>. Anyone who doesn't pick in time gets a random one.</div>`;
  const chemDl=t=>{const ids=t.r.map(r=>r[0]),dl=full(t)?0:chem(ids.concat(p.id),null,1).total-chem(ids,null,1).total;return dl?`<div class="${dl>0?'cu':'cd'}" style="font-size:14px">Chemistry ${sgn(dl)} if you get him</div>`:''};
  const panel=i=>{const t=T[i],can=!L.done&&!L.forced&&L.by!==i&&!full(t),lk=can&&locked(i),cb=can&&!lk;
    const st=full(t)?'Roster full.':L.done||L.forced?'':L.by===i?'You hold the high bid.':t.c<=L.hi?'Not enough money to outbid.':'';
    const btn=[1,2,5].map((d,k)=>{const a=L.hi+d;return`<button class="go" data-bid="${i}:${a}" ${cb&&a<=t.c?'':'disabled'}>Bid $${a}${keys?`<kbd>${keys[i][k]}</kbd>`:''}</button>`}).join('');
    const ps=(L.ps||[]).includes(i);
    return`<div class="card bidp"><h3>${mine.length>1?tn(i)+' bids':'Your bid for '+tn(i)}</h3><span class="note">$${t.c} left · ${SPOTS-t.r.length} spot${SPOTS-t.r.length===1?'':'s'} open</span>${chemDl(t)}
     <div class="bids">${btn}<button class="allin" data-bid="${i}:${t.c}" ${cb&&t.c>L.hi?'':'disabled'}>All in $${t.c}</button><button data-pass="${i}" ${can&&t.c>L.hi&&!ps?'':'disabled'}>${ps?'Passed':'Pass'}</button></div>
     <div class="bst note">${lk?'<b>New bid! Buttons unlock in a moment.</b>':st||'&nbsp;'}</div></div>`};
  const sealPanel=i=>{const t=T[i],d=draftFor(i,t.c);
    const body=L.sealed.includes(i)?'<p class="cu" style="margin:8px 0 0">Bid sealed ✓ Waiting for the others.</p>':full(t)?'<p class="note">Roster full.</p>':t.c===0?'<p class="note">Out of money.</p>'
     :`<div class="stepper">${[-5,-1].map(x=>`<button data-sd="${i}:${x}">${x}</button>`).join('')}<span class="amt">$${d}</span>${[1,5].map(x=>`<button data-sd="${i}:${x}">+${x}</button>`).join('')}<button class="go" data-seal="${i}">Seal $${d}</button></div>`;
    return`<div class="card bidp"><h3>${mine.length>1?tn(i)+' sealed bid':'Your sealed bid for '+tn(i)}</h3><span class="note">$${t.c} left · nobody sees your bid until the round ends</span>${chemDl(t)}${body}</div>`};
  const scout=opt('scout')&&G.hid&&G.hid[p.id]?(mine.includes(G.scout[p.id])?`<div class="scout">🔍 Your scouts found a hidden trait: ${TRAIT[G.hid[p.id]][0]}. Only your team knows.</div>`:'<div class="scout">🔍 Another team has a scouting report on him.</div>'):'';
  const spect=online&&!mine.length?`<div class="card bidp"><p style="margin-top:0">You're watching. Join a side to bid:</p><div class="bids">${T.map((t,i)=>i).filter(i=>!T[i].cpu).map(i=>`<button data-team="${i}">Join ${tn(i)}</button>`).join('')}</div></div>`:'';
  const big=L.blind&&!L.done?'<span class="big">$?</span><span class="by">Sealed bids</span>':`<span class="big">$${L.by<0?0:L.hi}</span><span class="by">${L.by<0?'No bids':tn(L.by)}</span>`;
  return`<div class="stage"><div>
   <div class="block"><div class="lot">Player ${L.n} on the block · per game that season</div>
    <div class="who">${av(p,120)}<div>${yrBadge(p)}<div class="pname">${esc(p.name)}</div><div style="opacity:.8">${p.pos} · ${p.g} games</div><div>${chips(p)}</div>${combos(p).length?`<div class="combo">${combos(p).join(' · ')}</div>`:''}${scout}</div></div>
    <div class="stats">${[['PTS',p.pts],['REB',p.reb],['AST',p.ast],['STL',p.na?'—':p.stl],['BLK',p.na?'—':p.blk],['GP',p.g]].map(([k,v])=>`<div><b>${v}</b><small>${k}</small></div>`).join('')}</div>
    <div class="hb">${big}<span id="going" class="going"></span></div>${clock}${L.done&&!L.blind?`<div class="stamp${L.passed?' ps':''}">${L.passed?'Passed':'Sold!'}</div>`:L.done&&L.reveal?`<div class="stamp">Sold!</div>`:''}
    <div class="msg">${msg}</div></div>
   ${augs}${mine.map(L.blind&&!L.done?sealPanel:panel).join('')}${spect}${log}
  </div>${side}</div>`;
}
let sealDraft={n:-1,v:{}};
const draftFor=(i,max)=>{if(sealDraft.n!==G.lot.n)sealDraft={n:G.lot.n,v:{}};return Math.max(0,Math.min(max,sealDraft.v[i]||0))};
const yrBadge=p=>{const tb=tbOn(curEras()),lg=isLeg(p),ss=!lg&&opt('blind')&&isStar(p);return`<div class="yrb${lg||ss?' leg':tb&&p.yr!==CUR?' tb':''}">${lg?'Legend · ':ss?'Superstar · ':tb?(p.yr===CUR?'This season · ':'Throwback · '):''}${p.yr}</div>`};
function teamCard(i){
  const t=G.teams[i],L=G.lot,m=online?members(i):[],w=wOf(t),ids=t.r.map(r=>r[0]),mini=G.teams.length>2&&G.phase==='auction';let cl;
  const ed=local().includes(i)&&!t.rd&&(G.phase==='auction'||G.phase==='lineup');
  const tot=k=>t.r.reduce((s,r)=>s+P[r[0]][k],0).toFixed(1);
  const role=k=>(k===0?'<span class="rl star">★ Star</span>':'')+(opt('reroll')&&t.r[k]&&t.r[k][0]===t.last&&full(t)&&G.phase!=='done'?'<span class="rl lst">Last in</span>':'');
  const arrows=k=>ed&&t.r.length>1?`<span class="mvs"><button class="mv" data-mv="${i}:${k}:-1" ${k?'':'disabled'} aria-label="Move ${esc(P[t.r[k][0]].name)} up">↑</button><button class="mv" data-mv="${i}:${k}:1" ${k<t.r.length-1?'':'disabled'} aria-label="Move ${esc(P[t.r[k][0]].name)} down">↓</button></span>`:'';
  const sep=k=>k===5&&t.r.length>5?'<div class="sep">Bench · counts half</div>':'';
  const rows=mini?t.r.map((r,k)=>{const q=P[r[0]];return`${sep(k)}<div class="mini${k>=5?' bn':''}"><span>${role(k)}${esc(q.name)}${yrTag(q)} <span class="note">${q.pos} · ${q.pts} pts</span> ${chips(q,1)}</span><span class="pr"><b>${priceTxt(i,r[1])}</b>${arrows(k)}</span></div>`}).join('')+(SPOTS-t.r.length?`<div class="mini note"><i>${SPOTS-t.r.length} open spot${SPOTS-t.r.length===1?'':'s'}</i></div>`:'')
   :Array.from({length:SPOTS},(_,k)=>{const r=t.r[k];if(!r)return sep(k)+'<div class="slot e">Open spot</div>';const q=P[r[0]];
     return`${sep(k)}<div class="slot${k>=5?' bn':''}">${av(q,36)}<div>${role(k)}<b>${esc(q.name)}${yrTag(q)}</b><span class="note">${q.pos} · ${q.pts} pts · ${q.reb} reb · ${q.ast} ast</span>${trOf(q).length?`<div>${chips(q,1)}</div>`:''}</div><span class="pr"><span class="paid">${priceTxt(i,r[1])}</span>${arrows(k)}</span></div>`}).join('');
  const own=local().includes(i),act=G.phase==='auction'||G.phase==='lineup';
  const rrb=opt('reroll')&&own&&full(t)&&act&&!t.rd&&t.last!=null?(c=>`<div class="rrb"><button data-rr="${i}" ${c<=t.c?'':'disabled'}>↻ Reroll ${esc(P[t.last].name)} · ${c?'$'+c:'free'}</button><span class="note">Swaps your last signing for a random undrafted player.${t.rrLog?` Last reroll: ${esc(P[t.rrLog[0]].name)} → ${esc(P[t.rrLog[1]].name)}.`:''}</span></div>`)(rrCost(t)):'';
  const foot=G.phase!=='lineup'||t.cpu?'':ed?`<button class="go" data-rdy="${i}" style="margin-top:10px;width:100%">Lock in lineup</button>`:t.rd?'<p class="cu" style="margin:10px 0 0">Locked in ✓</p>':'<p class="note" style="margin:10px 0 0">Setting their lineup…</p>';
  return`<div class="card team${L&&!L.done&&L.by===i?' lead':''}"><h3><span>${tn(i)}</span><span class="cash">${cashTxt(i)}</span></h3>
   <div style="margin:4px 0 6px">${t.cpu?'<span class="chip">CPU</span>':m.map(chipFor).join('')}</div>${cardBox(i)}${augChips(t)}${G.phase==='lineup'&&own?augPanel(i):''}
   <div class="tb">${t.r.length?`<div class="hx">${hexSVG(t)}</div>`:''}<div class="ros">${rows}</div></div>
   <div class="tot">Team: ${tot('pts')} PTS · ${tot('reb')} REB · ${tot('ast')} AST${(cl=chemLine(ids,w))?`<br>Chemistry: ${cl}`:''}</div>${own&&act?tracker(t):''}${rrb}${foot}</div>`;
}
function lineupView(){
  const T=G.teams,waiting=T.map((t,i)=>i).filter(i=>!T[i].cpu&&!T[i].rd);
  return`<div class="card" style="margin-bottom:16px"><h2>Set your lineup</h2><p style="margin:0">Every roster is full. Use the arrows to order your players. The top spot is your <b>star</b> and counts ×1.3. The next four start. The last two come off the <b>bench</b> and count half, along with their trait bonuses and penalties. A bench player steps in whenever a starter misses a game.</p>
   ${waiting.length?`<p class="note" style="margin-bottom:0">Waiting on: ${waiting.map(tn).join(', ')}</p>`:''}${online&&isHost&&waiting.length?'<button data-act="playnow" style="margin-top:10px">Play now without waiting</button>':''}</div>
   <div class="gridN">${T.map((t,i)=>teamCard(i)).join('')}</div>`;
}
// ---------- results: the series plays out one game at a time ----------
const RR_GAP=900,FIN_GAP=2200;let revKey='',revStart=0;
const revSteps=R=>{const t=[];let x=600;R.rr.forEach(()=>{t.push(x);x+=RR_GAP});x+=400;R.fin.g.forEach(()=>{t.push(x);x+=FIN_GAP});t.push(x-FIN_GAP+1600);return t};
const revCount=R=>{const t=revSteps(R),el=Date.now()-revStart;return t.filter(v=>el>=v).length};
// revSync advances the reveal and plays its sounds; it reports whether the screen needs redrawing.
function revSync(){if(!G||G.phase!=='done'||!G.res)return false;const R=G.res,k=G.e+':'+R.fin.g.length+':'+R.pw.join(',');if(k!==revKey){revKey=k;revStart=Date.now();revShown=-1;setTimeout(()=>window.scrollTo({top:0}),0)}
  const n=revCount(R),tot=revSteps(R).length;if(n===revShown)return false;{const prev=revShown;revShown=n;if(prev>=0&&n>prev){const fin0=R.rr.length,mine=local();
      if(n===tot)play('champ');else if(n>fin0){const gi=n-fin0-1,sc=R.fin.g[gi],wt=sc[0]>sc[1]?R.fin.a:R.fin.b;play(mine.includes(wt)?'win':'sold')}else play('bid')}}
  return true}
function revTick(){if(revSync())render()}
let revShown=-1;
const XN={reb:'reb',ast:'ast',blk:'blk',stl:'stl'};
const hlText=(x,k)=>{const h=x.hl&&x.hl[k];if(!h)return'';const sc=x.g[k],wk=sc[0]>sc[1]?0:1,side=[x.a,x.b];
  const tp=h.top.map((t,j)=>t?`${esc(P[t[0]].name)} ${t[1]} pts${t[2]?', '+t[2][1]+' '+XN[t[2][0]]:''}`:'');
  const bits=[`<b>${tn(side[wk])}</b> win ${Math.max(...sc)}–${Math.min(...sc)}. ${tp[wk]} led the way; ${tp[1-wk]} for ${tn(side[1-wk])}.`];
  if(h.cl!=null)bits.push(`🧊 ${esc(P[h.cl].name)} hit the game-winner.`);else if(Math.abs(sc[0]-sc[1])<=3)bits.push('Down to the wire.');
  if(h.sat.length)bits.push(h.sat.map(([id,r])=>`${r==='inj'?'🩼':'🟥'} ${esc(P[id].name)} ${r==='inj'?'sat out hurt':'got ejected'}`).join(' · ')+'.');
  return bits.join(' ')};
// Draft awards, from the final rosters. Fair price: what his rating is worth on the default scale, scaled to this game's money.
function awards(){const T=G.teams,fair=id=>Math.max(1,Math.round(P[id].val*TU.cap/30)),all=T.flatMap((t,i)=>t.r.map(([id,pr])=>({id,pr,i})));if(!all.length)return[];
  const out=[],nm=x=>`${esc(P[x.id].name)}${yrTag(P[x.id])} <span class="note">(${tn(x.i)})</span>`;
  const st=all.slice().sort((x,y)=>(fair(y.id)-y.pr)-(fair(x.id)-x.pr)||x.pr-y.pr)[0];out.push(['💎','Steal of the Draft',nm(st),`$${st.pr} for a $${fair(st.id)} player`,st.i]);
  const ov=all.filter(x=>x!==st).sort((x,y)=>(y.pr-fair(y.id))-(x.pr-fair(x.id)))[0];if(ov&&ov.pr>fair(ov.id))out.push(['💸','Biggest Overpay',nm(ov),`$${ov.pr} for a $${fair(ov.id)} player`,ov.i]);
  const ch=T.map((t,i)=>[i,chem(t.r.map(r=>r[0]),wOf(t)).total]).sort((x,y)=>y[1]-x[1])[0];out.push(['🧪','Best Chemistry',`<b>${tn(ch[0])}</b>`,`${sgn(ch[1])} chemistry`,ch[0]]);
  const ws=all.filter(x=>x.pr>=2&&x!==ov).sort((x,y)=>P[x.id].score-P[y.id].score||y.pr-x.pr)[0];if(ws)out.push(['🪦','Worst Signing',nm(ws),`$${ws.pr} for ${P[ws.id].pts} pts, ${P[ws.id].reb} reb, ${P[ws.id].ast} ast`,ws.i]);
  return out}
