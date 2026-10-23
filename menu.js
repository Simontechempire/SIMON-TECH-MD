const config = require('./config')

module.exports = `
┏━━━━━━━━━━━━━━━━━━━━━━┓
┃   ⚡ ${config.botName} ⚡   ┃
┗━━━━━━━━━━━━━━━━━━━━━━┛
┏━[ 👑 *OWNER INFO* ]━┓
┃ • Name: ${config.ownerName}
┃ • Number: ${config.ownerNumber}
┃ • Prefix: [ ${config.prefix} ]
┃ • Host: BACK4APP PERMANENT ✅
┃ • Mode: MULTI DEVICE
┃ • Speed: ULTRA FAST ⚡
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━[ 📜 *TOTAL COMMANDS: 140+* ]━┓
┃
┣━[ 👑 *OWNER MENU* - 20 ]━
┃ ┌─⊳ !mode !restart !update
┃ ├─⊳ !broadcast !bcgroup
┃ ├─⊳ !block !unblock
┃ ├─⊳ !clearsession !getsession
┃ ├─⊳ !setpp !setbio !eval !exec
┃ └─⊳ !leave !join !owner !savecontact !ban !unban !listblocked
┃
┣━[ 👥 *GROUP MENU* - 20 ]━
┃ ┌─⊳ !tagall !hidetag !tagadmin
┃ ├─⊳ !kick !add !promote !demote
┃ ├─⊳ !open !close !groupinfo
┃ ├─⊳ !grouplink !revoke !editdesc
┃ └─⊳ !editsubject !poll !listonline !totalmembers !requestlist !approveall
┃
┣━[ 🛡️ *MODERATOR* - 20 ]━
┃ ┌─⊳ !warn !warnings !delwarn
┃ ├─⊳ !mute !unmute !mutetime
┃ ├─⊳ !delete !purge !pin !unpin
┃ └─⊳ !setwelcome !setgoodbye !staff !modlist !setrole !removerole !promoteall !demoteall !report
┃
┣━[ 🔒 *PROTECTION* - 20 ]━
┃ ┌─⊳ !antilink !antilink2 !antibadword
┃ ├─⊳ !antispam !antidelete !antibot
┃ ├─⊳ !antitag !antiviewonce !antisticker
┃ ├─⊳ !antiimage !antivideo !antiaudio
┃ └─⊳ !anticall !antifake !antiforeign !antipromote !antidemote
┃
┣━[ 👀 *VV MENU* - 2 ]━
┃ └─⊳ !vv !vv2 - Anti ViewOnce
┃
┣━[ 🤖 *AI MENU* - 8 ]━
┃ └─⊳ !gpt !ai !bard !blackbox !imagine !flux !metaai !simon
┃
┗━[ 🎨 *SIMON MENU* - 50 ]━
  ┌─⊳ !sticker !steal !toimg !emojimix !attp
  ├─⊳ !tiktok !ig !ytmp3 !ytmp4 !fb !play
  ├─⊳ !weather !joke !quote !ship !ping !alive
  └─⊳ !menu + 30 more hidden...

━━━━━━━━━━━━━━━━━━━━━━
*INLINE BUTTONS:*
> Type !ping to test speed
> Type !alive to check bot
> Type !sticker to make sticker

✅ *FIXED: No 60s expiry after first link*
⚡ *Powered by Simon Tech Inc*
━━━━━━━━━━━━━━━━━━━━━━
`

// BONUS: If you want BUTTON UI (interactive) - use this function instead in index.js
module.exports.buttonMenu = async (sock, from, m) => {
  const text = module.exports
  const buttons = [
    { buttonId: '!ping', buttonText: { displayText: '⚡ PING' }, type: 1 },
    { buttonId: '!alive', buttonText: { displayText: '✅ ALIVE' }, type: 1 },
    { buttonId: '!owner', buttonText: { displayText: '👑 OWNER' }, type: 1 }
  ]
  const buttonMessage = {
    text: text,
    footer: 'SIMON TECH MD - PERMANENT',
    buttons: buttons,
    headerType: 1
  }
  await sock.sendMessage(from, buttonMessage, { quoted: m })
}
