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
   <div class="card" style="margin-top:16px"><h2 style="font-size:20px">Optional rules</h2>${clockRow(G.opt,host)}${host?optRows(G.opt,true):(OPTS.filter(o=>G.opt&&G.opt[o[0]]).map(o=>`<p style="margin:4px 0"><b>${o[1]}</b> <span class="note">${o[2]}</span></p>`).join('')||'<p class="note" style="margin:0">Standard rules. The host can turn on extras.</p>')}</div>
   <div class="card" style="margin-top:16px">${host?`<label class="row" style="gap:8px"><input type="checkbox" data-act="cpufill" ${G.cpuFill?'checked':''} style="width:22px;height:22px;min-height:0"> The CPU plays a team that has nobody on it</label>
   <div class="row" style="margin-top:12px"><button class="go" data-act="start" ${ok?'':'disabled'}>Start the auction</button>${ok?'':`<span class="note">${G.cpuFill?'Someone needs to join a team first.':'Every team needs at least one person.'}</span>`}</div>`:'<p style="margin:0">Waiting for the host to start the auction…</p>'}</div>`;
}
