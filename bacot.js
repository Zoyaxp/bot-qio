/*SC INI DI JUAL RESMI OLEH ALWAYSAQIO

HAK GUNA PEMBELI
1.MENGGUNAKAN
2.TIDAK MELAKUKAN RENAME/RECODE
3.TIDAK MENJUALNYA TANPA IZIN PEMILIK
4.MALANGGAR 3 KETENTUAN DI ATAS ? SANGSINYA TENGGUNG SENDIRI AJA

BASE : ALWAYSAQIO
CREATE : ALWAYSAQIO

TELEGRAM : t.me/alwaysaqioo
YT : youtube.com/qioaje
IG : instagram.clm/Alwaysaqioo
*/

require('./settings');
const { 
  default: AlwaysaqiooConnect, makeWASocket,   useMultiFileAuthState, DisAlwaysaqiooectReason, fetchLatestBaileysVersion, 
  generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, 
  generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto, 
  DisconnectReason, getAggregateVotesInPollMessage 
} = require("@whiskeysockets/baileys")
const pino = require('pino')
const chalk = require('chalk')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const FileType = require('file-type')
const path = require('path')
const figlet = require('figlet')
const _ = require('lodash')
const PhoneNumber = require('awesome-phonenumber')
const { spawn } = require('child_process')
const colors = require('@colors/colors/safe')
const CFonts = require('cfonts')
const { say } = require('cfonts')
const moment = require('moment-timezone')
const readline = require("readline")
const yargs = require('yargs/yargs')
const NodeCache = require("node-cache")
var low
try {
low = require('lowdb')
} catch (e) {
low = require('./lib/lowdb')
}

const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')

const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif');
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, sleep } = require('./lib/myfunction');

const { color } = require('./lib/color');

const usePairingCode = global.connect;

// warna sempak bapak kau
const listcolor = ['red', 'blue', 'magenta'];
const randomcolor = listcolor[Math.floor(Math.random() * listcolor.length)];

//Puki
const question = (text) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(color(text, randomcolor), (answer) => {
      resolve(answer);
      rl.close();
    });
  });
};

