//Define discord-js
const Discord = require('discord.js');

//Define moment
const moment = require("moment");

exports.run = async (client, message, args) => {
	let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    const member = message.guild.member(user);

    let status;
    let embcolor;
    if (user.presence.status === "online") {
        status = "En ligne"
        embcolor = "#43b581";
    } else {
        if (user.presence.status === "idle") {
            status = "AFK"
            embcolor = "#faa61a";
        } else {
            if (user.presence.status === "dnd") {
                status = "Ne pas déranger"
                embcolor = "#f04747";
            } else {
                if (user.presence.status === "offline") {
                    status = "Déconnecté / Invisible";
                    embcolor = "#747f8d";
                }
            }
        }
    }

    const useruser = `Requête de ${message.author.username}#${message.author.discriminator}`
    const userurl = message.author.avatarURL;
    const useravatar = user.avatarURL;

    moment.locale("fr");
    let compte_create_old = moment.utc(user.createdAt);
    var timezome = moment.duration(2, 'h');
    let compte_create = compte_create_old.add(timezome).format('DD/MM/YYYY HH:mm:ss')

    let serveur_create_old = moment.utc(user.joinedAt);
    let serveur_create = serveur_create_old.add(timezome).format('DD/MM/YYYY HH:mm:ss')


    const embed = new Discord.RichEmbed()
		.setColor(embcolor)
		.setAuthor(`Informations de ${user.username}#${user.discriminator}`, useravatar)
        .addField("ID:", `${user.id}`)
        .addField("Pseudo :", `${user.username}#${user.discriminator}`, true)
        .addField("Pseudo sur le serveur :", `${member.nickname !== null ? `${member.nickname}` : 'Aucun'}`, true)
        .addField('\u200B', '\u200B', true)
		.addField("Rejoint discord le :", `${compte_create}`, true)
        .addField("Serveur rejoint le :", `${serveur_create}`, true)
        .addField('\u200B', '\u200B', true)
        .addField("Status :", `${status}`, true)
		.addField("Jeux :", `${user.presence.game ? user.presence.game.name : 'Aucun'}`)
		.addField("Rôles :", member.roles.map(roles => `- ${roles.name}`).join('\n'))
		.setFooter(useruser, userurl)
     message.channel.send({embed});
    
}

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['info', 'information'],
    permLevel: 0
};
  
module.exports.help = {
    name: 'informations',
    description: 'Affiche les informations de toi / d\'une personne.',
    usage: 'informations [pseudo]',
};