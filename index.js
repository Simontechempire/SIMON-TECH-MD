const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const P = require('pino')
const { default: makeWASocket, useMultiFileAuthState, Browsers, makeCacheableSignalKeyStore, DisconnectReason, delay } = require('@whiskeysockets/baileys')
const config = require('./config')
const menuText = require('./menu')

app.use(express.static(__dirname))
global.botMode = 'public'
global.protect = {}
global.warns = {}
global.auto = { statusView: false, read: false, typing: false, react: false, recording: false, bio: false }
global.welcome = {}
global.goodbye = {}
let sock

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(config.sessionPath)
  sock = makeWASocket({
    auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, P().child({level:'silent'})) },
    printQRInTerminal: false,
    browser: Browsers.macOS('Chrome'),
    logger: P({level:'silent'})
  })
  sock.ev.on('creds.update', saveCreds)
  sock.ev.on('connection.update', async (u) => {
    const { connection, lastDisconnect } = u
    if(connection === 'close'){
      if(lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut){
        await delay(3000)
        startBot()
      }
    }
    if(connection === 'open') console.log('✅ SIMON TECH MD CONNECTED - PERMANENT')
  })

  sock.ev.on('group-participants.update', async (update) => {
    try {
      const { id, participants, action } = update
      const meta = await sock.groupMetadata(id).catch(()=>null)
      if(!meta) return
      const botIsAdmin = meta.participants.find(p => p.id === sock.user.id)?.admin
      if(!botIsAdmin) return

      for(let user of participants) {
        const groupName = meta.subject
        const memberCount = meta.participants.length
        const adminCount = meta.participants.filter(p=>p.admin).length

        if(action === 'add') {
          const isEnabled = global.welcome[id]?.enabled !== false
          if(!isEnabled) continue
          const welcomeText = `╭───────────────⭓
│ *SIMON TECH MD* 
╰───────────────⭓

╭─ *WELCOME* 🎉
│ • *GROUP:* ${groupName}
│ • *USER:* @${user.split('@')[0]}
│ • *MEMBERS:* ${memberCount}
│ • *ADMIN:* ${adminCount}
│ • *TIME:* ${new Date().toLocaleTimeString()}
│ • *BY:* SIMON TECH MD
╰───────────────⭓`
          await sock.sendMessage(id, { text: welcomeText, mentions: [user] })
        }

        if(action === 'remove') {
          const isEnabled = global.goodbye[id]?.enabled !== false
          if(!isEnabled) continue
          const goodbyeText = `╭───────────────⭓
│ *SIMON TECH MD* 
╰───────────────⭓

╭─ *GOODBYE* 👋
│ • *GROUP:* ${groupName}
│ • *USER:* @${user.split('@')[0]}
│ • *MEMBERS:* ${memberCount}
│ • *LEFT:* ${new Date().toLocaleTimeString()}
│ • *BY:* SIMON TECH MD
╰───────────────⭓`
          await sock.sendMessage(id, { text: goodbyeText, mentions: [user] })
        }
      }
    } catch(e){ console.log('Welcome/Goodbye error:', e.message) }
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0]
    if(!m.message || m.key.fromMe) return
    const from = m.key.remoteJid
    const sender = m.key.participant || from
    const text = m.message.conversation || m.message.extendedTextMessage?.text || m.message.imageMessage?.caption || ''
    
    if(global.auto.read) { try { await sock.readMessages([m.key]) } catch{} }
    if(global.auto.typing) { try { await sock.sendPresenceUpdate('composing', from); await delay(1000) } catch{} }
    if(global.auto.recording) { try { await sock.sendPresenceUpdate('recording', from) } catch{} }
    if(global.auto.react) { try { await sock.sendMessage(from, { react: { text: '⚡', key: m.key } }) } catch{} }
    
    if(global.protect[from]?.antilink && text.includes('https://chat.whatsapp.com/')){
      try { await sock.sendMessage(from, { delete: m.key }) } catch{}
      return
    }

    if(!text.startsWith(config.prefix)) return
    const args = text.slice(1).trim().split(/ +/)
    const cmd = args.shift().toLowerCase()
    const isOwner = sender.includes(config.ownerNumber)

    if(global.botMode === 'self' && !isOwner) return

    try {
      const ownerCmds = require('./commands/owner')
      const groupCmds = require('./commands/group')
      const modCmds = require('./commands/moderator')
      const protCmds = require('./commands/protection')
      const vvCmds = require('./commands/vv')
      const aiCmds = require('./commands/ai')
      const simonCmds = require('./commands/simon')
      const autoCmds = require('./commands/auto')
      const all = { ...ownerCmds, ...groupCmds, ...modCmds, ...protCmds, ...vvCmds, ...aiCmds, ...simonCmds, ...autoCmds }
      
      if(cmd === 'menu') return await sock.sendMessage(from, { text: menuText }, { quoted: m })
      if(all[cmd]) await all[cmd](sock, m, args)
    } catch(e){ console.log(e) }
  })
}

app.get('/', (req,res) => res.sendFile(path.join(__dirname, 'index.html')))

app.get('/pair', async (req,res) => {
  let num = req.query.number?.replace(/[^0-9]/g,'')
  if(!num) return res.send(`
    <h2>SIMON TECH MD PAIR</h2>
    <p>Use: /pair?number=2348122029123</p>
    <p>Enter number without + and without 0 at start</p>
    <p>Example: 2348122029123</p>
  `)
  if(!sock){ await startBot(); await delay(5000) }
  try { 
    await delay(2000)
    const code = await sock.requestPairingCode(num)
    res.send(`
      <html>
      <head><meta name="viewport" content="width=device-width, initial-scale=1"></head>
      <body style="font-family:sans-serif;text-align:center;padding:20px;background:#111;color:#fff">
        <h1 style="color:#25D366">SIMON TECH MD</h1>
        <h2>Your Pair Code:</h2>
        <div style="font-size:40px;letter-spacing:8px;background:#222;padding:20px;border-radius:10px;margin:20px 0;font-weight:bold;color:#25D366">${code}</div>
        <p style="color:yellow">⚡ Expires in 60 seconds! Paste fast in WhatsApp</p>
        <p>WhatsApp > Linked Devices > Link with phone number</p>
        <p>Enter this code</p>
        <br>
        <a href="/pair?number=${num}" style="background:#25D366;color:white;padding:10px 20px;border-radius:5px;text-decoration:none">Get New Code</a>
        <br><br>
        <a href="/status" style="color:#aaa">Check Status</a>
      </body>
      </html>
    `)
  }
  catch(e){ 
    console.log('Pair error:', e.message)
    if(e.message.includes('conflict') || e.message.includes('already')) {
      return res.send(`<h2 style="color:green">✅ ALREADY PAIRED!</h2><p>Bot is already connected. No need to pair again.</p><a href="/status">Check Status</a>`)
    }
    res.send(`Error: ${e.message}<br><br><a href="/pair?number=${num}">Try Again - Click Here</a>`)
  }
})

app.get('/status', (req,res) => res.json({ connected: !!sock, authSaved: fs.existsSync('./auth/creds.json'), auto: global.auto }))

app.listen(config.port, () => { console.log('Server on '+config.port); startBot() })