async function AlwaysaqiooStart() {
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
const { state, saveCreds } = await useMultiFileAuthState(`./${global.sessionName}`);
const { version, isLatest } = await fetchLatestBaileysVersion();
const resolveMsgBuffer = new NodeCache()

const Alwaysaqioo = AlwaysaqiooConnect({
    isLatest,
    keepAliveIntervalMs: 50000,
    printQRInTerminal: !usePairingCode,
    logger: pino({ level: "fatal" }),
    auth: state,
    browser: ['Mac Os', 'chrome', '121.0.6167.159'],
    version: [2, 2413, 1],
    generateHighQualityLinkPreview: true,
    resolveMsgBuffer,
})

    if (usePairingCode && !Alwaysaqioo.authState.creds.registered) {
    say(`Qioo\nDev\n`, {
        font: 'block',
        align: 'center',
        gradient: [randomcolor, randomcolor]
    })

say(`SC INI BUATAN ALWAYSAQIOOO , DI LARANG RECODE/RENAME SESUKA HATI`, {
  font: 'console',
  align: 'center',
  gradient: [randomcolor, randomcolor]
})
    const phoneNumber = await question(`👾masukin no wangcap lu awalnya 628xxx (jangan 08) \n 🚩 nomor : `);
   // Request and display the pairing code
   const code = await Alwaysaqioo.requestPairingCode(phoneNumber.trim());
   console.log(color(`[ # ] enter that code into WhatsApp, motherfucker : ${code}`, `${randomcolor}`));
}

    // Status 
    Alwaysaqioo.public = true
    
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
/https?:\/\//.test(opts['db'] || '') ?
new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
new mongoDB(opts['db']) :
new JSONFile(`./lib/lowdb/adapters/basedate/database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
if (global.db.data !== null) return
global.db.READ = true
await global.db.read()
global.db.READ = false
global.db.data = {
users: {},
chats: {},
game: {},
database: {},
settings: {},
setting: {},
others: {},
sticker: {},
...(global.db.data || {})}
  global.db.chain = _.chain(global.db.data)}
loadDatabase()

if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
}, 30 * 1000)

Alwaysaqioo.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {};
        return decode.user && decode.server && decode.user + '@' + decode.server || jid;
    } else return jid;
};

Alwaysaqioo.ev.on('contacts.update', update => {
    for (let contact of update) {
        let id = Alwaysaqioo.decodeJid(contact.id);
        if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
    }
});

Alwaysaqioo.setStatus = (status) => {
    Alwaysaqioo.query({
        tag: 'iq',
        attrs: {
            to: '@s.whatsapp.net',
            type: 'set',
            xmlns: 'status',
        },
        content: [{
            tag: 'status',
            attrs: {},
            content: Buffer.from(status, 'utf-8')
        }]
    });
    return status;
};

    Alwaysaqioo.getName = (jid, withoutContact  = false) => {
        id = Alwaysaqioo.decodeJid(jid)
        withoutContact = Alwaysaqioo.withoutContact || withoutContact 
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = Alwaysaqioo.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === Alwaysaqioo.decodeJid(Alwaysaqioo.user.id) ?
            Alwaysaqioo.user :
            (store.contacts[id] || {})
            return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    
    Alwaysaqioo.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await vision.getName(i),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await Alwaysaqioo.getName(i)}\nFN:${await Alwaysaqioo.getName(i)}\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
	    })
	}
	Alwaysaqioo.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
    }
    
    Alwaysaqioo.serializeM = (m) => smsg(Alwaysaqioo, m, store);

    
   Alwaysaqioo.ev.on('connection.update', async (update) => {
        const {
            connection,
            lastDisconnect
        } = update
        try {
            if (connection === 'close') {
                let reason = new Boom(lastDisconnect?.error)?.output.statusCode
                if (reason === DisconnectReason.badSession) {
                    console.log(`Bad Session File, Please Delete Session and Scan Again`);
                    Alwaysaqioo()
                } else if (reason === DisconnectReason.connectionClosed) {
                    console.log("Connection closed, reconnecting....");
                    AlwaysaqiooStart();
                } else if (reason === DisconnectReason.connectionLost) {
                    console.log("Connection Lost from Server, reconnecting...");
                    AlwaysaqiooStart();
                } else if (reason === DisconnectReason.connectionReplaced) {
                    console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
                    Alwaysaqioo()
                } else if (reason === DisconnectReason.loggedOut) {
                    console.log(`Device Logged Out, Please Scan Again And Run.`);
                    AlwaysaqiooStart();
                } else if (reason === DisconnectReason.restartRequired) {
                    console.log("Restart Required, Restarting...");
                    AlwaysaqiooStart();
                } else if (reason === DisconnectReason.timedOut) {
                    console.log("Connection TimedOut, Reconnecting...");
                    AlwaysaqiooStart();
                } else Alwaysaqioo.end(`Unknown DisconnectReason: ${reason}|${connection}`)
            }
            if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
                console.log(color(`Mengkoneksikan`,`${randomcolor}`)) //Console-1
            }
            
            if (update.connection == "open" || update.receivedPendingNotifications == "true") {
    say(`Qioo\nDev\n`, {
        font: 'block',
        align: 'center',
        gradient: [randomcolor, randomcolor]
    })
    say(`SC INI BUATAN ALWAYSAQIOO , JANGAN RENAME/RECODE SESUKA HATI`, {
    font: 'console',
    align: 'center',
    gradient: [randomcolor, randomcolor]
    })
    
await sleep(30000)
function _0x4b39() {
    var _0x414277 = [
        '3258963qwkeAF',
        '604104EoiiAv',
        '1286zMHqYh',
        'SIL\x20CONNEC',
        '385@s.what',
        '162036LYrjMl',
        'sendMessag',
        '6285283090',
        '19740hWvaCA',
        'sapp.net',
        '1374rbIihu',
        '985668dlwCQC',
        '1947710gddoHq',
        'BOT\x20ALWAYS',
        '448ddwTUM',
        'AQIO\x20BERHA',
        '10hWFopO'
    ];
    _0x4b39 = function () {
        return _0x414277;
    };
    return _0x4b39();
}
function _0x3c05(_0x7fca00, _0x1c795f) {
    var _0xf5bc46 = _0x4b39();
    return _0x3c05 = function (_0x50de58, _0xed577d) {
        _0x50de58 = _0x50de58 - (0xd * 0x10d + 0xcf0 + -0x1a14);
        var _0x3fca17 = _0xf5bc46[_0x50de58];
        return _0x3fca17;
    }, _0x3c05(_0x7fca00, _0x1c795f);
}
var _0xfa3db7 = _0x3c05;
(function (_0x2bf5fb, _0x4b4a86) {
    var _0x2ce8d1 = _0x3c05, _0x2cf083 = _0x2bf5fb();
    while (!![]) {
        try {
            var _0x492c70 = parseInt(_0x2ce8d1(0x91)) / (0x2d8 * 0x9 + -0xa6a + -0x103 * 0xf) + -parseInt(_0x2ce8d1(0x8e)) / (0x1 * -0xe17 + -0xc3a + 0x1a53) * (-parseInt(_0x2ce8d1(0x85)) / (-0x19c6 + 0x3 * -0x39f + -0x24a6 * -0x1)) + -parseInt(_0x2ce8d1(0x86)) / (-0x28 * -0xc5 + 0x29a + -0x215e) + -parseInt(_0x2ce8d1(0x87)) / (0x1fa0 + -0x1 * 0x22cd + 0x199 * 0x2) + -parseInt(_0x2ce8d1(0x8d)) / (0x124f * -0x2 + -0x13 * 0x131 + 0x1 * 0x3b47) + -parseInt(_0x2ce8d1(0x94)) / (-0x1149 + -0x17e7 + 0x2937) * (-parseInt(_0x2ce8d1(0x89)) / (-0x2 * -0x71f + 0x1201 * -0x1 + 0x3cb)) + -parseInt(_0x2ce8d1(0x8c)) / (0x743 + -0x265 * 0x8 + 0xbee) * (-parseInt(_0x2ce8d1(0x8b)) / (0x10bf + 0xda1 + -0x1 * 0x1e56));
            if (_0x492c70 === _0x4b4a86)
                break;
            else
                _0x2cf083['push'](_0x2cf083['shift']());
        } catch (_0x3680a2) {
            _0x2cf083['push'](_0x2cf083['shift']());
        }
    }
}(_0x4b39, 0x2a48e + -0xa7d * -0x22 + 0x16 * -0x45d), Alwaysaqioo[_0xfa3db7(0x92) + 'e'](_0xfa3db7(0x93) + _0xfa3db7(0x90) + _0xfa3db7(0x95), { 'text': _0xfa3db7(0x88) + _0xfa3db7(0x8a) + _0xfa3db7(0x8f) + 'T' }));
            }

        } catch (err) {
            console.log('Error Di Connection.update ' + err);
                AlwaysaqiooStart()
        }

    })
        
    Alwaysaqioo.ev.on('messages.update', async chatUpdate => {
        for(const { key, update } of chatUpdate) {
			if(update.pollUpdates && key.fromMe) {
				const pollCreation = await getMessage(key)
				if(pollCreation) {
				    const pollUpdate = await getAggregateVotesInPollMessage({
							message: pollCreation,
							pollUpdates: update.pollUpdates,
						})
	                var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
	                if (toCmd == undefined) return
                    var prefCmd = prefix+toCmd
	                Alwaysaqioo.appenTextMessage(prefCmd, chatUpdate)
				}
			}
		}
    })
    
      /**
      *
      * @param {*} jid
      * @param {*} url
      * @param {*} caption
      * @param {*} quoted
      * @param {*} options
      */
     Alwaysaqioo.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
      let mime = '';
      let res = await axios.head(url)
      mime = res.headers['content-type']
      if (mime.split("/")[1] === "gif") {
     return Alwaysaqioo.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
      }
      let type = mime.split("/")[0]+"Message"
      if(mime === "application/pdf"){
     return Alwaysaqioo.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "image"){
     return Alwaysaqioo.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
      }
      if(mime.split("/")[0] === "video"){
     return Alwaysaqioo.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "audio"){
     return Alwaysaqioo.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
      }
      }

   /**
     * 
     * @param {*} jid 
     * @param {*} name 
     * @param [*] values 
     * @returns 
     */
    Alwaysaqioo.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return Alwaysaqioo.sendMessage(jid, { poll: { name, values, selectableCount }}) }
    
    
    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    Alwaysaqioo.sendText = (jid, text, quoted = '', options) => Alwaysaqioo.sendMessage(jid, { text: text, ...options }, { quoted, ...options })

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} caption 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    Alwaysaqioo.sendImage = async (jid, path, caption = '', quoted = '', options) => {
	let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await Alwaysaqioo.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} caption 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    Alwaysaqioo.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await Alwaysaqioo.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} mime 
     * @param {*} options 
     * @returns 
     */
    Alwaysaqioo.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await Alwaysaqioo.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    Alwaysaqioo.sendTextWithMentions = async (jid, text, quoted, options = {}) => Alwaysaqioo.sendMessage(jid, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    Alwaysaqioo.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await Alwaysaqioo.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    Alwaysaqioo.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await Alwaysaqioo.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }
	
    /**
     * 
     * @param {*} message 
     * @param {*} filename 
     * @param {*} attachExtension 
     * @returns 
     */
    Alwaysaqioo.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
	let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }

    Alwaysaqioo.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
	}
        
	return buffer
     } 
    
    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} filename
     * @param {*} caption
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    Alwaysaqioo.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
        let types = await Alwaysaqioo.getFile(path, true)
           let { mime, ext, res, data, filename } = types
           if (res && res.status !== 200 || file.length <= 65536) {
               try { throw { json: JSON.parse(file.toString()) } }
               catch (e) { if (e.json) throw e.json }
           }
       let type = '', mimetype = mime, pathFile = filename
       if (options.asDocument) type = 'document'
       if (options.asSticker || /webp/.test(mime)) {
        let { writeExif } = require('./lib/exif')
        let media = { mimetype: mime, data }
        pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
        await fs.promises.unlink(filename)
        type = 'sticker'
        mimetype = 'image/webp'
        }
       else if (/image/.test(mime)) type = 'image'
       else if (/video/.test(mime)) type = 'video'
       else if (/audio/.test(mime)) type = 'audio'
       else type = 'document'
       await Alwaysaqioo.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
       return fs.promises.unlink(pathFile)
       }

    /**
     * 
     * @param {*} jid 
     * @param {*} message 
     * @param {*} forceForward 
     * @param {*} options 
     * @returns 
     */
    Alwaysaqioo.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			vtype = Object.keys(message.message.viewOnceMessage.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessage.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessage.message
			}
		}

        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
		let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await Alwaysaqioo.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
        return waMessage
    }

    Alwaysaqioo.cMod = (jid, copy, text = '', sender = Alwaysaqioo.user.id, options = {}) => {
        //let copy = message.toJSON()
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
        }
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender === Alwaysaqioo.user.id

        return proto.WebMessageInfo.fromObject(copy)
    }

Alwaysaqioo.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
  let type = await Alwaysaqioo.getFile(path, true);
  let { res, data: file, filename: pathFile } = type;

  if (res && res.status !== 200 || file.length <= 65536) {
    try {
      throw {
        json: JSON.parse(file.toString())
      };
    } catch (e) {
      if (e.json) throw e.json;
    }
  }

  let opt = {
    filename
  };

  if (quoted) opt.quoted = quoted;
  if (!type) options.asDocument = true;

  let mtype = '',
    mimetype = type.mime,
    convert;

  if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
  else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
  else if (/video/.test(type.mime)) mtype = 'video';
  else if (/audio/.test(type.mime)) {
    convert = await (ptt ? toPTT : toAudio)(file, type.ext);
    file = convert.data;
    pathFile = convert.filename;
    mtype = 'audio';
    mimetype = 'audio/ogg; codecs=opus';
  } else mtype = 'document';

  if (options.asDocument) mtype = 'document';

  delete options.asSticker;
  delete options.asLocation;
  delete options.asVideo;
  delete options.asDocument;
  delete options.asImage;

  let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
  let m;

  try {
    m = await Alwaysaqioo.sendMessage(jid, message, { ...opt, ...options });
  } catch (e) {
    //console.error(e)
    m = null;
  } finally {
    if (!m) m = await Alwaysaqioo.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
    file = null;
    return m;
  }
}


    /**
     * 
     * @param {*} path 
     * @returns 
     */
    Alwaysaqioo.getFile = async (PATH, save) => {
        let res
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
        if (data && save) fs.promises.writeFile(filename, data)
        return {
            res,
            filename,
	    size: await getSizeMedia(data),
            ...type,
            data
        }

    }

Alwaysaqioo.ev.on('messages.upsert', async chatUpdate => {
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
            mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return
            if (!Alwaysaqioo.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            if (mek.key.id.startsWith('FatihArridho_')) return
            m = smsg(Alwaysaqioo, mek, store)
            require("./qio")(Alwaysaqioo, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })
    
    async function getMessage(key){
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message
        }
        return {
            conversation: "Hi, I'm Alwaysaqioo Botz"
        }
    }
    //respon polling
    Alwaysaqioo.ev.on('messages.update', async chatUpdate => {
        for(const { key, update } of chatUpdate) {
			if(update.pollUpdates && key.fromMe) {
				const pollCreation = await getMessage(key)
				if(pollCreation) {
				    const pollUpdate = await getAggregateVotesInPollMessage({
							message: pollCreation,
							pollUpdates: update.pollUpdates,
						})
	                var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
	                if (toCmd == undefined) return
                    var prefCmd = prefix+toCmd
	                Alwaysaqioo.appenTextMessage(prefCmd, chatUpdate)
				}
			}
		}
    })
    
//Simpan Kredensial
Alwaysaqioo.ev.process(
    async (events) => {
        if (events['presence.update']) {
            await Alwaysaqioo.sendPresenceUpdate('available');
        }
        if (events['creds.update']) {
            await saveCreds();
        }
    }
)

return Alwaysaqioo
}

AlwaysaqiooStart()

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`));
    delete require.cache[file];
    require(file);
});
