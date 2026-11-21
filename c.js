// ---------- views ----------
function render(){
  applyTune(G&&G.opt&&G.opt.tune);if(typeof bidLockCheck==='function')bidLockCheck();
  if(typeof sfxCheck==='function')sfxCheck();
  const a=document.activeElement;if(a&&a.tagName==='INPUT'&&V.contains(a)){pending=true;return}
  pending=false;lastV=G?G.e+G.v:null;
  if(mode==='landing')return landing();
  if(!G)return V.innerHTML=`<div class="card"><h2>Game ${esc(code)}</h2><p>Waiting for the host… If nothing shows up, check the code with whoever created the game.</p><button data-act="leave">Leave</button></div>`;
  const banner=!hostGone?'':game&&game.via==='peer'?`<div class="card warn"><b>Lost the connection to the host.</b> The game runs on the host's device, so it continues once they're back. <button data-act="leave">Leave</button></div>`:`<div class="card warn"><b>The host's connection dropped.</b> Anyone can take over and the game picks up where it left off. <button class="go" data-act="takeover">Take over hosting</button></div>`;
  if(G.phase==='lobby')V.innerHTML=banner+lobby();
  else if(G.phase==='auction')V.innerHTML=banner+auction();
  else if(G.phase==='lineup')V.innerHTML=banner+lineupView();
  else V.innerHTML=banner+results();
  timerUI(Date.now());fxApply();mbarSync();emoApply();
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
   <div class="row"><select id="tn" aria-label="Number of teams">${[2,3,4].map(n=>`<option value="${n}"${offSel.n==n?' selected':''}>${n} teams</option>`).join('')}</select><select id="tbc" aria-label="Who plays the other teams"><option value="cpu"${offSel.who!=='h'?' selected':''}>You vs the CPU</option><option value="h"${offSel.who==='h'?' selected':''}>Everyone on this screen</option></select><button class="go" data-act="offline">Start</button></div>
   <div class="opts">${eraRow(offOpt,true)}${aiRow(offOpt,true)}${clockRow(offOpt,true)}${tuneBox(offOpt,true)}${typeof leagueRow==='function'?leagueRow(offOpt,true):''}<b style="display:block;margin-top:10px">Optional rules</b>${optRows(offOpt,true)}</div></div></div>
  <div class="card" style="margin-top:16px"><h2>Rules</h2><ul style="margin:0;padding-left:20px">
   <li>Each team has $30 and needs 7 players. Any positions can be bought, but your starting five should have 2 guards (PG/SG), 2 forwards (SF/PF) and a center: each empty slot costs 15 points.</li>
   <li>The pool mixes this season's players with throwback seasons: legends, role players and notorious busts. Legends are rare (about 1 in 7 makes each game's pool). Pick a single era and there are no legends or throwbacks: every player from that era can come up. The season shows on the block, and only one version of a player can be drafted per game.</li>
   <li>A random player goes on the block with a 12-second clock (adjustable from 6 to 30 when you set up the game). Anyone can bid at any time, and every bid puts the clock back to at least 2/3 of that. After a new high bid, everyone else's bid buttons pause for a second so you can't accidentally pay the new price. Press Pass if you're out: once everyone who can still bid has passed, the clock ends right away.</li>
   <li>When the clock hits zero, the highest bid wins him.</li>
   <li>If the clock runs out with no bids, the player is passed and every team still filling its roster loses $1, or $2 once any team's roster is full.</li>
   <li>You can spend your last dollar, but a team with $0 can't bid and must take anyone nobody bids on, for free.</li>
   <li>Once every other team is full, the last team must take whoever comes up next ($1 each, or free if out of money).</li>
   <li>Some players have traits. Good pairs on one team add chemistry (PnR Maestro + Rim Finisher = Lob City); bad ones cost you (two Ball Stoppers = Too Many Cooks). Glass Joints players miss games, Hotheads get ejected, and Clutch players swing close games. Hover or tap a trait to see what it does. Bonuses stack: every pair counts, so one PnR Maestro with two Rim Finishers is Lob City ×2.</li>
   <li>Trait tiers work like TFT: starters who share a trait unlock bonuses at 2, 3, 4 and 5. Shooting (Sharpshooters) goes +6 / +15 / +30 / +45 (Five Out), Defense (Lockdown or Rim Protector) the same, Paint (Slasher or Rim Finisher) +6 / +12 / +24 / +36, and Playmaking, Glue, Scoring and Clutch have tiers at 2 and 3. A starting Bricklayer cancels the shooting tier, and a starting Traffic Cone cancels the defense tier. The trait tracker on your team shows every tier and what's next.</li>
   <li>Franchises and famous duos: 2+ players from one franchise (any era) earn its culture bonus (Heat Culture, Celtic Pride…), real teammates from the same season add a little more, and famous pairings have their own: LeBron + Kyrie is the 3–1 Comeback, Shaq + Kobe the Three-Peat, Jordan + Pippen Six Rings. A few famous pairings cost you instead (Kawhi + PG: Load Management).</li>
   <li>Order your roster with the arrows, during the auction or after it fills. The top player is your star (counts ×1.3), the next four start, and the last two are the bench (count half, traits too). The hexagon shows your lineup's profile.</li>
   <li>Optional rules can be switched on when you set up a game: hole cards, scouting reports, nominations, hidden budgets, blind bids for legends, interest, augments and rerolls. Turn on League night to keep standings across games. Online, the host picks them in the lobby.</li>
   <li>Play with 2 to 4 teams; several people can share a team. When every roster is full, teams play best-of-7 series. With 3 or 4 teams, everyone plays everyone and the top two meet in the Finals.</li></ul>
   <p class="note">Stats are regular-season per-game averages: 2025-26 from Basketball-Reference, throwbacks from the season shown.</p></div>`;
}
