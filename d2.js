function results(){
  const T=G.teams,R=G.res,F=R.fin,tot=(t,k)=>t.r.reduce((s,r)=>s+P[r[0]][k],0).toFixed(1),canAgain=!online||isHost;
  const rows=[['Spent',t=>'$'+(CAP-t.c)],['Points',t=>tot(t,'pts')],['Rebounds',t=>tot(t,'reb')],['Assists',t=>tot(t,'ast')],['Steals',t=>tot(t,'stl')],['Blocks',t=>tot(t,'blk')],['Chemistry',t=>sgn(chem(t.r.map(r=>r[0]),wOf(t)).total)]].concat(opt('cards')?[['Hole cards',t=>'+'+cardBonus(t)]]:[],opt('aug')?[['Augments',t=>sgn(augBonus(t))]]:[],[['Team score',(t,i)=>R.pw[i]]]);
  const step=R.rr.length?.15:.5,chips=(x,d)=>x.g.map((s,k)=>`<span class="g" style="animation-delay:${(d+k)*step}s">G${k+1} ${s[0]}–${s[1]}</span>`).join('');
  const line=(x,d)=>`<div class="ser"><p style="margin:0 0 6px"><b>${tn(x.win)}</b> beat ${tn(x.win===x.a?x.b:x.a)} ${Math.max(...x.w)}–${Math.min(...x.w)} <span class="note">· scores ${tn(x.a)}–${tn(x.b)}${x.out&&x.out.length?' · missed games: '+x.out.map(([id,n])=>esc(P[id].name)+' ('+n+')').join(', '):''}</span></p><div class="games">${chips(x,d)}</div></div>`;
  let d=0;const rr=R.rr.map(x=>{const h=line(x,d);d+=x.g.length;return h}).join('');
  const order=T.map((t,i)=>i).sort((x,y)=>R.wins[y]-R.wins[x]||R.pw[y]-R.pw[x]);
  return`<div class="gridN">${T.map((t,i)=>teamCard(i)).join('')}</div>
   <div class="card" style="margin-top:4px"><h2>Tale of the tape</h2><div class="scroll"><table><thead><tr><th>Per game</th>${T.map((t,i)=>`<th class="n">${tn(i)}</th>`).join('')}</tr></thead><tbody>${rows.map(([l,f])=>`<tr><td>${l}</td>${T.map((t,i)=>`<td class="n">${f(t,i)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
   <p class="note">Team score: points + 2×rebounds + 2×assists + 4×steals + 4×blocks for each player, weighted by lineup role (star ×1.3, bench ×½), plus chemistry${opt('cards')?', hole cards':''}${opt('aug')?', augments':''}. It decides who's favored.${opt('scout')?' Dashed traits were hidden.':''}</p></div>
   ${R.rr.length?`<div class="card" style="margin-top:16px"><h2>Round robin</h2>${rr}<p class="note" style="margin:0">Series won: ${order.map(i=>`${tn(i)} ${R.wins[i]}`).join(' · ')}</p></div>`:''}
   <div class="card" style="margin-top:16px"><h2>${R.rr.length?'The Finals':'The series'}</h2>${line(F,d)}
   <div class="champ" style="animation-delay:${(d+F.g.length)*step}s"><div style="opacity:.75">Champions, ${Math.max(...F.w)}–${Math.min(...F.w)}</div><div class="big">${tn(F.win)}</div><p style="margin:6px 0 0">Finals MVP: ${esc(P[F.mvp].name)}${P[F.mvp].yr===CUR?'':' ('+P[F.mvp].yr+')'}, ${F.mp} ppg</p></div>
   <div class="row" style="margin-top:14px">${canAgain?'<button class="go" data-act="again">Play again</button>':'<span class="note">The host can start another round.</span>'}<button data-act="leave">${online?'Leave game':'Change setup'}</button></div></div>`;
}
function timerUI(now){
  const b=$('#bar'),c=$('#cd');if(!b||!G||!G.lot)return;const L=G.lot;
  if(L.done&&!L.aug){b.style.width='0';c.textContent='';return}
  const left=Math.max(0,deadline-now),span=L.aug?AUG_MS:L.pick?NOM_MS:L.forced?FORCED_MS:L.blind?BLIND_MS:L.by<0?openMs():bidMs();
  b.style.width=Math.min(100,left/span*100)+'%';b.classList.toggle('low',left<3000);const sec=Math.ceil(left/1000);c.textContent=sec+'s';
  if(sec!==lastSec){lastSec=sec;if(sec>0&&sec<=3&&!L.done)play('tick')}
}

// ---------- sound ----------
// Synthesized with Web Audio; starts after the first click or key press (browser rule). The 🔊 button mutes.
let SND=true,AC=null,sp=null,lastSec=0;try{SND=localStorage.getItem('d30snd')!=='0'}catch(e){}
const ac=()=>{if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){AC=null}}if(AC&&AC.state==='suspended')AC.resume().catch(()=>{})};
function tone(f,d,type,vol,when,slide){const a=AC,t=a.currentTime+(when||0),o=a.createOscillator(),g=a.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(slide)o.frequency.exponentialRampToValueAtTime(slide,t+d);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol||.12,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+d+.03)}
const SFX={bid:()=>tone(880,.08,'triangle',.1),mybid:()=>{tone(660,.07,'triangle',.13);tone(990,.09,'triangle',.13,.06)},
  sold:()=>{tone(170,.1,'square',.1);tone(130,.16,'square',.09,.11)},win:()=>[523,659,784].forEach((f,k)=>tone(f,.15,'triangle',.13,k*.08)),
  pass:()=>tone(320,.28,'sine',.12,0,150),tick:()=>tone(1250,.04,'square',.04),block:()=>tone(440,.14,'sine',.07,0,660),
  aug:()=>[784,988,1175].forEach((f,k)=>tone(f,.2,'sine',.09,k*.07)),money:()=>{tone(1319,.06,'square',.05);tone(1760,.14,'square',.05,.06)},
  champ:()=>[523,659,784,1047].forEach((f,k)=>tone(f,k===3?.6:.16,'triangle',.14,k*.14))};
