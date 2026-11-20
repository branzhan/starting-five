function results(){
  const T=G.teams,R=G.res,F=R.fin,tot=(t,k)=>t.r.reduce((s,r)=>s+P[r[0]][k],0).toFixed(1),canAgain=!online||isHost;
  revSync();const n=Math.max(0,revShown),nRR=R.rr.length,steps=revSteps(R).length,done=n>=steps,fresh=k=>k===n-1?' fresh':'';
  const rows=[['Spent',t=>'$'+(TU.cap-t.c)],['Points',t=>tot(t,'pts')],['Rebounds',t=>tot(t,'reb')],['Assists',t=>tot(t,'ast')],['Steals',t=>tot(t,'stl')],['Blocks',t=>tot(t,'blk')],['Chemistry',t=>sgn(chem(t.r.map(r=>r[0]),wOf(t)).total)]].concat(opt('cards')?[['Hole cards',t=>'+'+cardBonus(t)]]:[],opt('bounty')?[['Bounty',t=>'+'+bountyBonus(t)]]:[],opt('aug')?[['Augments',t=>sgn(augBonus(t))]]:[],[['Team score',(t,i)=>R.pw[i]]]);
  const chips=x=>x.g.map((s,k)=>`<span class="g">G${k+1} ${s[0]}–${s[1]}</span>`).join('');
  const line=(x,k)=>`<div class="ser${fresh(k)}"><p style="margin:0 0 6px"><b>${tn(x.win)}</b> beat ${tn(x.win===x.a?x.b:x.a)} ${Math.max(...x.w)}–${Math.min(...x.w)} <span class="note">· scores ${tn(x.a)}–${tn(x.b)}${x.out&&x.out.length?' · missed games: '+x.out.map(([id,n])=>esc(P[id].name)+' ('+n+')').join(', '):''}</span></p><div class="games">${chips(x)}</div></div>`;
  const rr=R.rr.slice(0,n).map(line).join('');
  const shownF=Math.max(0,Math.min(F.g.length,n-nRR)),fw=[0,0];F.g.slice(0,shownF).forEach(sc=>fw[sc[0]>sc[1]?0:1]++);
  const fgames=F.g.slice(0,shownF).map((sc,k)=>`<div class="fg${fresh(nRR+k)}"><span class="g">G${k+1} ${tn(F.a)} ${sc[0]}–${sc[1]} ${tn(F.b)}</span><div class="hlt">${hlText(F,k)}</div></div>`).join('');
  const fstat=shownF?`<p class="fsc">${tn(F.a)} <b>${fw[0]}</b> – <b>${fw[1]}</b> ${tn(F.b)}${!done?` <span class="note">· ${fw[0]===3||fw[1]===3?(fw[0]===3&&fw[1]===3?'Game 7 next':'one win from the title'):'series continues'}</span>`:''}</p>`:'';
  const order=T.map((t,i)=>i).sort((x,y)=>R.wins[y]-R.wins[x]||R.pw[y]-R.pw[x]);
  const aw=done?awards():[];
  return`   <div class="row" style="margin:0 0 4px;justify-content:space-between">${!done?'<button data-act="skiprev">Skip to the result</button>':'<span></span>'}${emoBar()}</div>
   ${nRR?`<div class="card" style="margin-top:16px"><h2>Round robin</h2>${rr||'<p class="note">Tipping off…</p>'}${n>=nRR?`<p class="note" style="margin:0">Series won: ${order.map(i=>`${tn(i)} ${R.wins[i]}`).join(' · ')}</p>`:''}</div>`:''}
   ${n>=nRR?`<div class="card" style="margin-top:16px"><h2>${nRR?'The Finals':'The series'}: ${tn(F.a)} vs ${tn(F.b)}</h2>${fstat}${fgames||'<p class="note">Game 1 tips off…</p>'}
   ${done?`<div class="champ fresh"><div style="opacity:.75">Champions, ${Math.max(...F.w)}–${Math.min(...F.w)}</div><div class="big">${tn(F.win)}</div><p style="margin:6px 0 0">Finals MVP: ${esc(P[F.mvp].name)}${P[F.mvp].yr===CUR?'':' ('+P[F.mvp].yr+')'}, ${F.mp} ppg</p></div>`:''}</div>`:''}
   ${done?`<div class="card" style="margin-top:16px"><h2>Draft awards</h2><div class="awds">${aw.map(([ic,t,who,why])=>`<div class="awd"><div class="awi">${ic}</div><div><div class="awt">${t}</div><div>${who}</div><div class="note">${why}</div></div></div>`).join('')}</div></div>
   ${R.lg?leagueCard(R.lg,canAgain):''}
   <div class="card" style="margin-top:16px"><h2>Share</h2><p class="note" style="margin-top:0">Make an image of a team's result for the group chat.</p><div class="row">${T.map((t,i)=>`<button data-share="${i}">${local().includes(i)?'📸 ':''}${tn(i)}</button>`).join('')}</div><div id="sharebox"></div></div>
   <div class="row" style="margin-top:14px">${canAgain?'<button class="go" data-act="again">Play again</button>':'<span class="note">The host can start another round.</span>'}<button data-act="leave">${online?'Leave game':'Change setup'}</button></div>`:''}
   <h2 style="margin:28px 0 10px">Rosters</h2><div class="gridN">${T.map((t,i)=>teamCard(i)).join('')}</div>
   <div class="card" style="margin-top:4px"><h2>Tale of the tape</h2><div class="scroll"><table><thead><tr><th>Per game</th>${T.map((t,i)=>`<th class="n">${tn(i)}</th>`).join('')}</tr></thead><tbody>${rows.map(([l,f])=>`<tr><td>${l}</td>${T.map((t,i)=>`<td class="n">${f(t,i)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
   <p class="note">Team score: points + 2×rebounds + 2×assists + 4×steals + 4×blocks for each player, weighted by lineup role (star ×1.3, bench ×½), plus chemistry${opt('cards')?', hole cards':''}${opt('bounty')?', bounties':''}${opt('aug')?', augments':''}. It decides who's favored.${opt('scout')?' Dashed traits were hidden.':''}</p></div>
`;
}
function timerUI(now){
  const b=$('#bar'),c=$('#cd');if(!b||!G||!G.lot)return;const L=G.lot;
  if(L.done&&!L.aug){b.style.width='0';c.textContent='';return}
  const left=Math.max(0,deadline-now),mc=$('#mcd');if(mc)mc.textContent=Math.ceil(left/1000)+'s';const span=L.aug?AUG_MS_():L.pick?NOM_MS_():L.forced?FORCED_MS:L.blind?BLIND_MS:L.by<0?openMs():bidMs();
  b.style.width=Math.min(100,left/span*100)+'%';b.classList.toggle('low',left<3000);const sec=Math.ceil(left/1000);c.textContent=sec+'s';
  if(sec!==lastSec){lastSec=sec;if(sec>0&&sec<=3&&!L.done)play('tick')
    const go=$('#going');if(go){const live=!L.done&&!L.pick&&!L.aug&&!L.forced&&!L.blind,txt=live&&sec<=3&&sec>0?(L.by<0?['Last call…','Anyone?','Last chance…'][3-sec]:['Going once…','Going twice…','Last call…'][3-sec]):'';
      if(go.textContent!==txt){go.textContent=txt;go.classList.remove('pulse');void go.offsetWidth;if(txt)go.classList.add('pulse')}}}
}

// ---------- league nights ----------
// Standings across drafts, kept on the host's device (one league per device) and sent to everyone with the results.
const LGK='d30league',lgLoad=()=>{try{return JSON.parse(localStorage.getItem(LGK)||'')||{n:0,t:{}}}catch(e){return{n:0,t:{}}}};
function lgRows(L){return Object.entries(L.t).map(([k,v])=>Object.assign({k},v)).sort((x,y)=>y.ti-x.ti||y.fi-x.fi||(y.sw-y.sl)-(x.sw-x.sl)||y.gp-x.gp)}
function leagueRecord(T,rr,fin){const L=lgLoad();L.n=(L.n||0)+1;const row=t=>{const k=t.n.trim()||'Team';return L.t[k]=L.t[k]||{n:k,ti:0,fi:0,sw:0,sl:0,gp:0}};
  T.forEach(t=>row(t).gp++);rr.concat([fin]).forEach(x=>{row(T[x.win]).sw++;row(T[x.win===x.a?x.b:x.a]).sl++});row(T[fin.a]).fi++;row(T[fin.b]).fi++;row(T[fin.win]).ti++;
  try{localStorage.setItem(LGK,JSON.stringify(L))}catch(e){}return{n:L.n,rows:lgRows(L).slice(0,12)}}
let lgArm=false;
const lgTable=rows=>`<div class="scroll"><table><thead><tr><th>Team</th><th class="n">Titles</th><th class="n">Finals</th><th class="n">Series W–L</th><th class="n">Nights</th></tr></thead><tbody>${rows.map((r,k)=>`<tr><td>${k===0&&r.ti?'👑 ':''}${esc(r.n)}</td><td class="n">${r.ti}</td><td class="n">${r.fi}</td><td class="n">${r.sw}–${r.sl}</td><td class="n">${r.gp}</td></tr>`).join('')}</tbody></table></div>`;
const leagueCard=(lg,canReset)=>`<div class="card" style="margin-top:16px"><h2>League standings</h2><p class="note" style="margin-top:0">${lg.n} night${lg.n===1?'':'s'} recorded${online?' on the host\'s device':''}. Teams are matched by name, so keep the same team names each night.</p>${lgTable(lg.rows)}${canReset?`<button data-act="lgreset" style="margin-top:8px">${lgArm?'Click again to wipe the league':'Reset league'}</button>`:''}</div>`;
const leagueRow=(sel,edit)=>{const L=lgLoad(),rows=lgRows(L);return`<label class="opt"><input type="checkbox" ${edit?'data-opt="league"':'disabled'} ${sel&&sel.league?'checked':''}><span><b>League night</b><br><span class="note">Count this game toward league standings (titles, Finals trips, series record), kept on ${edit?'this':'the host\'s'} device.${edit&&L.n?` ${L.n} night${L.n===1?'':'s'} so far${rows[0]?', led by '+esc(rows[0].n):''}.`:''}</span></span></label>`};

// ---------- share card ----------
function shareCard(i){const T=G.teams,t=T[i],R=G.res,F=R.fin,W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
  const AN='Anton, Impact, sans-serif',BA='Barlow, system-ui, sans-serif';
  x.fillStyle='#1d140c';x.fillRect(0,0,W,H);x.fillStyle='#d23a26';x.fillRect(0,0,W,14);x.fillRect(0,H-14,W,14);
  x.fillStyle='#f0b53c';x.font=`44px ${AN}`;x.fillText('$30 STARTING FIVE',64,96);
  x.fillStyle='#f6ead7';x.font=`600 30px ${BA}`;const eras=G.opt.eras&&G.opt.eras.length&&G.opt.eras.length<ERAS.length?ERAS.filter(e=>G.opt.eras.includes(e[0])).map(e=>e[1]).join(' · '):'All eras';x.fillText(eras+' · '+new Date().toLocaleDateString(),64,142);
  let fit=(txt,max,size,font)=>{let s=size;x.font=`${s}px ${font}`;while(x.measureText(txt).width>max&&s>24){s-=2;x.font=`${s}px ${font}`}};
  fit(t.n.toUpperCase(),W-128,104,AN);x.fillStyle='#fff';x.fillText(t.n.toUpperCase(),64,262);
  const champ=F.win===i,inF=F.a===i||F.b===i,fw=F.win===i?Math.max(...F.w):Math.min(...F.w),fl=F.win===i?Math.min(...F.w):Math.max(...F.w);
  const res=champ?`🏆 CHAMPIONS ${fw}–${fl}`:inF?`Lost the Finals ${fw}–${fl}`:`Missed the Finals (${R.wins[i]}–${R.rr.filter(s=>s.a===i||s.b===i).length-R.wins[i]})`;
  x.fillStyle=champ?'#f0b53c':'#ff5b3d';x.font=`52px ${AN}`;x.fillText(res,64,340);
  x.fillStyle='#b9a184';x.font=`600 30px ${BA}`;x.fillText(`Team score ${R.pw[i]} · spent $${TU.cap-t.c} of $${TU.cap}${F.mvp!=null&&t.r.some(r=>r[0]===F.mvp)?' · Finals MVP: '+P[F.mvp].name:''}`,64,392);
  let y=470;t.r.forEach(([id,pr],k)=>{const q=P[id],bench=k>=5;if(k===5){x.fillStyle='#4a3420';x.fillRect(64,y-38,W-128,3);y+=14}
    x.fillStyle=k===0?'#f0b53c':bench?'#b9a184':'#f6ead7';x.font=`${bench?40:50}px ${AN}`;const nm=(k===0?'★ ':'')+q.name;x.fillText(nm,64,y);
    x.font=`600 ${bench?24:28}px ${BA}`;x.fillStyle='#b9a184';const w=x.measureText;x.fillText(`${q.pos} · ${q.yr} · ${q.pts} pts, ${q.reb} reb, ${q.ast} ast`,64,y+(bench?32:38));
    x.textAlign='right';x.fillStyle='#ff5b3d';x.font=`${bench?40:48}px ${AN}`;x.fillText('$'+pr,W-64,y);x.textAlign='left';y+=bench?86:104});
  const aw=awards().filter(a=>a[4]===i);if(aw.length){x.fillStyle='#f6ead7';x.font=`600 30px ${BA}`;x.fillText(aw.map(a=>a[0]+' '+a[1]).join('   '),64,Math.min(y+10,H-70))}
  x.fillStyle='#6e5a45';x.font=`600 24px ${BA}`;x.textAlign='right';x.fillText('branzhan.github.io/starting-five',W-64,H-40);x.textAlign='left';
  return c}
let lastShare=null;
async function doShare(i){const c=shareCard(i),box=$('#sharebox');const url=c.toDataURL('image/png'),name=`starting-five-${(G.teams[i].n||'team').replace(/\W+/g,'-').toLowerCase()}.png`;
  let blob=null;try{blob=await new Promise(r=>c.toBlob(r,'image/png'));const f=new File([blob],name,{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:'$30 Starting Five'});return}}catch(e){}
  lastShare={blob,name,url};
  if(box)box.innerHTML=`<img src="${url}" alt="Result card for ${esc(G.teams[i].n)}" class="shimg"><div class="row" style="margin-top:8px"><button data-act="dlshare">Download image</button><span class="note" id="dlnote">Or press and hold (right-click) the image to copy or save it.</span></div>`}
// Inside claude.ai the page saves through the downloads capability; on the hosted site a normal download link does it.
async function dlShare(){const s=lastShare;if(!s)return;const note=$('#dlnote');
  if(window.claude&&window.claude.use){try{const d=await window.claude.use('downloads');if(d){await d.save({filename:s.name,data:s.blob||s.url});return}}catch(e){if(note&&e&&e.code&&e.code!=='declined')note.textContent='Download isn\'t available here. Press and hold (right-click) the image to save it.';return}}
  const a=document.createElement('a');a.href=s.url;a.download=s.name;document.body.appendChild(a);a.click();a.remove()}

// ---------- auctioneer effects ----------
// Set by sfxCheck when something happens; applied once to the freshly drawn screen so re-draws don't replay them.
const FX={};
function fxApply(){if(!G||G.phase!=='auction')return;const blk=$('.block'),big=$('.hb .big');
  if(FX.legend&&blk){blk.classList.add('legend-in');FX.legend=0}
  if(FX.flash&&big){big.classList.remove('flash');void big.offsetWidth;big.classList.add('flash');FX.flash=0}
  if(FX.outbid&&blk){const o=document.createElement('div');o.className='outbid';o.textContent='Outbid!';blk.appendChild(o);setTimeout(()=>o.remove(),1400);FX.outbid=0}
  if(FX.stamp){const st=$('.stamp');if(st)st.classList.add('stamped');FX.stamp=0}}

function mbarSync(){const bp=$('.bidp'),on=!!$('.mbar')&&innerWidth<=900&&!!bp&&(()=>{const r=bp.getBoundingClientRect();return r.bottom<0||r.top>innerHeight})();document.body.classList.toggle('mbar-on',on)}
addEventListener('scroll',mbarSync,{passive:true});addEventListener('resize',mbarSync);
// ---------- quick reactions ----------
const EMOS=['😂','🔥','🧢','💀','😤','🫡','👀','🤡'],emoRL={};let emoSeen=0,emoKey='',emoSnd=0;
function addEmo(who,e,force){if(!(e>=0&&e<EMOS.length))return;who=String(who||'Someone').slice(0,18);const now=Date.now();if(!force&&now-(emoRL[who]||0)<250)return;emoRL[who]=now;
  G.emoN=(G.emoN||0)+1;G.emos=(G.emos||[]).concat([{id:G.emoN,w:who,e}]).slice(-24);changed()}
const emoWho=()=>{const m=local();return online?(me.nick||(m.length?tn(m[0]):'Fan')):(m.length===1?tn(m[0]):'Someone')};
const emoBar=()=>`<div class="emob" role="group" aria-label="Quick reactions">${EMOS.map((e,k)=>`<button data-emo="${k}" aria-label="React ${e}">${e}</button>`).join('')}</div>`;
function emoApply(){if(!G||!G.teams)return;const list=G.emos||[],max=list.reduce((a,x)=>Math.max(a,x.id),0);
  if(emoKey!==String(G.e)){emoKey=String(G.e);emoSeen=max;return}
  let box=document.getElementById('emofx');if(!box){box=document.createElement('div');box.id='emofx';box.setAttribute('aria-live','polite');document.body.appendChild(box)}
  list.filter(x=>x.id>emoSeen).forEach(x=>{const d=document.createElement('div');d.className='emo';d.innerHTML=`<span class="emi">${EMOS[x.e]}</span><span class="emw">${esc(x.w)}</span>`;box.appendChild(d);while(box.children.length>12)box.firstChild.remove();setTimeout(()=>d.remove(),2800);const t=Date.now();if(t-emoSnd>120){emoSnd=t;play('pop')}});
  emoSeen=Math.max(emoSeen,max)}
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
  champ:()=>[523,659,784,1047].forEach((f,k)=>tone(f,k===3?.6:.16,'triangle',.14,k*.14)),
  legend:()=>{[392,523,659,784].forEach((f,k)=>tone(f,.22,'triangle',.12,k*.09));tone(1047,.5,'sine',.1,.38)},
  outbid:()=>{tone(520,.1,'square',.07);tone(390,.18,'square',.07,.1)},pop:()=>tone(700,.09,'sine',.08,0,1100)};
