const Discord = require('discord.js');
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
    const useruser = `Requête de ${message.author.username}#${message.author.discriminator}`;
    const userurl = message.author.avatarURL;
    let sicon = message.guild.iconURL;

    const embed = new Discord.RichEmbed()
		.setColor('#3333cc')
        .setAuthor('~ Informations du serveur ~', sicon)
        .addField('ID :', `${message.guild.id}`, true)
        .addField('Nom :', `${message.guild.name}`, true)
        .addField('Créé le :', moment(message.guild.createdAt).format("DD/MM/YYYY HH:mm:ss", true))
        .addField('Créatrice :', message.guild.owner.user.tag, true)
        .addField('Membres :', `${message.guild.memberCount}`, true)
        .addField('Derniers membres :', `${Array.from(message.channel.guild.members.values()).sort((a, b) => b.joinedAt - a.joinedAt).map(m => `<@!${m.id}>`).splice(0, 1)}`, true)
        .addField('Channel :', `**${message.guild.channels.filter(channel => channel.type === 'text').size}** text - **${message.guild.channels.filter(channel => channel.type === 'voice').size}** vocal`, true)
        .addField('Channel AFK :', `${message.guild.afkChannel}`, true)
        .addField('\u200B', '\u200B', true)
        .addField(`Roles :`, `${message.channel.guild.roles.size}`, false)
        .addField(`Emojies - **${message.channel.guild.emojis.size}** :`, `${message.guild.emojis.map(e => e).join(' ')}`, false)
		.setFooter(useruser, userurl)
     message.channel.send({embed})
    
}

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['serv'],
    permLevel: 0
};
  
module.exports.help = {
    name: 'serveur',
    description: 'Affiche les informations du serveu.',
    usage: 'serveur'
};