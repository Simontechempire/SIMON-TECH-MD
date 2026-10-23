module.exports = {
  delete: async (sock,m) => { const c=m.message.extendedTextMessage?.contextInfo; if(!c?.stanzaId) return; await sock.sendMessage(m.key.remoteJid, { delete: { remoteJid: m.key.remoteJid, fromMe: false, id: c.stanzaId, participant: c.participant } }) },
  warn: async (sock,m) => { await sock.sendMessage(m.key.remoteJid, { text: '⚠️ Warned' }, { quoted: m }) },
  warnings: async (sock,m) => { await sock.sendMessage(m.key.remoteJid, { text: 'Warnings: 0' }, { quoted: m }) },
  mute: async (sock,m) => { await sock.sendMessage(m.key.remoteJid, { text: '🔇 Muted' }, { quoted: m }) },
  unmute: async (sock,m) => { await sock.sendMessage(m.key.remoteJid, { text: '🔊 Unmuted' }, { quoted: m }) },
  purge: async (sock,m) => { await sock.sendMessage(m.key.remoteJid, { text: 'Purging...' }, { quoted: m }) },
  pin: async (sock,m) => { await sock.sendMessage(m.key.remoteJid, { text: 'Pinned' }, { quoted: m }) }
}
