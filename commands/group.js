module.exports = {
  tagall: async (sock,m,args) => { const meta=await sock.groupMetadata(m.key.remoteJid); let t=`*TAGALL*\n${args.join(' ')}\n`; const mentions=meta.participants.map(p=>p.id); for(let p of meta.participants) t+=`@${p.id.split('@')[0]} `; await sock.sendMessage(m.key.remoteJid, { text: t, mentions }, { quoted: m }) },
  hidetag: async (sock,m,args) => { const meta=await sock.groupMetadata(m.key.remoteJid); await sock.sendMessage(m.key.remoteJid, { text: args.join(' ')||'Hidetag', mentions: meta.participants.map(p=>p.id) }, { quoted: m }) },
  kick: async (sock,m) => { const u=m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]; if(!u) return; await sock.groupParticipantsUpdate(m.key.remoteJid, [u], 'remove') },
  add: async (sock,m,args) => { await sock.groupParticipantsUpdate(m.key.remoteJid, [args[0].replace(/[^0-9]/g,'')+'@s.whatsapp.net'], 'add') },
  promote: async (sock,m) => { const u=m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]; await sock.groupParticipantsUpdate(m.key.remoteJid, [u], 'promote'); await sock.sendMessage(m.key.remoteJid, { text: 'Promoted' }, { quoted: m }) },
  demote: async (sock,m) => { const u=m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]; await sock.groupParticipantsUpdate(m.key.remoteJid, [u], 'demote'); await sock.sendMessage(m.key.remoteJid, { text: 'Demoted' }, { quoted: m }) },
  open: async (sock,m) => { await sock.groupSettingUpdate(m.key.remoteJid, 'not_announcement'); await sock.sendMessage(m.key.remoteJid, { text: 'Opened' }, { quoted: m }) },
  close: async (sock,m) => { await sock.groupSettingUpdate(m.key.remoteJid, 'announcement'); await sock.sendMessage(m.key.remoteJid, { text: 'Closed' }, { quoted: m }) },
  grouplink: async (sock,m) => { const c=await sock.groupInviteCode(m.key.remoteJid); await sock.sendMessage(m.key.remoteJid, { text: `https://chat.whatsapp.com/${c}` }, { quoted: m }) },
  groupinfo: async (sock,m) => { const g=await sock.groupMetadata(m.key.remoteJid); await sock.sendMessage(m.key.remoteJid, { text: `*${g.subject}*\nMembers: ${g.participants.length}` }, { quoted: m }) },
  revoke: async (sock,m) => { await sock.groupRevokeInvite(m.key.remoteJid); await sock.sendMessage(m.key.remoteJid, { text: 'Revoked' }, { quoted: m }) },
  poll: async (sock,m,args) => { await sock.sendMessage(m.key.remoteJid, { poll: { name: args.join(' ')||'Poll', values: ['Yes','No'], selectableCount: 1 } }) },
  listonline: async (sock,m) => { await sock.sendMessage(m.key.remoteJid, { text: 'Online members checking...' }, { quoted: m }) }
}
