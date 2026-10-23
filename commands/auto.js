// ===== SIMON TECH MD - ALL AUTO COMMANDS IN ONE FILE =====
if(!global.auto) global.auto = { statusView: false, read: false, typing: false, react: false, recording: false, bio: false }
if(!global.welcome) global.welcome = {}
if(!global.goodbye) global.goodbye = {}

module.exports = {
  
  // 1. AUTO STATUS VIEW
  autostatusview: async (sock,m,args) => {
    if(!args[0]) return await sock.sendMessage(m.key.remoteJid, { text: `╭─ AUTO STATUS VIEW\n│ Status: ${global.auto.statusView?'ON ✅':'OFF ❌'}\n│ Use: !autostatusview on/off\n╰───────────────⭓` }, { quoted: m })
    global.auto.statusView = args[0]==='on'
    await sock.sendMessage(m.key.remoteJid, { text: `✅ Auto Status View *${args[0].toUpperCase()}*` }, { quoted: m })
  },

  // 2. AUTO READ
  autoread: async (sock,m,args) => {
    if(!args[0]) return await sock.sendMessage(m.key.remoteJid, { text: `╭─ AUTO READ\n│ Status: ${global.auto.read?'ON ✅':'OFF ❌'}\n│ Use: !autoread on/off\n╰───────────────⭓` }, { quoted: m })
    global.auto.read = args[0]==='on'
    await sock.sendMessage(m.key.remoteJid, { text: `✅ Auto Read *${args[0].toUpperCase()}*` }, { quoted: m })
  },

  // 3. AUTO TYPING
  autotyping: async (sock,m,args) => {
    if(!args[0]) return await sock.sendMessage(m.key.remoteJid, { text: `╭─ AUTO TYPING\n│ Status: ${global.auto.typing?'ON ✅':'OFF ❌'}\n│ Use: !autotyping on/off\n╰───────────────⭓` }, { quoted: m })
    global.auto.typing = args[0]==='on'
    await sock.sendMessage(m.key.remoteJid, { text: `✅ Auto Typing *${args[0].toUpperCase()}*` }, { quoted: m })
  },

  // 4. AUTO REACT
  autoreact: async (sock,m,args) => {
    if(!args[0]) return await sock.sendMessage(m.key.remoteJid, { text: `╭─ AUTO REACT\n│ Status: ${global.auto.react?'ON ✅':'OFF ❌'}\n│ Use: !autoreact on/off\n╰───────────────⭓` }, { quoted: m })
    global.auto.react = args[0]==='on'
    await sock.sendMessage(m.key.remoteJid, { text: `✅ Auto React *${args[0].toUpperCase()}*` }, { quoted: m })
  },

  // 5. AUTO RECORDING
  autorecording: async (sock,m,args) => {
    if(!args[0]) return await sock.sendMessage(m.key.remoteJid, { text: `╭─ AUTO RECORDING\n│ Status: ${global.auto.recording?'ON ✅':'OFF ❌'}\n│ Use: !autorecording on/off\n╰───────────────⭓` }, { quoted: m })
    global.auto.recording = args[0]==='on'
    await sock.sendMessage(m.key.remoteJid, { text: `✅ Auto Recording *${args[0].toUpperCase()}*` }, { quoted: m })
  },

  // 6. AUTO BIO
  autobio: async (sock,m,args) => {
    if(!args[0]) return await sock.sendMessage(m.key.remoteJid, { text: `╭─ AUTO BIO\n│ Status: ${global.auto.bio?'ON ✅':'OFF ❌'}\n│ Use: !autobio on/off\n╰───────────────⭓` }, { quoted: m })
    global.auto.bio = args[0]==='on'
    if(global.auto.bio) {
      setInterval(async () => {
        const time = new Date().toLocaleString()
        try { await sock.updateProfileStatus(`SIMON TECH MD | ${time}`) } catch{}
      }, 60000)
    }
    await sock.sendMessage(m.key.remoteJid, { text: `✅ Auto Bio *${args[0].toUpperCase()}*` }, { quoted: m })
  },

  // 7. SET WELCOME
  setwelcome: async (sock,m,args) => {
    const text = args.join(' ')
    if(!text) return await sock.sendMessage(m.key.remoteJid, { 
      text: `╭─ SET WELCOME\n│ Current: ${global.welcome[m.key.remoteJid]?.enabled?'ON ✅':'OFF ❌'}\n│\n│ Use:\n│ !setwelcome on\n│ !setwelcome off\n│ !setwelcome custom message\n│\n│ Tags: @user @group @members @admins\n╰───────────────⭓` }, { quoted: m })
    
    if(text==='on' || text==='off') {
      if(!global.welcome[m.key.remoteJid]) global.welcome[m.key.remoteJid] = {}
      global.welcome[m.key.remoteJid].enabled = text==='on'
      return await sock.sendMessage(m.key.remoteJid, { text: `✅ Welcome *${text.toUpperCase()}* for this group` }, { quoted: m })
    }
    global.welcome[m.key.remoteJid] = { enabled: true, message: text }
    await sock.sendMessage(m.key.remoteJid, { text: `✅ Custom welcome set:\n${text}` }, { quoted: m })
  },

  welcome: async (sock,m) => {
    await sock.sendMessage(m.key.remoteJid, { text: `╭─ WELCOME SYSTEM\n│ Status: ACTIVE ✅\n│ Mode: Auto sends to all groups where bot is admin\n│ Use !setwelcome on/off to toggle\n╰───────────────⭓` }, { quoted: m })
  },

  // 8. SET GOODBYE
  setgoodbye: async (sock,m,args) => {
    const text = args.join(' ')
    if(!text) return await sock.sendMessage(m.key.remoteJid, { 
      text: `╭─ SET GOODBYE\n│ Current: ${global.goodbye[m.key.remoteJid]?.enabled?'ON ✅':'OFF ❌'}\n│ Use: !setgoodbye on/off\n╰───────────────⭓` }, { quoted: m })
    
    if(!global.goodbye[m.key.remoteJid]) global.goodbye[m.key.remoteJid] = {}
    global.goodbye[m.key.remoteJid].enabled = text==='on'
    await sock.sendMessage(m.key.remoteJid, { text: `✅ Goodbye *${text.toUpperCase()}*` }, { quoted: m })
  },

  goodbye: async (sock,m) => {
    await sock.sendMessage(m.key.remoteJid, { text: `╭─ GOODBYE SYSTEM\n│ Status: ACTIVE ✅\n│ Mode: Auto sends to all groups where bot is admin\n╰───────────────⭓` }, { quoted: m })
  },

  // BONUS: LIST ALL AUTO
  auto: async (sock,m) => {
    const txt = `╭───────────────⭓
│ *SIMON TECH MD - AUTO* 
╰───────────────⭓

╭─ *8 AUTO COMMANDS*
│ • autostatusview: ${global.auto.statusView?'ON ✅':'OFF ❌'}
│ • autoread: ${global.auto.read?'ON ✅':'OFF ❌'}
│ • autotyping: ${global.auto.typing?'ON ✅':'OFF ❌'}
│ • autoreact: ${global.auto.react?'ON ✅':'OFF ❌'}
│ • autorecording: ${global.auto.recording?'ON ✅':'OFF ❌'}
│ • autobio: ${global.auto.bio?'ON ✅':'OFF ❌'}
│ • setwelcome: ${global.welcome[m.key.remoteJid]?.enabled?'ON ✅':'OFF ❌'}
│ • setgoodbye: ${global.goodbye[m.key.remoteJid]?.enabled?'ON ✅':'OFF ❌'}
│
│ Use !auto + command
│ Ex: !autostatusview on
╰───────────────⭓`
    await sock.sendMessage(m.key.remoteJid, { text: txt }, { quoted: m })
  }
                         }
