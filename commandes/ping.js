const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const useruser = `Requête de ${message.author.username}#${message.author.discriminator}`
    const userurl = message.author.avatarURL;
    let botembed = new Discord.RichEmbed()
        .setColor("#000FF")
        .setDescription(`Chargement ...`)
        .setTimestamp()
    message.channel.send(botembed).then(message =>{
        botembed.setColor("#000FF")
        botembed.setDescription(`:ping_pong: Pong ! **\`${bot.pings[0]}ms\`**`)
        botembed.setFooter(useruser, userurl)
        botembed.setTimestamp()
        message.edit(botembed)
    })

}

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [''],
    permLevel: 0
};
  
module.exports.help = {
    name: 'ping',
    description: 'Affiche le ping du bot.',
    usage: 'ping [pseudo]',
};