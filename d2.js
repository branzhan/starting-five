function results(){
  const T=G.teams,R=G.res,F=R.fin,tot=(t,k)=>t.r.reduce((s,r)=>s+P[r[0]][k],0).toFixed(1),canAgain=!online||isHost;
  const rows=[['Spent',t=>'$'+(CAP-t.c)],['Points',t=>tot(t,'pts')],['Rebounds',t=>tot(t,'reb')],['Assists',t=>tot(t,'ast')],['Steals',t=>tot(t,'stl')],['Blocks',t=>tot(t,'blk')],['Chemistry',t=>sgn(chem(t.r.map(r=>r[0]),wOf(t)).total)]].concat(opt('cards')?[['Hole cards',t=>'+'+cardBonus(t)]]:[],[['Team score',(t,i)=>R.pw[i]]]);
  const step=R.rr.length?.15:.5,chips=(x,d)=>x.g.map((s,k)=>`<span class="g" style="animation-delay:${(d+k)*step}s">G${k+1} ${s[0]}–${s[1]}</span>`).join('');
  const line=(x,d)=>`<div class="ser"><p style="margin:0 0 6px"><b>${tn(x.win)}</b> beat ${tn(x.win===x.a?x.b:x.a)} ${Math.max(...x.w)}–${Math.min(...x.w)} <span class="note">· scores ${tn(x.a)}–${tn(x.b)}${x.out&&x.out.length?' · missed games: '+x.out.map(([id,n])=>esc(P[id].name)+' ('+n+')').join(', '):''}</span></p><div class="games">${chips(x,d)}</div></div>`;
  let d=0;const rr=R.rr.map(x=>{const h=line(x,d);d+=x.g.length;return h}).join('');
  const order=T.map((t,i)=>i).sort((x,y)=>R.wins[y]-R.wins[x]||R.pw[y]-R.pw[x]);
  return`<div class="gridN">${T.map((t,i)=>teamCard(i)).join('')}</div>
   <div class="card" style="margin-top:4px"><h2>Tale of the tape</h2><div class="scroll"><table><thead><tr><th>Per game</th>${T.map((t,i)=>`<th class="n">${tn(i)}</th>`).join('')}</tr></thead><tbody>${rows.map(([l,f])=>`<tr><td>${l}</td>${T.map((t,i)=>`<td class="n">${f(t,i)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
   <p class="note">Team score: points + 2×rebounds + 2×assists + 4×steals + 4×blocks for each player, weighted by lineup role (star ×1.3, bench ×½), plus chemistry${opt('cards')?' and hole cards':''}. It decides who's favored.${opt('scout')?' Dashed traits were hidden.':''}</p></div>
   ${R.rr.length?`<div class="card" style="margin-top:16px"><h2>Round robin</h2>${rr}<p class="note" style="margin:0">Series won: ${order.map(i=>`${tn(i)} ${R.wins[i]}`).join(' · ')}</p></div>`:''}
   <div class="card" style="margin-top:16px"><h2>${R.rr.length?'The Finals':'The series'}</h2>${line(F,d)}
   <div class="champ" style="animation-delay:${(d+F.g.length)*step}s"><div style="opacity:.75">Champions, ${Math.max(...F.w)}–${Math.min(...F.w)}</div><div class="big">${tn(F.win)}</div><p style="margin:6px 0 0">Finals MVP: ${esc(P[F.mvp].name)}${P[F.mvp].yr===CUR?'':' ('+P[F.mvp].yr+')'}, ${F.mp} ppg</p></div>
   <div class="row" style="margin-top:14px">${canAgain?'<button class="go" data-act="again">Play again</button>':'<span class="note">The host can start another round.</span>'}<button data-act="leave">${online?'Leave game':'Change setup'}</button></div></div>`;
}
function timerUI(now){
  const b=$('#bar'),c=$('#cd');if(!b||!G||!G.lot)return;const L=G.lot;
  if(L.done){b.style.width='0';c.textContent='';return}
  const left=Math.max(0,deadline-now),span=L.pick?NOM_MS:L.forced?FORCED_MS:L.blind?BLIND_MS:L.by<0?OPEN_MS:BID_MS;
  b.style.width=Math.min(100,left/span*100)+'%';b.classList.toggle('low',left<3000);c.textContent=Math.ceil(left/1000)+'s';
}

