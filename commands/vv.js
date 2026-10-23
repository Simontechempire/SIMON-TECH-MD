module.exports = {
  vv: async (sock,m) => {
    const q=m.message.extendedTextMessage?.contextInfo?.quotedMessage
    if(!q) return await sock.sendMessage(m.key.remoteJid, { text: 'Reply to viewonce' }, { quoted: m })
    const v=q.viewOnceMessageV2?.message || q.viewOnceMessage?.message
    if(!v) return await sock.sendMessage(m.key.remoteJid, { text: 'No viewonce' }, { quoted: m })
    const type=Object.keys(v)[0]
    try {
      const buf=await sock.downloadMediaMessage({ message: { [type]: v[type] } })
      if(type.includes('image')) await sock.sendMessage(m.key.remoteJid, { image: buf, caption: '*ANTI VIEWONCE - SIMON TECH MD*' }, { quoted: m })
      else await sock.sendMessage(m.key.remoteJid, { video: buf, caption: '*ANTI VIEWONCE*' }, { quoted: m })
    } catch(e){ await sock.sendMessage(m.key.remoteJid, { text: 'Failed: '+e.message }, { quoted: m }) }
  },
  vv2: async (sock,m) => { await sock.sendMessage(m.key.remoteJid, { text: 'Use !vv - reply to viewonce' }, { quoted: m }) }
}
