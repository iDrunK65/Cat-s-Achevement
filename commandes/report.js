const Discord = require("discord.js");
const mysql = require("mysql");
const moment = require("moment");

const config = require("../_config.json");

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Impossible de trouver l'utilisateur.");
    let rreason = args.join(" ").slice(22);
    if(!rreason) return message.channel.send("Il faut un motif !");

    moment.locale("fr");
    let report_old_time = moment.utc(Date.now());
    var report_timezome = moment.duration(2, 'h');
    let report_time = report_old_time.add(report_timezome).format('DD/MM/YYYY HH:mm:ss')

    let reportEmbed = new Discord.RichEmbed()
    .setTitle("~ Signalement ~") 
    .setColor("#15f153")
    .addField("Joueur signalé", `${rUser}`,true)
    .addField("Signalé par", `${message.author}`, true)
    .addField("Signalé à", `${report_time}`)
    .addField("Channel du report", message.channel)
    .addField("Motif", rreason)
    .setTimestamp();

    let reportschannel = message.guild.channels.get(config.report_channel);
    if(!reportschannel) {
        return message.channel.send("Je ne trouve pas le channel de signalement !");
    } else {
        var con = mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database
        });
    
        con.connect(err => {
            if(err) console.log(err);
        });
        con.query(`INSERT INTO reports (reported, reported_id, reporter, reporter_id, channel, report_date, motif) VALUES ('${rUser.user.tag}', '${rUser.user.id}', '${message.author.tag}', '${message.author.id}', '${message.channel.name}', '${report_time}', '${rreason}')`, function (err, result){
            message.delete().catch(O_o=>{});
            reportschannel.send(reportEmbed);
            message.author.send(`Ton signalemment a bien été envoyé.\n Voici le message qui a été envoyé au staff :\n`)
            message.author.send(reportEmbed)
            console.log(`[STAFF] ${rUser.user.tag} a été signalé par ${message.author.tag} pour la raison suivante : ${rreason}.`)
        })
        con.end()
    }
}
 
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0
};

module.exports.help = {
  name: 'report',
  description: 'Permet de signaler une personne du discord.',
  usage: 'report @pseudo#xxxx motif',
};