const play=k=>{if(!SND||!AC||AC.state!=='running')return;try{SFX[k]()}catch(e){}};
function sfxCheck(){if(!G||!G.teams){sp=null;return}const L=G.lot,mine=local();
  const s={e:G.e,ph:G.phase,n:L&&L.n,hi:L&&L.hi,by:L&&L.by,done:L&&L.done,passed:L&&L.passed,aug:mine.some(i=>G.teams[i].offers&&G.teams[i].offers.length),it:G.int&&G.int.n,rr:G.teams.reduce((a,t)=>a+(t.nrr||0),0)};
  const p=sp;sp=s;if(!p||p.e!==s.e)return;
  if(s.ph==='done'&&p.ph!=='done')return play('champ');
  if(s.n!=null&&s.n!==p.n)play('block');
  else if(s.n!=null){if(s.done&&!p.done)play(s.passed?'pass':mine.includes(s.by)?'win':'sold');else if(!s.done&&(s.hi!==p.hi||s.by!==p.by))play(mine.includes(s.by)?'mybid':'bid')}
  if(s.aug&&!p.aug)setTimeout(()=>play('aug'),300);
  if(s.it&&s.it!==p.it)setTimeout(()=>play('money'),150);
  if(s.rr!==p.rr)play('block')}
{const sb=document.getElementById('snd'),lab=()=>{sb.textContent=SND?'🔊':'🔇';sb.setAttribute('aria-label',SND?'Sound on (click to mute)':'Sound off (click to unmute)')};lab();
  sb.addEventListener('click',()=>{SND=!SND;try{localStorage.setItem('d30snd',SND?'1':'0')}catch(e){}ac();lab();play('bid')});
  ['pointerdown','keydown'].forEach(ev=>document.addEventListener(ev,ac,{passive:true}))}