const play=k=>{if(!SND||!AC||AC.state!=='running')return;try{SFX[k]()}catch(e){}};
function sfxCheck(){if(!G||!G.teams){sp=null;return}const L=G.lot,mine=local();
  const s={e:G.e,ph:G.phase,n:L&&L.n,hi:L&&L.hi,by:L&&L.by,done:L&&L.done,passed:L&&L.passed,aug:mine.some(i=>G.teams[i].offers&&G.teams[i].offers.length),it:G.int&&G.int.n,ag:G.teams.reduce((a,t)=>a+(t.aug?t.aug.length:0),0),rr:G.teams.reduce((a,t)=>a+(t.nrr||0),0)};
  const p=sp;sp=s;if(!p||p.e!==s.e)return;
  if(s.ph==='done'&&p.ph!=='done')return;
  if(s.n!=null&&s.n!==p.n){const L=G.lot;if(L&&L.id!=null&&!L.pick&&isStar(P[L.id])){FX.legend=1;play('legend')}else play('block')}
  else if(s.n!=null){if(s.done&&!p.done){FX.stamp=1;play(s.passed?'pass':mine.includes(s.by)?'win':'sold')}
    else if(!s.done&&(s.hi!==p.hi||s.by!==p.by)){FX.flash=1;if(mine.includes(p.by)&&!mine.includes(s.by)){FX.outbid=1;play('outbid')}else play(mine.includes(s.by)?'mybid':'bid')}}
  if(s.aug&&!p.aug)setTimeout(()=>play('aug'),300);else if(s.ag>p.ag&&G.lot&&G.lot.aug)play('mybid');
  if(s.it&&s.it!==p.it)setTimeout(()=>play('money'),150);
  if(s.rr!==p.rr)play('block')}
{const sb=document.getElementById('snd'),lab=()=>{sb.textContent=SND?'🔊':'🔇';sb.setAttribute('aria-label',SND?'Sound on (click to mute)':'Sound off (click to unmute)')};lab();
  sb.addEventListener('click',()=>{SND=!SND;try{localStorage.setItem('d30snd',SND?'1':'0')}catch(e){}ac();lab();play('bid')});
  ['pointerdown','keydown'].forEach(ev=>document.addEventListener(ev,ac,{passive:true}))}

// After the high bid changes, other teams' bid buttons pause briefly so a click meant for the old price can't land on the new one.
let bidLock=0,blKey='';
function bidLockCheck(){const L=G&&G.lot;if(!L||!G.teams){blKey='';return}const k=G.e+':'+L.n+':'+L.hi+':'+L.by;if(k===blKey)return;
  const same=blKey.split(':').slice(0,2).join(':')===G.e+':'+L.n;blKey=k;
  if(same&&L.by>=0&&!L.done&&TU.lock>0){bidLock=Date.now()+TU.lock*1000;setTimeout(()=>{if(G&&G.lot&&mode!=='landing')render()},TU.lock*1000+30)}}
const locked=i=>!!(G&&G.lot)&&i!==G.lot.by&&Date.now()<bidLock;
