module.exports = {
  antilink: async (sock,m,args) => { if(!global.protect[m.key.remoteJid]) global.protect[m.key.remoteJid]={}; global.protect[m.key.remoteJid].antilink=args[0]==='on'; await sock.sendMessage(m.key.remoteJid, { text: `Antilink ${args[0]}` }, { quoted: m }) },
  antilink2: async (sock,m,args) => { await sock.sendMessage(m.key.remoteJid, { text: `Antilink2 ${args[0]}` }, { quoted: m }) },
  antibadword: async (sock,m,args) => { await sock.sendMessage(m.key.remoteJid, { text: `Antibadword ${args[0]}` }, { quoted: m }) },
  antidelete: async (sock,m,args) => { if(!global.protect[m.key.remoteJid]) global.protect[m.key.remoteJid]={}; global.protect[m.key.remoteJid].antidelete=args[0]==='on'; await sock.sendMessage(m.key.remoteJid, { text: `Antidelete ${args[0]}` }, { quoted: m }) },
  antibot: async (sock,m,args) => { await sock.sendMessage(m.key.remoteJid, { text: `Antibot ${args[0]}` }, { quoted: m }) },
  antitag: async (sock,m,args) => { await sock.sendMessage(m.key.remoteJid, { text: `Antitag ${args[0]}` }, { quoted: m }) }
}
