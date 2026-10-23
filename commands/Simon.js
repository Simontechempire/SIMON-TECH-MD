module.exports = {
  sticker: async (sock,m) => { try{ let buf; if(m.message.imageMessage) buf=await sock.downloadMediaMessage(m); else { const q=m.message.extendedTextMessage?.contextInfo?.quotedMessage; if(!q) return await sock.sendMessage(m.key.remoteJid, { text: 'Reply image with !sticker' }, { quoted: m }); buf=await sock.downloadMediaMessage({ message: q }); } await sock.sendMessage(m.key.remoteJid, { sticker: buf }, { quoted: m }) }catch(e){ await sock.sendMessage(m.key.remoteJid, { text: e.message }, { quoted: m }) } },
  toimg: async (sock,m) => { const q=m.message.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage; if(!q) return await sock.sendMessage(m.key.remoteJid, { text: 'Reply sticker' }, { quoted: m }); const buf=await sock.downloadMediaMessage({ message: { stickerMessage: q } }); await sock.sendMessage(m.key.remoteJid, { image: buf }, { quoted: m }) },
  ping: async (sock,m) => { await sock.sendMessage(m.key.remoteJid, { text: '⚡ Pong 8ms - PERMANENT' }, { quoted: m }) },
  alive: async (sock,m) => { await sock.sendMessage(m.key.remoteJid, { text: '*ALIVE*\nSimon Tech MD\nPermanent' }, { quoted: m }) },
  weather: async (sock,m,args) => { await sock.sendMessage(m.key.remoteJid, { text: `Weather ${args.join(' ')||'Port Harcourt'}: 32°C Sunny` }, { quoted: m }) },
  joke: async (sock,m) => { await sock.sendMessage(m.key.remoteJid, { text: '😂 Bot: No more 60s expiry!' }, { quoted: m }) },
  quote: async (sock,m) => { await sock.sendMessage(m.key.remoteJid, { text: '"Code hard, host permanent"' }, { quoted: m }) },
  play: async (sock,m,args) => { await sock.sendMessage(m.key.remoteJid, { text: `🎵 Playing ${args.join(' ')}...` }, { quoted: m }) }
    }
