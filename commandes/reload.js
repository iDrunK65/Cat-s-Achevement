const Discord = require("discord.js");

const config = require("../_config.json")

exports.run = (client, message, args) => {
    message.delete().catch(O_o=>{});
    if(message.author.id == config.authorid) {
        if(args[0] === "-help" || !args[0]){
            message.reply("ℹ Tu dois mettre le nom de la **commande**.js que tu veut rechargé ! ℹ"); 
        } else {
            const commandName = args[0];

            if(!client.commands.has(commandName)) {
                return message.reply(":x: Cette commande existe pas ! :x:");
            }

            delete require.cache[require.resolve(`./${commandName}.js`)];
        
            client.commands.delete(commandName);
            const props = require(`./${commandName}.js`);
            client.commands.set(commandName, props);

            message.reply(`✅ La commande ${commandName} a été rechargé !`);
            console.log(`[RELOAD] ${message.author.username}#${message.author.discriminator} à rechagé la commande ${commandName} !`);
        }
    } else {
        message.reply(":x: Tu peux pas faire ça seul **" + config.author + "** peut faire ça !")
    }
    
};

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 0
};

module.exports.help = {
    name: 'reload',
    description: 'Affiche toutes les informations du bot.',
    usage: 'reload',
};