function auction(){
  const L=G.lot,T=G.teams;if(!L)return'<div class="card">Getting the first player…</div>';
  const p=P[L.id],mine=local(),keys=!online&&mine.length===2&&T.length===2?[['Q','W','E'],['I','O','P']]:null;
  let msg;
  const tg=noBid(L);
  if(L.done&&L.passed)msg=`<span class="sold">PASSED</span>Nobody bid, so he's off the board.`;
  else if(L.done)msg=`<span class="sold">SOLD</span>to <b>${tn(L.by)}</b> for $${L.hi}${L.bn?` (bid by ${esc(L.bn)})`:''}`;
  else if(L.forced)msg=`${T.length>2?'Every other team is full':tn(T.findIndex((t,i)=>i!==L.clock))+' is full'}, so <b>${tn(L.clock)}</b> must take him${T[L.clock].c?' for $1':' for free'}.`;
  else if(L.by<0)msg=tg<0?'No bids yet. If the clock runs out with no bids, he gets passed.':`No bids yet. <b>${tn(tg)}</b> is out of money, so if nobody bids they must take him for free.`;
  else msg=`High bid: <b>${tn(L.by)}</b>${L.bn?` (${esc(L.bn)})`:''}.`;
  const panel=i=>{const t=T[i],can=!L.done&&!L.forced&&L.by!==i&&!full(t),ids=t.r.map(r=>r[0]),dl=full(t)?0:chem(ids.concat(p.id)).total-chem(ids).total;
    const st=full(t)?'Roster full.':L.done||L.forced?'':L.by===i?'You hold the high bid.':t.c<=L.hi?'Not enough money to outbid.':'';
    const btn=[1,2,5].map((d,k)=>{const a=L.hi+d;return`<button class="go" data-bid="${i}:${a}" ${can&&a<=t.c?'':'disabled'}>Bid $${a}${keys?`<kbd>${keys[i][k]}</kbd>`:''}</button>`}).join('');
    return`<div class="card bidp"><h3>${mine.length>1?tn(i)+' bids':'Your bid for '+tn(i)}</h3><span class="note">$${t.c} left · ${SPOTS-t.r.length} spot${SPOTS-t.r.length===1?'':'s'} open${st?' · '+st:''}</span>${dl?`<div class="${dl>0?'cu':'cd'}" style="font-size:14px">Chemistry ${sgn(dl)} if you get him</div>`:''}
     <div class="bids">${btn}${can&&t.c>L.hi&&![1,2,5].includes(t.c-L.hi)?`<button data-bid="${i}:${t.c}">All in $${t.c}</button>`:''}</div></div>`};
  const spect=online&&!mine.length?`<div class="card bidp"><p style="margin-top:0">You're watching. Join a side to bid:</p><div class="bids">${T.map((t,i)=>i).filter(i=>!T[i].cpu).map(i=>`<button data-team="${i}">Join ${tn(i)}</button>`).join('')}</div></div>`:'';
  return`<div class="stage"><div>
   <div class="block"><div class="lot">Player ${L.n} on the block · 2025-26 per game</div>
    <div class="who">${av(p,120)}<div><div class="pname">${esc(p.name)}</div><div style="opacity:.8">${p.pos} · ${p.g} games</div><div>${chips(p)}</div>${combos(p).length?`<div class="combo">${combos(p).join(' · ')}</div>`:''}</div></div>
    <div class="stats">${[['PTS',p.pts],['REB',p.reb],['AST',p.ast],['STL',p.stl],['BLK',p.blk],['GP',p.g]].map(([k,v])=>`<div><b>${v}</b><small>${k}</small></div>`).join('')}</div>
    <div class="hb"><span class="big">$${L.by<0?0:L.hi}</span><span class="by">${L.by<0?'No bids':tn(L.by)}</span></div>
    <div class="clock"><div class="timer"><div id="bar"></div></div><span id="cd"></span></div>
    <div class="msg">${msg}</div></div>
   ${mine.map(panel).join('')}${spect}
   <div class="card log" style="margin-top:14px"><h2 style="font-size:20px">Auction log</h2><ol>${G.log.map(([id,t,pr])=>`<li><b>${esc(P[id].name)}</b> ${t<0?'<span class="note">passed</span>':`to ${tn(t)} for $${pr}`}</li>`).join('')||'<li class="note">Nothing yet.</li>'}</ol></div>
  </div><div>${T.map((t,i)=>teamCard(i)).join('')}</div></div>`;
}
function teamCard(i){
  const t=G.teams[i],L=G.lot,m=online?members(i):[],w=wOf(t),ids=t.r.map(r=>r[0]),mini=G.teams.length>2&&G.phase==='auction';let cl;
  const ed=local().includes(i)&&!t.rd&&(G.phase==='auction'||G.phase==='lineup');
  const tot=k=>t.r.reduce((s,r)=>s+P[r[0]][k],0).toFixed(1);
  const role=k=>k===0?'<span class="rl star">★ Star</span>':'';
  const arrows=k=>ed&&t.r.length>1?`<span class="mvs"><button class="mv" data-mv="${i}:${k}:-1" ${k?'':'disabled'} aria-label="Move ${esc(P[t.r[k][0]].name)} up">↑</button><button class="mv" data-mv="${i}:${k}:1" ${k<t.r.length-1?'':'disabled'} aria-label="Move ${esc(P[t.r[k][0]].name)} down">↓</button></span>`:'';
  const sep=k=>k===5&&t.r.length>5?'<div class="sep">Bench · counts half</div>':'';
  const rows=mini?t.r.map((r,k)=>{const q=P[r[0]];return`${sep(k)}<div class="mini${k>=5?' bn':''}"><span>${role(k)}${esc(q.name)} <span class="note">${q.pos} · ${q.pts} pts</span> ${chips(q,1)}</span><span class="pr"><b>$${r[1]}</b>${arrows(k)}</span></div>`}).join('')+(SPOTS-t.r.length?`<div class="mini note"><i>${SPOTS-t.r.length} open spot${SPOTS-t.r.length===1?'':'s'}</i></div>`:'')
   :Array.from({length:SPOTS},(_,k)=>{const r=t.r[k];if(!r)return sep(k)+'<div class="slot e">Open spot</div>';const q=P[r[0]];
     return`${sep(k)}<div class="slot${k>=5?' bn':''}">${av(q,36)}<div>${role(k)}<b>${esc(q.name)}</b><span class="note">${q.pos} · ${q.pts} pts · ${q.reb} reb · ${q.ast} ast</span>${trOf(q).length?`<div>${chips(q,1)}</div>`:''}</div><span class="pr"><span class="paid">$${r[1]}</span>${arrows(k)}</span></div>`}).join('');
  const foot=G.phase!=='lineup'||t.cpu?'':ed?`<button class="go" data-rdy="${i}" style="margin-top:10px;width:100%">Lock in lineup</button>`:t.rd?'<p class="cu" style="margin:10px 0 0">Locked in ✓</p>':'<p class="note" style="margin:10px 0 0">Setting their lineup…</p>';
  return`<div class="card team${L&&!L.done&&L.by===i?' lead':''}"><h3><span>${tn(i)}</span><span class="cash">$${t.c}</span></h3>
   <div style="margin:4px 0 6px">${t.cpu?'<span class="chip">CPU</span>':m.map(chipFor).join('')}</div>
   <div class="tb">${t.r.length?`<div class="hx">${hexSVG(t)}</div>`:''}<div class="ros">${rows}</div></div>
   <div class="tot">Team: ${tot('pts')} PTS · ${tot('reb')} REB · ${tot('ast')} AST${(cl=chemLine(ids,w))?`<br>Chemistry: ${cl}`:''}</div>${foot}</div>`;
}
function lineupView(){
  const T=G.teams,waiting=T.map((t,i)=>i).filter(i=>!T[i].cpu&&!T[i].rd);
  return`<div class="card" style="margin-bottom:16px"><h2>Set your lineup</h2><p style="margin:0">Every roster is full. Use the arrows to order your players. The top spot is your <b>star</b> and counts ×1.3. The next four start. The last two come off the <b>bench</b> and count half, along with their trait bonuses and penalties. A bench player steps in whenever a starter misses a game.</p>
   ${waiting.length?`<p class="note" style="margin-bottom:0">Waiting on: ${waiting.map(tn).join(', ')}</p>`:''}${online&&isHost&&waiting.length?'<button data-act="playnow" style="margin-top:10px">Play now without waiting</button>':''}</div>
   <div class="gridN">${T.map((t,i)=>teamCard(i)).join('')}</div>`;
}
