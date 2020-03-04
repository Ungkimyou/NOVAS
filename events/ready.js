const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const settings = require('../config.json');
const db = require("quick.db")



var prefix = settings.prefix;

module.exports = client => {
  var game = [
        "Made by shawn hamby",
        
    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(game.length-0+1)+0);

        client.user.setActivity(game[random], "Shawn" );
        }, 2 * 25000);
    
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Active, Commands loaded!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} Login with the name!`);
  client.user.setStatus("online");
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Game name set!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Now with ` + client.channels.size + ` channels, ` + client.guilds.size + ` servers and ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` Users!`);
};

