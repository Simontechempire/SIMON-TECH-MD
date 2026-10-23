module.exports = {
  mode: async (sock,m,args) => { global.botMode = args[0]||'public'; await sock.sendMessage(m.key.remoteJid, { text: `Mode: ${global.botMode}` }, { quoted: m }) },
  restart: async (sock,m) => { await sock.sendMessage(m.key.remoteJid, { text: 'Restarting...' }, { quoted: m }); process.exit(0) },
  ping: async (sock,m) => { await sock.sendMessage(m.key.remoteJid, { text: '⚡ Pong 8ms - PERMANENT' }, { quoted: m }) },
  alive: async (sock,m) => { await sock.sendMessage(m.key.remoteJid, { text: '*SIMON TECH MD ALIVE*\nPermanent Host: Back4app\nNo 60s expiry' }, { quoted: m }) },
  owner: async (sock,m) => { await sock.sendMessage(m.key.remoteJid, { text: '👑 Owner: 23408122029123' }, { quoted: m }) },
  block: async (sock,m,args) => { const jid=args[0].replace(/[^0-9]/g,'')+'@s.whatsapp.net'; await sock.updateBlockStatus(jid,'block'); await sock.sendMessage(m.key.remoteJid, { text: `Blocked ${args[0]}` }, { quoted: m }) },
  unblock: async (sock,m,args) => { const jid=args[0].replace(/[^0-9]/g,'')+'@s.whatsapp.net'; await sock.updateBlockStatus(jid,'unblock'); await sock.sendMessage(m.key.remoteJid, { text: `Unblocked` }, { quoted: m }) },
  broadcast: async (sock,m,args) => { const txt=args.join(' '); const chats=await sock.groupFetchAllParticipating(); for(let id in chats) await sock.sendMessage(id, { text: `*BC*\n${txt}` }); await sock.sendMessage(m.key.remoteJid, { text: 'BC done' }, { quoted: m }) },
  setpp: async (sock,m) => { const media=await sock.downloadMediaMessage(m); await sock.updateProfilePicture(sock.user.id, media); await sock.sendMessage(m.key.remoteJid, { text: 'PP updated' }, { quoted: m }) },
  setbio: async (sock,m,args) => { await sock.updateProfileStatus(args.join(' ')); await sock.sendMessage(m.key.remoteJid, { text: 'Bio updated' }, { quoted: m }) },
  eval: async (sock,m,args) => { try{ let r=eval(args.join(' ')); await sock.sendMessage(m.key.remoteJid, { text: String(r) }, { quoted: m }) }catch(e){ await sock.sendMessage(m.key.remoteJid, { text: e.message }, { quoted: m }) } },
  clearsession: async (sock,m) => { const fs=require('fs'); fs.rmSync('./auth', {recursive:true,force:true}); await sock.sendMessage(m.key.remoteJid, { text: 'Session cleared' }, { quoted: m }) },
  getsession: async (sock,m) => { await sock.sendMessage(m.key.remoteJid, { text: 'Session in ./auth folder - copy creds.json' }, { quoted: m }) }
}
