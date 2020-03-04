// const mongoose = require("mongoose");

// const guildSchema = mongoose.Schema({
//  _id: mongoose.Schema.Types.ObjectId,
//   guildid: String,
//   guildname: String
// });

// module.exports = mongoose.model("guild", guildSchema);

const db = require('quick.db')
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
  
let channel = await db.fetch(`Channel_${message.guild.id}`) 
let role = await db.fetch(`Role_${message.guild.id}`) 
let logs = await db.fetch(`Logs_${message.guild.id}`)

// let good = new Discord.RichEmbed()
// good.setTitle(`**__Zerocord Verification System__**`)
// good.addField("Successful", "Channel is set up correctly")
// good.addField("Successful", "")
  
let embed = new Discord.RichEmbed()
embed.setTitle(`**__Improper Server Configurationm__**`)
embed.setDescription("Sorry, this server has not been fully setup by an administrator.")
embed.setFooter("Made by zerocord.inc")
  


// if (channel === null) {
//   embed.addField("ERROR", `- Set the verification channel (Waiting Room) [Use: !set]`)
//    return message.channel.send(embed)
// } 

  if (role === null) {
    embed.addField("ERROR",`- Set the user role name for the server (Given when they complete the Captcha) [Use: !set]`)
    return message.channel.send(embed)
  } else {
    message.channel.send({embed: {
      title: `${message.guild.name} - CheckList`,
      description: "Thank you for doing the checklist command we have found that you fully set up the command have a nice day"
}})
  }
}

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
};

exports.help = {
  name: "checklist",
  category: "",
  description: "",
  usage: ""
};

