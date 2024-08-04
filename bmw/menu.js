const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", categorie: "💎General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    var emoji = { "General": "🌐", "Logo": "🎨", "Hentai": "🔥", "Weeb": "🌸", "Recherche": "🔍", "Conversion": "🌟", "Groupe": "♻️", "Autre": "🪖" };

    
 cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('EAT');

// Créer une date et une heure en EAT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭──❂✞ঔৣ۝𝗡𝗬𝗔𝗠𝗦 𝗠𝗗 𝗕𝗢𝗧۝ঔৣ✞❂───❂
┊ ╭────────────────❂
┊ ┊ 🤖𝗕𝗼𝘁 𝗢𝘄𝗻𝗲𝗿: ${s.OWNER_NAME}
┊ ┊ ⚙️𝗺𝗼𝗱𝗲 : ${mode}
┊ ┊ 🗽𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 : ${cm.length}
┊ ┊ 🎩🪄𝗥𝗔𝗠 : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┊ ┊ 🕋𝗗𝗔𝗧𝗘 𝗧𝗢𝗗𝗔𝗬: : ${moment.tz('Africa/Nairobi').format('DD/MM/YYYY')}
┊ ┊ 🌍𝘄𝗮.𝗺𝗲: https://wa.link/c4uobu
┊ ┊ 
┊ ╰─────────────────❂
╰───────────────────❂ \n
✞ঔৣ۝𝗡𝗬𝗔𝗠𝗦 𝗞𝗘𝗜𝗟𝗔𝗕۝ঔৣ✞ \n`;
 
    let menuMsg=`  
`;

    for (const cat in coms) {
        menuMsg += `*╭────❂* *${cat}* *───❂*`;
        for (const cmd of coms[cat]) {
            menuMsg += `  
*┊⦿┊*  .${cmd}`;
        }
        menuMsg += `
*╰═════════════❂* \n`
    }

    menuMsg += `           
*—————✺✺✺✺—————*
*✞ঔৣ۝𝗡𝗬𝗔𝗠𝗦 𝗞𝗘𝗜𝗟𝗔𝗕۝ঔৣ✞                                     

`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "developed by nyams" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🌍🌍 Menu erreur " + e);
        repondre("🌍🌍 Menu erreur " + e);
    }
}   
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "*NYAMS MD BOT*" }, { quoted: ms });
    }
    catch (e) {
        console.log("🌍🌍 Menu erreur " + e);
        repondre("🌍🌍 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});