// ---------- online ----------
async function joinRoom(c,host){
  game=room?await room.join('d30-'+c.toLowerCase()):await peerGame(c,host);code=c.toUpperCase();
  unsub=[game.on('state',onState),game.on('bid',onBid),game.onPeers(ch=>{peers=ch.peers;render()})];
  game.presence({nick:me.nick,team:me.team}).catch(()=>{});
}

// ---------- PeerJS transport (works on any normal web page, no accounts) ----------
// Star network: the host's browser is the hub. Same API shape as the claude.ai room.
function peerGame(c,host){return new Promise((res,rej)=>{
  const opts=Object.assign({debug:0},window.__peerOpts||{}),hid='d30x-'+c.toLowerCase();
  const pr=host?new window.Peer(hid,opts):new window.Peer(opts);
  const subs={},pfns=[],conns=new Map();let hc=null,myId=null,pmap={},plist=[],done=false;
  const list=()=>{plist=Object.entries(pmap).map(([peer,p])=>({peer,presence:p||{},isMe:peer===myId,sameTab:peer===myId,kind:'viewer',guest:false,by:null}));pfns.forEach(f=>{try{f({peers:plist,joined:[],left:[],updated:[]})}catch(e){}})};
  const deliver=(topic,data,peer)=>(subs[topic]||[]).forEach(f=>{try{f({topic,data,peer,isMe:false,sameTab:false})}catch(e){}});
  const sendAll=m=>conns.forEach(cn=>{if(cn.open)try{cn.send(m)}catch(e){}});
  const clean=p=>({nick:String((p&&p.nick)||'').slice(0,18),team:[0,1,2,3].includes(p&&p.team)?p.team:-1});
  const api={via:'peer',
    emit:async(topic,data)=>{if(host)sendAll({t:'ev',topic,data});else if(hc&&hc.open)hc.send({t:'ev',topic,data})},
    on:(topic,fn)=>{(subs[topic]=subs[topic]||[]).push(fn);return()=>{subs[topic]=(subs[topic]||[]).filter(x=>x!==fn)}},
    presence:async(patch)=>{pmap[myId]=clean({...(pmap[myId]||{}),...patch});if(host){sendAll({t:'peers',map:pmap});list()}else if(hc&&hc.open)hc.send({t:'pres',p:pmap[myId]})},
    onPeers:fn=>{pfns.push(fn);setTimeout(()=>fn({peers:plist,joined:[],left:[],updated:[]}),0);return()=>{}},
    peers:()=>plist,leave:async()=>{try{pr.destroy()}catch(e){}}};
  pr.on('open',id=>{myId=id;pmap[myId]={};
    if(host){done=true;res(api);return}
    hc=pr.connect(hid);
    hc.on('open',()=>{done=true;res(api)});
    hc.on('data',m=>{if(!m||typeof m!=='object')return;if(m.t==='ev')deliver(m.topic,m.data,hc.peer);else if(m.t==='peers'&&m.map&&typeof m.map==='object'){pmap={};for(const k in m.map)pmap[k]=clean(m.map[k]);list()}});
    hc.on('close',()=>{pmap={[myId]:pmap[myId]};list()});
  });
  if(host)pr.on('connection',cn=>{conns.set(cn.peer,cn);
    cn.on('open',()=>{try{cn.send({t:'peers',map:pmap})}catch(e){}});
    cn.on('data',m=>{if(!m||typeof m!=='object')return;
      if(m.t==='ev'&&m.topic==='bid')deliver('bid',m.data,cn.peer);
      else if(m.t==='pres'){pmap[cn.peer]=clean(m.p);sendAll({t:'peers',map:pmap});list()}});
    cn.on('close',()=>{conns.delete(cn.peer);delete pmap[cn.peer];sendAll({t:'peers',map:pmap});list()})});
  pr.on('error',err=>{if(!done){try{pr.destroy()}catch(e){}rej(err)}});
  setTimeout(()=>{if(!done){try{pr.destroy()}catch(e){}rej(Object.assign(new Error('timeout'),{type:'timeout'}))}},15000);
})}
function onState(m){
  if(m.sameTab||isHost)return;const d=m.data;if(!d||typeof d!=='object'||typeof d.e!=='string')return;
  lastState=Date.now();if(hostGone){hostGone=false;lastV=null}
  if(!G||d.e!==G.e||d.v>=G.v){G=d;if(d.lot)deadline=Date.now()+(+d.lot.left||0)}
  if(G.e+G.v!==lastV)render();
}
function onBid(m){
  if(!isHost||m.sameTab)return;const d=m.data;
  if(d&&d.k){lineupAct(d);return}
  if(!d||!G||!G.lot||d.n!==G.lot.n)return;
  bid(+d.team,Math.floor(+d.amt),String(d.nick||'Someone').slice(0,18));
}
function leave(){unsub.forEach(f=>{try{f()}catch(e){}});unsub=[];if(game)game.leave().catch(()=>{});game=null;G=null;online=false;isHost=false;hostGone=false;mode='landing';me.team=-1;peers=[];render()}
const members=i=>peers.filter(p=>p.presence&&p.presence.team===i);
const chipFor=p=>`<span class="chip${p.isMe&&p.sameTab?' me':''}">${esc(String(p.presence.nick||'Someone').slice(0,18))}${p.isMe&&p.sameTab?' (you)':''}</span>`;

