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
  const panel=i=>{const t=T[i],can=!L.done&&!L.forced&&L.by!==i&&!full(t);
    const st=full(t)?'Roster full.':L.done||L.forced?'':L.by===i?'You hold the high bid.':t.c<=L.hi?'Not enough money to outbid.':'';
    const btn=[1,2,5].map((d,k)=>{const a=L.hi+d;return`<button class="go" data-bid="${i}:${a}" ${can&&a<=t.c?'':'disabled'}>Bid $${a}${keys?`<kbd>${keys[i][k]}</kbd>`:''}</button>`}).join('');
    return`<div class="card bidp"><h3>${mine.length>1?tn(i)+' bids':'Your bid for '+tn(i)}</h3><span class="note">$${t.c} left · ${SPOTS-t.r.length} spot${SPOTS-t.r.length===1?'':'s'} open${st?' · '+st:''}</span>
     <div class="bids">${btn}${can&&t.c>L.hi&&![1,2,5].includes(t.c-L.hi)?`<button data-bid="${i}:${t.c}">All in $${t.c}</button>`:''}</div></div>`};
  const spect=online&&!mine.length?`<div class="card bidp"><p style="margin-top:0">You're watching. Join a side to bid:</p><div class="bids">${T.map((t,i)=>i).filter(i=>!T[i].cpu).map(i=>`<button data-team="${i}">Join ${tn(i)}</button>`).join('')}</div></div>`:'';
  return`<div class="stage"><div>
   <div class="block"><div class="lot">Player ${L.n} on the block · 2025-26 per game</div>
    <div class="who">${av(p,120)}<div><div class="pname">${esc(p.name)}</div><div style="opacity:.8">${p.pos} · ${p.g} games</div></div></div>
    <div class="stats">${[['PTS',p.pts],['REB',p.reb],['AST',p.ast],['STL',p.stl],['BLK',p.blk],['GP',p.g]].map(([k,v])=>`<div><b>${v}</b><small>${k}</small></div>`).join('')}</div>
    <div class="hb"><span class="big">$${L.by<0?0:L.hi}</span><span class="by">${L.by<0?'No bids':tn(L.by)}</span></div>
    <div class="clock"><div class="timer"><div id="bar"></div></div><span id="cd"></span></div>
    <div class="msg">${msg}</div></div>
   ${mine.map(panel).join('')}${spect}
   <div class="card log" style="margin-top:14px"><h2 style="font-size:20px">Auction log</h2><ol>${G.log.map(([id,t,pr])=>`<li><b>${esc(P[id].name)}</b> ${t<0?'<span class="note">passed</span>':`to ${tn(t)} for $${pr}`}</li>`).join('')||'<li class="note">Nothing yet.</li>'}</ol></div>
  </div><div>${T.map((t,i)=>teamCard(i)).join('')}</div></div>`;
}
function teamCard(i){
  const t=G.teams[i],L=G.lot,m=online?members(i):[];
  const tot=k=>t.r.reduce((s,r)=>s+P[r[0]][k],0).toFixed(1);
  return`<div class="card team${L&&!L.done&&L.by===i?' lead':''}"><h3><span>${tn(i)}</span><span class="cash">$${t.c}</span></h3>
   <div style="margin:4px 0 6px">${t.cpu?'<span class="chip">CPU</span>':m.map(chipFor).join('')}</div>
   ${G.teams.length>2&&G.phase!=='done'?t.r.map(r=>{const q=P[r[0]];return`<div class="mini"><span>${esc(q.name)} <span class="note">${q.pos} · ${q.pts} pts</span></span><b>$${r[1]}</b></div>`}).join('')+(SPOTS-t.r.length?`<div class="mini note"><i>${SPOTS-t.r.length} open spot${SPOTS-t.r.length===1?'':'s'}</i></div>`:''):Array.from({length:SPOTS},(_,k)=>{const r=t.r[k];if(!r)return'<div class="slot e">Open spot</div>';const q=P[r[0]];
     return`<div class="slot">${av(q,36)}<div><b>${esc(q.name)}</b><span class="note">${q.pos} · ${q.pts} pts · ${q.reb} reb · ${q.ast} ast</span></div><span class="paid">$${r[1]}</span></div>`}).join('')}
   <div class="tot">Team: ${tot('pts')} PTS · ${tot('reb')} REB · ${tot('ast')} AST</div></div>`;
}
function results(){
  const T=G.teams,R=G.res,F=R.fin,tot=(t,k)=>t.r.reduce((s,r)=>s+P[r[0]][k],0).toFixed(1),canAgain=!online||isHost;
  const rows=[['Spent',t=>'$'+(CAP-t.c)],['Points',t=>tot(t,'pts')],['Rebounds',t=>tot(t,'reb')],['Assists',t=>tot(t,'ast')],['Steals',t=>tot(t,'stl')],['Blocks',t=>tot(t,'blk')],['Team score',(t,i)=>R.pw[i]]];
  const step=R.rr.length?.15:.5,chips=(x,d)=>x.g.map((s,k)=>`<span class="g" style="animation-delay:${(d+k)*step}s">G${k+1} ${s[0]}–${s[1]}</span>`).join('');
  const line=(x,d)=>`<div class="ser"><p style="margin:0 0 6px"><b>${tn(x.win)}</b> beat ${tn(x.win===x.a?x.b:x.a)} ${Math.max(...x.w)}–${Math.min(...x.w)} <span class="note">· scores ${tn(x.a)}–${tn(x.b)}</span></p><div class="games">${chips(x,d)}</div></div>`;
  let d=0;const rr=R.rr.map(x=>{const h=line(x,d);d+=x.g.length;return h}).join('');
  const order=T.map((t,i)=>i).sort((x,y)=>R.wins[y]-R.wins[x]||R.pw[y]-R.pw[x]);
  return`<div class="gridN">${T.map((t,i)=>teamCard(i)).join('')}</div>
   <div class="card" style="margin-top:4px"><h2>Tale of the tape</h2><div class="scroll"><table><thead><tr><th>Per game</th>${T.map((t,i)=>`<th class="n">${tn(i)}</th>`).join('')}</tr></thead><tbody>${rows.map(([l,f])=>`<tr><td>${l}</td>${T.map((t,i)=>`<td class="n">${f(t,i)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
   <p class="note">Team score adds up each player's points, rebounds, assists, steals and blocks, weighted. It decides who's favored.</p></div>
   ${R.rr.length?`<div class="card" style="margin-top:16px"><h2>Round robin</h2>${rr}<p class="note" style="margin:0">Series won: ${order.map(i=>`${tn(i)} ${R.wins[i]}`).join(' · ')}</p></div>`:''}
   <div class="card" style="margin-top:16px"><h2>${R.rr.length?'The Finals':'The series'}</h2>${line(F,d)}
   <div class="champ" style="animation-delay:${(d+F.g.length)*step}s"><div style="opacity:.75">Champions, ${Math.max(...F.w)}–${Math.min(...F.w)}</div><div class="big">${tn(F.win)}</div><p style="margin:6px 0 0">Finals MVP: ${esc(P[F.mvp].name)}, ${F.mp} ppg</p></div>
   <div class="row" style="margin-top:14px">${canAgain?'<button class="go" data-act="again">Play again</button>':'<span class="note">The host can start another round.</span>'}<button data-act="leave">${online?'Leave game':'Change setup'}</button></div></div>`;
}
function timerUI(now){
  const b=$('#bar'),c=$('#cd');if(!b||!G||!G.lot)return;const L=G.lot;
  if(L.done){b.style.width='0';c.textContent='';return}
  const left=Math.max(0,deadline-now),span=L.forced?FORCED_MS:L.by<0?OPEN_MS:BID_MS;
  b.style.width=Math.min(100,left/span*100)+'%';b.classList.toggle('low',left<3000);c.textContent=Math.ceil(left/1000)+'s';
}

