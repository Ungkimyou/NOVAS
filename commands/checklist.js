const db = require('quick.db')
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
  
let channel = await db.fetch(`Channel_${message.guild.id}`) 
let role = await db.fetch(`Role_${message.guild.id}`) 
let logs = await db.fetch(`Logs_${message.guild.id}`)


let embed = new Discord.RichEmbed()
embed.setTitle(`**__Improper Server Configurationm__**`)
embed.setDescription("Sorry, this server has not been fully setup by an administrator.")
embed.setFooter("Made by shawn hamby")

  if (role === null) {
    embed.addField("ERROR",`- Set the user role name for the server (Given when they complete the Captcha) [Use: !set]`)
    return message.channel.send(embed)
  } 
  
  let checklist = new Discord.RichEmbed()
  .setTitle("CheckList")
  .setDescription("The checklist is good you can now set up the logs channel to use bot")
  
  if (role === role) {
    message.edit(checklist)
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
