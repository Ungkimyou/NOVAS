const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message) => {
  
  
  const duration = moment.duration(client.uptime).format(" D [day], H [hours], m [minute], s [second]");
  let embed = new Discord.RichEmbed()
  .setTitle('Discaptcha Stats')
  .addField('Ram Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
  .addField('Uptime', `${duration}`, true)
  .addField('Users', `${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
  .addField('Servers', `${client.guilds.size.toLocaleString()}`, true)
  .addField('Channels', `${client.channels.size.toLocaleString()}`, true)

const msg = await message.channel.send(embed);
  
  let newembed = new Discord.RichEmbed()
  .setTitle('Discaptcha Stats')
  .addField('Ram Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
  .addField('Uptime', `${duration}`, true)
  .addField('Users', `${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
  .addField('Servers', `${client.guilds.size.toLocaleString()}`, true)
  .addField('Channels', `${client.channels.size.toLocaleString()}`, true)
  .addField("Latency", `${msg.createdTimestamp - message.createdTimestamp}ms`, true)
  .addField("API Latency", `${Math.round(client.ping)}ms`, true)
  
  msg.edit(newembed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["botinfo","stats"],
 
};
exports.help = {
  name: 'stats',
  description: 'Shows the stats of the bot',
  usage: 'stats'
};  