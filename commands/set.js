let db = require('quick.db')

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("KICK_MEMBERS")) {
     message.channel.send(`${message.author.username} you need **__MANAGE_SERVER__** Permission to use set commands`)
    return
  }
  
  switch(args[0]) {
    case 'verificationChannel' :
      
      var Channel = args.splice(1).join(' ');
      
      if (!Channel) {
        return message.channel.send("Please type a channel name")
      }
      
      // if (Channel) {
        db.set(`Channel_${message.guild.id}`, Channel)
      
      let channel = await db.fetch(`Channel_${message.guild.id}`)
        message.channel.send({embed: {
          title: "Sucessfully",
          description: `I have successfully set the verification channel to __**${channel}**__`,
          // color: "RANDOM"
        }})
      // } 
      
      break;
      
    case 'userRoleName' :
      
      var RoleName = args.splice(1).join(' ');
      
      if (!RoleName) {
         return message.channel.send("Please type a role name")
      }
      
      db.set(`Role_${message.guild.id}`, RoleName)
      
      let role = await db.fetch(`Role_${message.guild.id}`)
      
      message.channel.send({embed: {
        title: "Successfully",
        description: `I have successfully set the verification role to __**${role}**__`,
        // color: "RANDOM"
      }})
      
      break;
      
    case 'captchaLogsChannel' : 
      var LogsName = args.splice(1).join(' ');
      
      if (!LogsName) {
        return message.channel.send('Please type a logs channel name')
      }
      
      db.set(`Logs_${message.guild.id}`, LogsName)
      
      let logs = await db.fetch(`Logs_${message.guild.id}`)
      
      message.channel.send({embed: {
        title: "Successfully",
        description: `I have successfully set the verification channel to __**${logs}**__`
        // color: "RANDOM"
      }})
      
      break;
      
    case 'welcomeEnabled' :
      
       var welcomeEnabled = args.splice(1).join(' ');
      
      if (!welcomeEnabled) {
        return message.channel.send("Plase type yes or no if you do not it will cause a error")
      } 
      
      break;
      
    case 'bypass': 
      
      var bypass = args.splice(1).join(' ') 
      
      db.set(`bypass_${message.guild.id}`, bypass)
      
      let bpass = await db.fetch(`bypass_${message.guild.id}`)
      
      message.channel.send({embed: {
      title: "Successfully",
      description: `I have successfully set the bypass option to **__${bpass}__**`
      }})
      
      break;
      
//     case 'prefix' : 
//      var fs = require ('fs')
//      var Discord = require('discord.js')
//       let prefix = await db.fetch(`prefix_${message.guild.id}`)
//   if (!args[1] || args[1 == "help"]) return message.channel.send(`Usage ${prefix}prefix [prefix]`);
  
//   let prefixes = JSON.parse(fs.readFileSync("./prefix.json", "utf8"));
  
//   prefixes[message.guild.id] = {
//     prefixes: args[1]
//   }
  
//   fs.writeFile("./prefix.json", JSON.stringify(prefixes), (err) => {
//     if (err) console.log(err)
//   });
  
//   let embed = new Discord.RichEmbed()
//     .setColor("#fffff")
//   .setTitle("Prefix Set")
//     .setDescription(`Prefix has been set to ${args[1]}`)
  
//   message.channel.send(embed)
//   db.set(`prefix_${message.guild.id}`, args[1])
  
//       break;
  }
  
}

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
};

exports.help = {
  name: "set",
  category: "",
  description: "",
  usage: ""
};