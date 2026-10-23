module.exports = {
  ai: async (sock,m,args) => { if(!args[0]) return await sock.sendMessage(m.key.remoteJid, { text: 'Use !ai hello' }, { quoted: m }); await sock.sendMessage(m.key.remoteJid, { text: `🤖 *AI*\n\n${args.join(' ')}` }, { quoted: m }) },
  gpt: async (sock,m,args) => { await sock.sendMessage(m.key.remoteJid, { text: `*GPT*\n${args.join(' ')}` }, { quoted: m }) },
  bard: async (sock,m,args) => { await sock.sendMessage(m.key.remoteJid, { text: `*BARD*\n${args.join(' ')}` }, { quoted: m }) },
  simon: async (sock,m,args) => { await sock.sendMessage(m.key.remoteJid, { text: `👑 Simon AI: ${args.join(' ')||'Yes boss?'}` }, { quoted: m }) },
  imagine: async (sock,m,args) => { await sock.sendMessage(m.key.remoteJid, { text: `🎨 Imagine: ${args.join(' ')}` }, { quoted: m }) }
}
