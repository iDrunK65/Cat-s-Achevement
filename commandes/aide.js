const Discord = require("discord.js");
const fs = require("fs");
const mysql = require("mysql");

const config = require("../_config.json");

module.exports.run = (client, message, params) => {
    var con = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    });
    
    con.connect(err => {
        if(err) console.log(err);
    });
    const useruser = `Requête de ${message.author.username}#${message.author.discriminator}`;
    const userurl = message.author.avatarURL;

    if (!params[0]) {
        let message_1 = `${message.author.tag} à fait la commande aide.`
        const commandNames = Array.from(client.commands.keys());
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    
        const msg = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setAuthor('~ Aide > Commande ~')
            .addField(':beginner:  Staff', `${config.prefix}tempmute\n${config.prefix}kick\n${config.prefix}tempban\n${config.prefix}ban\n${config.prefix}warn`, true )
            //.addField(':space_invader: Fun', `${config.prefix}`, true)
            .addField(':pager: Utilitaire',`${config.prefix}serveur\n${config.prefix}stats\n${config.prefix}aide\n${config.prefix}profile`, true)
            .addField(':gear: Commandes en DEV',`Aucune`, true)
            .setDescription(`Utilisez ${config.prefix}aide <commandes> pour plus d'informations !`)
            .setFooter(useruser, userurl)
            .setTimestamp()
        
        con.query(`INSERT INTO logs (type, username, user_id, message) VALUES ('CMD', '${message.author.tag}', '${message.author.id}', '${message_1}')`, function (err, result){
            message.delete().catch(O_o=>{});
            message.channel.send(msg)
            console.log(`[CMD] ` + message_1)
        })
        con.end()
    } else {
        let message_2 = `${message.author.tag} à fait la commande aide ` + params[0]
        let command = params[0];
        if (client.commands.has(command)) {
            command = client.commands.get(command);

            const msg2 = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setAuthor(`~ Aide > Commande > ${command.help.name} ~`)
                .setDescription(`**Description :** ${command.help.description}\n**Usage :** ${config.prefix}${command.help.usage}\n**Aliases :** ${command.conf.aliases}`)
                .setFooter(useruser, userurl)
                .setTimestamp()
            
            con.query(`INSERT INTO logs (type, username, user_id, message) VALUES ('CMD', '${message.author.tag}', '${message.author.id}', '${message_2}')`, function (err, result){
                message.delete().catch(O_o=>{});
                message.channel.send(msg2)
                console.log(`[CMD] ` + message_2)
            })
            con.end()
        } else {
            let msg3 = ":x: Cette commande existe pas !"
            let message_3 = `${message.author.tag} à fait la commande aide ` + params[0] + ` mais la commande n\'existe pas`
            con.query(`INSERT INTO logs (type, username, user_id, message) VALUES ('CMD', '${message.author.tag}', '${message.author.id}', '${message_2}')`, function (err, result){
                message.delete().catch(O_o=>{});
                message.channel.send(msg3)
                console.log(`[CMD] ` + message_3)
            })
            con.end()
        }  
}};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['help', 'h'],
  permLevel: 0
};

module.exports.help = {
  name: 'aide',
  description: 'Liste des commandes du bot !',
  usage: 'aide [commande]',
};
