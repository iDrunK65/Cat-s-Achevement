const Discord = require("discord.js");
const mysql = require("mysql");

const config = require("../_config.json");


module.exports.run = async (bot, message, args) => {
  let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    const member = message.guild.member(user);

    var con = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    });

    con.connect(err => {
        if(err) console.log(err);
    });
    con.query(`SELECT * FROM profile WHERE userid = ${user.id}`, function (err, result){
        if(result.length == 0) {
            message.channel.send(`:warning: L'utilisateur \`${user.username}\` est pas trouvé !`)
        } else {
            let curxp = result[0].xp;
            let curlvl = result[0].level;
            let nxtLvlXp = curlvl * 20;
            let difference = nxtLvlXp - curxp;
         
           const useruser = `Requête de ${message.author.username}#${message.author.discriminator}`
           const userurl = message.author.avatarURL;
           const useravatar = user.avatarURL;
         
           let lvlEmbed = new Discord.RichEmbed()
           .setAuthor(`~ Profile de ${user.username} ~`, useravatar)
           .setColor("PURPLE")
           .addField(`<:level:490176078489321474> Niveau`, curlvl, true)
           .addField(`<:XP:490176078921334784> XP`, curxp, true)
           .addField(`<:next_level:490176078745436181> Prochain niveau`, `**${difference}** XP restant`,true)
           .setFooter(useruser, userurl)
         
           message.channel.send(lvlEmbed);
        }
    })
    con.end()
    
    
}

module.exports.help = {
  name: "profile"
}