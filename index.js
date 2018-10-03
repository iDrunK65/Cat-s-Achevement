const Discord = require("discord.js");
const mysql = require("mysql");
const fs = require("fs");

const config = require("./_config.json");
const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();

fs.readdir("./commandes/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  console.log(`========== Commandes activé ==========`)
  if(jsfile.length <= 0){
    console.log("Aucune commende trouvé !");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commandes/${f}`);
    console.log(`[CMD] ${f}`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`============ Informations ============`)
  console.log(`Pseudo du BOT   => ${bot.user.tag}`)
  console.log(`Prefix actuelle => ` + config.prefix);
  console.log(`Auteur          => ${config.author}`);
  console.log(`Version         => ${config.version}`);
  console.log(``);
  console.log(`Utilisateurs    => ${bot.users.size}`);
  console.log(`Channels        => ${bot.channels.size}`);
  console.log(`Serveurs        => ${bot.guilds.size}`);
  console.log(`============ Informations ============`);

  bot.user.setStatus("online");
  bot.user.setActivity(config.prefix + `profile | ` + config.prefix +`aide`);
  console.log(``)
  console.log(`        Démarage du bot terminé       `);
  console.log(``)
  console.log(`=========== Début des logs ===========`);
  console.log(``)
});

bot.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`[INFO] Le bot a été ajouté sur un serveur ! => ${guild.name} (id: ${guild.id}). + ${guild.memberCount} membres`);
  bot.user.setActivity(config.prefixes + `profile | ` + config.prefix +`aide`);
});

bot.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`[INFO] Le bot a été retiré d'un serveur ! => ${guild.name} (id: ${guild.id}). - ${guild.memberCount} membres`);
  bot.user.setActivity(config.prefix + `profile | ` + config.prefix +`aide`);
});

var con = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});
con.connect(err => {
    if(err) console.log(err);
    console.log("[CORE] DataBase connecté !");
});


bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;


    con.query(`SELECT * FROM profile WHERE userid = ${message.author.id}`, function (err, result){
        if(!result[0]) {
            con.query(`INSERT INTO profile (userid, username, xp_cooldown) VALUES ('${message.author.id}', '${message.author.tag}', '${Date.now()}')`, function (err, result) {
                if(!err) {
                    let message_1 = `${message.author.tag} à été ajouté au profile.`
                    con.query(`INSERT INTO logs (type, username, user_id, message) VALUES ('DB', '${message.author.tag}', '${message.author.id}', '${message_1}')`, function (err, result){
                        console.log(`[DB] ` + message_1)
                    })
                } else {
                    console.log(err)
                }
            });
        } else {
            if((Number(result[0].xp_cooldown) + 30000) > Number(Date.now())) {
                return;
            } else {
                let xpAdd = Math.floor(Math.random() * 7);
                let newexp = result[0].xp + xpAdd;
                con.query(`UPDATE profile SET xp = '${newexp}', username = '${message.author.tag}', xp_cooldown = '${Date.now()}' WHERE userid = ${message.author.id}`, function (err, result) { 
                    if(!err) {
                        let message_2 = `${message.author.tag} a reçu ` + xpAdd + ` exp`
                        con.query(`INSERT INTO logs (type, username, user_id, message) VALUES ('EXP', '${message.author.tag}', '${message.author.id}', '${message_2}')`, function (err, result){
                            console.log(`[EXP] ` + message_2)
                        })
                    } else {
                        console.log(err)
                    }
                });

                let curxp = result[0].xp;
                let curlvl = result[0].level;
                let nxtLvl = result[0].level * 20;
                
                result[0].xp =  curxp + xpAdd;
                if(result[0].xp >= nxtLvl){
                    let newlevel = curlvl + 1;
                    
                    con.query(`UPDATE profile SET xp = '0', level = '${newlevel}' WHERE userid = ${message.author.id}`, function (err, result) {
                        if(!err) {
                            let message_3 = `${message.author.tag} est passé au niveau ${newlevel}`
                            con.query(`INSERT INTO logs (type, username, user_id, message) VALUES ('LEVEL', '${message.author.tag}', '${message.author.id}', '${message_3}')`, function (err, result){
                                console.log(`[LEVEL] ` + message_3)
                            })
                        } else {
                            console.log(err)
                        }
                    });

                    if(result[0].level === 666) {
                        message.channel.send(`GG ${message.author} ! Tu es passée au niveau **itanimullI 6̝͍̽͗̄̓̚͜6̡͓̼̻͇̼̠͙ͥ6̡̟͒̈ͪ͝** !`).then(msg => {msg.delete(10000)});;
                    } else {
                        message.channel.send(`GG ${message.author} ! Tu es passée au niveau **${newlevel}** !`).then(msg => {msg.delete(10000)});;
                    }
                }
            }
        }
    });

    let prefix = config.prefix;
    if (!message.content.startsWith(config.prefix)) return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

});

if(config.beta == "oui") {
    bot.login(config.token_beta);
} else {
    bot.login(config.token_officiel);
}
