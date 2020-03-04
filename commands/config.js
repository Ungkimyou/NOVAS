const db = require("quick.db")

exports.run = async (client, message, args) => {
let channel = await db.fetch(`Channel_${message.guild.id}`) || "None"
let role = await db.fetch(`Role_${message.guild.id}`) || "None"
let logs = await db.fetch(`Logs_${message.guild.id}`) || "None"
let bp = await db.fetch(`bypass_${message.guild.id}`) || "None"

  
message.channel.send({embed: {
  color: 0x0099ff,
  title: `**Current Config - ${message.guild.name}**`,
  fields: [{
    name: `__**User Role Name!**__`,
    value: "``!set userRoleName [ RoleName | None]``" + `
**➜ Current: ${role}**`
    
  }, {
    name: `__**Captcha Logs Channel [ Should only be viewable by Staff ]**__`,
    value: "``!set captchaLogsChannel [ Channel Name | none ]``" + `
**➜ Current: ${logs}** 
`
  }, {
    name: `__**Bypass Option!**__`,
    value: "``!set bypass [ true | false | None ]``" + ` 
**➜ Current: ${bp}**
`
  }],
  footer: {
    text: `Made by shawn hamby Verison 1.0.0`
  }
}})
  
}

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "config",
  category: "Miscelaneous",
  description: "Shows you the config of the server",
  usage: ""
};