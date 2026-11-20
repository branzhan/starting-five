// ---------- actions ----------
function doLineup(d){if(!G)return;if(isHost)lineupAct(d);else if(game)game.emit('bid',d).catch(()=>{})}
function doBid(i,amt){
  if(!G||!G.lot)return;
  if(isHost)bid(i,amt,online?me.nick:'');
  else if(game)game.emit('bid',{team:i,amt,nick:me.nick,n:G.lot.n}).catch(()=>{});
}
V.addEventListener('click',async e=>{
  const b=e.target.closest('button,input[type=checkbox]');if(!b)return;
  if(b.dataset.mv){const[i,k,dir]=b.dataset.mv.split(':').map(Number);doLineup({k:'mv',team:i,a:k,dir});return}
  if(b.dataset.rdy){doLineup({k:'rdy',team:+b.dataset.rdy});return}
  if(b.dataset.pass){if(G&&G.lot)doLineup({k:'pass',team:+b.dataset.pass,n:G.lot.n});return}
  if(b.dataset.rr){doLineup({k:'rr',team:+b.dataset.rr});return}
  if(b.dataset.aug){const x=b.dataset.aug,j=x.indexOf('|');doLineup({k:'aug',team:+x.slice(0,j),key:x.slice(j+1)});return}
  if(b.dataset.nom){const[i,id]=b.dataset.nom.split(':').map(Number);doLineup({k:'nom',team:i,id});return}
  if(b.dataset.sd){const[i,x]=b.dataset.sd.split(':').map(Number);if(G&&G.lot){draftFor(i,0);sealDraft.v[i]=Math.max(0,Math.min(G.teams[i].c,(sealDraft.v[i]||0)+x));render()}return}
  if(b.dataset.seal){const i=+b.dataset.seal;if(G&&G.lot)doLineup({k:'seal',team:i,amt:draftFor(i,G.teams[i].c),n:G.lot.n});return}
  if(b.dataset.bid){const[i,a]=b.dataset.bid.split(':').map(Number);doBid(i,a);return}
  if(b.dataset.team){me.team=+b.dataset.team;if(game)game.presence({team:me.team}).catch(()=>{});render();return}
  const act=b.dataset.act;
  if(act==='offline'){const n=+$('#tn').value,cpu=$('#tbc').value==='cpu';cfg={names:Array.from({length:n},(_,i)=>cpu&&i===0?(me.nick||'Your team'):'Team '+(i+1)),cpu:Array.from({length:n},(_,i)=>cpu&&i>0),opt:Object.assign({},offOpt)};startOffline()}
  else if(act==='create'||act==='join'){
    if(!me.nick){joinErr='Type your name first.';return render()}
    const c=act==='create'?Array.from({length:4},()=>'ABCDEFGHJKMNPQRSTUVWXYZ23456789'[Math.floor(Math.random()*31)]).join(''):($('#code').value||'').trim().toUpperCase();
    if(!/^[A-Z0-9]{4}$/.test(c)){joinErr='Game codes are 4 letters or numbers.';return render()}
    joinErr='';online=true;isHost=act==='create';me.team=isHost?0:-1;mode='game';
    try{await joinRoom(c,isHost)}catch(err){online=false;isHost=false;mode='landing';const ty=err&&err.type;
      joinErr=ty==='peer-unavailable'?'No game found with that code. Check it with the host.':ty==='unavailable-id'?'That code is taken. Click Create again for a new one.':ty==='timeout'||ty==='network'||ty==='server-error'||ty==='socket-error'?'Couldn\'t reach the connection server. Check your internet and try again.':ty==='browser-incompatible'?'This browser can\'t play online. Try Chrome, Safari or Firefox.':'Couldn\'t connect to that game. Try again in a moment.';return render()}
    if(isHost){G={e:rid(),v:0,phase:'lobby',names:['Team 1','Team 2'],cpuFill:true,opt:{}};changed()}else{lastState=Date.now();render()}
  }
  else if(act==='leave')leave();
  else if(act==='playnow'&&isHost&&G&&G.phase==='lineup')finish();
  else if(act==='copy'){const i=$('#inv');try{await navigator.clipboard.writeText(i.value);b.textContent='Copied'}catch(x){i.select()}}
  else if(act==='cpufill'){G.cpuFill=b.checked;changed()}
  else if(act==='start'){const cpu=G.names.map((n,i)=>!members(i).length);G=newG(G.names,cpu,undefined,G.opt);startLot()}
  else if(act==='again'){if(online){G={e:rid(),v:0,phase:'lobby',names:G.teams.map(t=>t.n),cpuFill:true,opt:G.opt||{}};changed()}else startOffline()}
  else if(act==='takeover'){isHost=true;hostGone=false;const now=Date.now();
    if(G.lot&&!G.lot.pick){cpuPlan={};G.teams.forEach((t,i)=>{if(t.cpu)cpuPlan[i]={val:cpuVal(t,P[G.lot.id]),at:now+2000}});if(G.lot.done)nextAt=now+1500;if(deadline<now+3000)deadline=now+3000}
    changed()}
});
V.addEventListener('change',e=>{
  const t=e.target;
  if(t.id==='nick'){me.nick=t.value.trim().slice(0,18);try{localStorage.setItem('d30nick',me.nick)}catch(x){}if(game)game.presence({nick:me.nick}).catch(()=>{})}
  if(t.dataset.optv){const k=t.dataset.optv,v=+t.value;if(mode==='landing'){offOpt[k]=v;try{localStorage.setItem('d30opt',JSON.stringify(offOpt))}catch(x){}}else if(isHost&&G&&G.phase==='lobby'){G.opt=Object.assign({},G.opt,{[k]:v});t.blur();changed()}}
  if(t.dataset.opt){const k=t.dataset.opt;if(mode==='landing'){offOpt[k]=t.checked;try{localStorage.setItem('d30opt',JSON.stringify(offOpt))}catch(x){}}else if(isHost&&G&&G.phase==='lobby'){G.opt=Object.assign({},G.opt,{[k]:t.checked});changed()}}
  if(t.dataset.act==='nteams'&&isHost&&G&&G.phase==='lobby'){const n=+t.value;G.names=Array.from({length:n},(_,i)=>G.names[i]||'Team '+(i+1));changed()}
  if(t.dataset.name!=null&&isHost&&G&&G.phase==='lobby'){G.names[+t.dataset.name]=t.value.trim().slice(0,18)||('Team '+(+t.dataset.name+1));changed()}
});
V.addEventListener('input',e=>{const t=e.target;if(t.dataset&&t.dataset.optv==='clock'){const l=t.closest('label'),v=+t.value;l.querySelector('.clv').textContent=v;l.querySelector('.clb').textContent=Math.max(4,Math.round(v*2/3))}});
V.addEventListener('focusout',()=>setTimeout(()=>{if(pending)render()},0));
function startOffline(){online=false;isHost=true;me.team=-1;mode='game';G=newG(cfg.names,cfg.cpu,undefined,cfg.opt);G.v=0;startLot()}
document.addEventListener('keydown',e=>{
  if(online||!G||G.phase!=='auction'||!G.lot||e.target.tagName==='INPUT'||e.repeat)return;
  const m={q:[0,1],w:[0,2],e:[0,5],i:[1,1],o:[1,2],p:[1,5]}[e.key.toLowerCase()];
  if(m&&G.teams.length===2&&!G.teams[m[0]].cpu&&local().length===2)doBid(m[0],G.lot.hi+m[1]);
});
setInterval(()=>{
  const now=Date.now();
  if(isHost&&G&&G.phase==='auction')tick(now);
  if(online&&isHost&&G&&now-lastCast>1000)cast();
  if(online&&!isHost&&G&&G.phase!=='done'&&!hostGone&&now-lastState>7000){hostGone=true;render()}
  timerUI(now);
},200);
render();
