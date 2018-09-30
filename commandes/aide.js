const Discord = require("discord.js");
const fs = require("fs");
const config = require("../_config.json");


module.exports.run = (client, message, params) => {
  const useruser = `Requête de ${message.author.username}#${message.author.discriminator}`;
  const userurl = message.author.avatarURL;
  if (!params[0]) {
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

              message.channel.send(msg);

  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);

      const msg2 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setAuthor(`~ Aide > Commande > ${command.help.name} ~`)
      .setDescription(`**Description :** ${command.help.description}\n**Usage :** ${config.prefix}${command.help.usage}\n**Aliases :** ${command.conf.aliases}`)
      .setFooter(useruser, userurl)
      .setTimestamp()
  message.channel.send(msg2)
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