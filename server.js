const Discord = require("discord.js")
const client = new Discord.Client()
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
require("./util/eventLoader")(client);

let settings = require('./config.json')

const db = require("quick.db");

const token = process.env.token

client.on("guildCreate", async () => {
  client.channels.get("679068374252257357").send({embed: {
    title: "Bot Joined",
    description: `I have been invited to a server i am in ${client.guilds.size}`,
    footer: {
      text: `Made by shawn hamby`
    }
  }}).then(() => {
 
  })
})

client.on("guildDelete", async () => {
    client.channels.get("679068374252257357").send({embed: {
    title: "Bot Left",
    description: `I have been in kicked or removed and now i am in ${client.guilds.size}`,
    footer: {
      text: `Made by shawn hamby`
    }
  }})
})

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`); 
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} Loading...`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loaded: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  
};
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

// client.on('debug', e => {
//  console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
//  });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on('message', async message => {
  
  if (message.content.startsWith('<@639646942451728412>')) {
  console.log('work')
  var db = require ('quick.db')
  
  var prefix = await db.fetch(`prefix_${message.guild.id}`) || '!'
  
return message.channel.send(`The prefix to this guild is **${prefix}**`)
  }
})


client.mongoose = require("./utils/mongoose.js");


client.mongoose.init();
client.login(settings.token);