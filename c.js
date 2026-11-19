// ---------- views ----------
function render(){
  const a=document.activeElement;if(a&&a.tagName==='INPUT'&&V.contains(a)){pending=true;return}
  pending=false;lastV=G?G.e+G.v:null;
  if(mode==='landing')return landing();
  if(!G)return V.innerHTML=`<div class="card"><h2>Game ${esc(code)}</h2><p>Waiting for the host… If nothing shows up, check the code with whoever created the game.</p><button data-act="leave">Leave</button></div>`;
  const banner=!hostGone?'':game&&game.via==='peer'?`<div class="card warn"><b>Lost the connection to the host.</b> The game runs on the host's device, so it continues once they're back. <button data-act="leave">Leave</button></div>`:`<div class="card warn"><b>The host's connection dropped.</b> Anyone can take over and the game picks up where it left off. <button class="go" data-act="takeover">Take over hosting</button></div>`;
  if(G.phase==='lobby')V.innerHTML=banner+lobby();
  else if(G.phase==='auction')V.innerHTML=banner+auction();
  else V.innerHTML=banner+results();
  timerUI(Date.now());
}
function landing(){
  const onl=room===undefined&&!canPeer()?'<p class="note">Checking whether online play is available…</p>':netOK()?
   `<p class="note" style="margin-top:0">Everyone opens this page on their own phone or laptop. One person creates a game and shares the code.${viaPeer()?' No accounts needed.':''}</p>
    <div class="row"><button class="go" data-act="create">Create a game</button></div>
    <div class="row" style="margin-top:10px"><input id="code" placeholder="Game code" maxlength="4" autocomplete="off" value="${esc(/^[A-Z0-9]{4}$/.test(hashCode)?hashCode:'')}" style="width:150px;text-transform:uppercase" aria-label="Game code"><button data-act="join">Join game</button></div>${joinErr?`<p class="err">${esc(joinErr)}</p>`:''}`
   :'<p class="note">Online play isn\'t available here. Open the hosted version of this page in a regular browser to play with friends.</p>';
  V.innerHTML=`<div class="card" style="margin-bottom:16px"><label for="nick"><b>Your name</b></label><div class="row" style="margin-top:6px"><input id="nick" maxlength="18" value="${esc(me.nick)}" placeholder="e.g. Bob" style="flex:1;max-width:320px"></div></div>
  <div class="grid2"><div class="card"><h2>Play online with friends</h2>${onl}</div>
  <div class="card"><h2>Play on this device</h2><p class="note" style="margin-top:0">Against CPU teams, or everyone sharing one screen. With two teams on one screen, Team 1 bids with Q W E and Team 2 with I O P.</p>
   <div class="row"><select id="tn" aria-label="Number of teams"><option value="2">2 teams</option><option value="3">3 teams</option><option value="4">4 teams</option></select><select id="tbc" aria-label="Who plays the other teams"><option value="cpu">You vs the CPU</option><option value="h">Everyone on this screen</option></select><button class="go" data-act="offline">Start</button></div></div></div>
  <div class="card" style="margin-top:16px"><h2>Rules</h2><ul style="margin:0;padding-left:20px">
   <li>Each team has $30 and needs 7 players, any positions.</li>
   <li>A random player goes on the block with a 12-second clock. Anyone can bid at any time, and every bid puts the clock back to at least 8 seconds.</li>
   <li>When the clock hits zero, the highest bid wins him.</li>
   <li>If the clock runs out with no bids, the player is passed and the next one comes up.</li>
   <li>You can spend your last dollar, but a team with $0 can't bid and must take anyone nobody bids on, for free.</li>
   <li>Once every other team is full, the last team must take whoever comes up next ($1 each, or free if out of money).</li>
   <li>Play with 2 to 4 teams; several people can share a team. When every roster is full, teams play best-of-7 series. With 3 or 4 teams, everyone plays everyone and the top two meet in the Finals.</li></ul>
   <p class="note">Stats are 2025-26 regular-season per-game averages from Basketball-Reference.</p></div>`;
}
function lobby(){
  const host=isHost;
  const col=i=>{const m=members(i),cpuNote=!m.length&&G.cpuFill?'<p class="note">Nobody here yet. The CPU will play this team.</p>':!m.length?'<p class="note">Nobody here yet.</p>':'';
    return`<div class="card">${host?`<input data-name="${i}" value="${esc(G.names[i])}" maxlength="18" aria-label="Team name" style="font-weight:700;width:100%">`:`<h2>${esc(G.names[i])}</h2>`}
    <div style="margin:10px 0">${m.map(chipFor).join('')}</div>${cpuNote}
    ${me.team===i?'<p><b>You\'re on this team.</b></p>':`<button class="go" data-team="${i}">Join ${esc(G.names[i])}</button>`}</div>`};
  const spec=peers.filter(p=>!p.presence||!(p.presence.team>=0&&p.presence.team<G.names.length));
  const NT=G.names.length,humans=G.names.map((n,i)=>members(i).length>0),ok=humans.some(x=>x)&&(G.cpuFill||humans.every(x=>x));
  return`<div class="card" style="margin-bottom:16px"><div class="row" style="justify-content:space-between"><div><div class="note">Game code</div><div class="codebig">${esc(code)}</div></div><button data-act="leave">Leave</button></div>
   ${game&&game.via==='peer'?(/^https?:/.test(location.protocol)?`<p style="margin-bottom:4px">Invite link (opens with the code filled in):</p><div class="row"><input readonly id="inv" value="${esc(location.origin+location.pathname+'#'+code)}" style="flex:1" aria-label="Invite link"><button data-act="copy">Copy</button></div>`:'<p class="note">Friends need this page at a web link to join; see the hosting steps that came with the file.</p>'):''}
   <p class="note">${game&&game.via==='peer'?'Friends open the link, type their name and join.':'Friends open this same page on claude.ai, type their name, and enter the code.'} Pick a side below; more than one person can be on a team.</p></div>
   ${host?`<div class="row" style="margin-bottom:12px"><label for="nt"><b>Teams</b></label><select id="nt" data-act="nteams" aria-label="Number of teams">${[2,3,4].map(n=>`<option value="${n}"${n===NT?' selected':''}>${n} teams</option>`).join('')}</select></div>`:''}
   <div class="gridN">${G.names.map((n,i)=>col(i)).join('')}</div>
   ${spec.length?`<p class="note" style="margin-top:12px">Watching: ${spec.map(chipFor).join('')}</p>`:''}
   <div class="card" style="margin-top:16px">${host?`<label class="row" style="gap:8px"><input type="checkbox" data-act="cpufill" ${G.cpuFill?'checked':''} style="width:22px;height:22px;min-height:0"> The CPU plays a team that has nobody on it</label>
   <div class="row" style="margin-top:12px"><button class="go" data-act="start" ${ok?'':'disabled'}>Start the auction</button>${ok?'':`<span class="note">${G.cpuFill?'Someone needs to join a team first.':'Every team needs at least one person.'}</span>`}</div>`:'<p style="margin:0">Waiting for the host to start the auction…</p>'}</div>`;
}
