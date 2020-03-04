const Discord = require("discord.js");
const mongoose = require("mongoose");
const { URL } = require ('../config.json')
mongoose.connect(URL, { useNewUrlParser: true });
const Verify = require ('../databases/verify')
const db = require ('quick.db')

exports.run = async (client, message, args) => {
  
  let bypass = await db.fetch(`bypass_${message.guild.id}`)
  
  if (bypass !== "true") return message.channel.send("Bypass option has been disabled")
  
   if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
     return message.channel.send("I need **__MANAGE_ROLES__** permission to add role")
   }
  
  let role = await db.fetch(`Role_${message.guild.id}`);

  Verify.findOne({ username: message.author.username, userid: message.author.id}, (err, code) => {
if (err) console.log(err)
    if (!code) {
    return  message.channel.send("You were not found on the database if you were verified with the bot contact the owner shawnhamby#0001")
    } else {
    
//       let loading = new Discord.RichEmbed()
//         .setTitle("Loading")
//           .setDescription("<a:8299_Loading:669282799597125652> Loading Data and add Role")
      
//       message.channel.send(loading)

       if (role === null) {
         let error = Discord.RichEmbed()
           .setTitle("Error")
              .setDescription("The role is not set")
         message.edit(error) 
         return
       }
     let role1 = message.guild.roles.find(r => r.name === `${role}`);
    message.member.addRole(role1).catch(console.error);
      
      
      // message.author.send()
      
      let embed = new Discord.RichEmbed()
        .setTitle("Bypass Command")
          .setDescription("I have successfuly gave you the role")
      message.author.send(embed)
      
//        message.edit(embed)
      
    }
    
  })
  
}

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "bypass",
  category: "Miscelaneous",
  description: "Shows you the config of the server",
  usage: ""
};