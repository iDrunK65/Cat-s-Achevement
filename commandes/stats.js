const Discord = require("discord.js")
const config = require("../_config.json");
const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")
  
module.exports.run = async (bot, message, args) => {
    const useruser = `Requête de ${message.author.username}#${message.author.discriminator}`;
    const userurl = message.author.avatarURL;
    let boticon = bot.user.avatarURL;
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
    
    const duration = moment.duration(bot.uptime).format(" D [jours], H [heures], m [mins], s [secs]");
    const embedStats = new Discord.RichEmbed()
        .setAuthor("~ Information du bot ~", boticon)
        .setColor("RANDOM")
        .addField("• ID", bot.user.id, true)
        .addField("• Pseudo", bot.user.username, true)
        .addField("• Créateur", `iDrunK#4166`, true)
        .addField("• Serveurs", `${bot.guilds.size.toLocaleString()}`, true)
        .addField("• Channels ", `${bot.channels.size.toLocaleString()}`, true)
        .addField("• Utilisateurs", `${bot.users.size.toLocaleString()}`, true)
        .addField('\u200B', '\u200B')
        .addField("• Version du BOT", `${config.version}`, true)
        .addField("• Discord.js", `${version}`, true)
        .addField("• Node", `${process.version}`, true)
        .addField("• CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
        .addField("• Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
        .addField("• CPU usage", `\`${percent.toFixed(2)}%\``, true)
        .addField('\u200B', '\u200B', true)
        .addField("• Platforme", `\`\`${os.platform()}\`\``, true)
        .addField("• Arch", `\`${os.arch()}\``, true)
        .addField('\u200B', '\u200B', true)
        .addField("• Ping", `${Math.round(bot.ping)} ms`, true)
        .addField("• Uptime ", `${duration}`, true)
        .addField('\u200B', '\u200B', true)
        .setFooter(useruser, userurl)
        .setTimestamp()
    message.channel.send(embedStats)
    });
};

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 0
};
  
  
module.exports.help = {
    name: 'stats',
    description: 'Affiche toutes les informations du bot.',
    usage: 'stats',
};