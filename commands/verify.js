const Discord = require("discord.js");
const mongoose = require("mongoose");
const { URL } = require("../config.json");
mongoose.connect(URL, { useNewUrlParser: true });
const Verify = require("../databases/verify");

exports.run = async (client, message, args) => {
  if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
    return message.channel.send(
      "I need **__MANAGE_ROLES__** permission to add role"
    );
  }

  const { Canvas } = require("canvas-constructor");
  const fetch = require("node-fetch");
  const db = require("quick.db");
  let role = await db.fetch(`Role_${message.guild.id}`);
  let logs = (await db.fetch(`Logs_${message.guild.id}`)) || "None";
  let Logs = message.guild.channels.find(`name`, `${logs}`);

  let channel = await db.fetch(`Channel_${message.guild.id}`);
  let verify = message.guild.channels.find(`name`, `${channel}`);

  message.delete();

  if (role === null) {
    return message.channel.send({
      embed: {
        description: "You did not fully set up the role"
      }
    });
  }

  let role2 = message.guild.roles.find(r => r.name === `${role}`);

  if (message.member.roles.has(role2)) {
    return Logs.send({
      embed: {
        title: "Verified",
        description: `${message.author.username} already have the role`
      }
    });
  }

  if (!Logs) {
    return message.channel.send({
      embed: {
        description: "I can not find logs channel"
      }
    });
  }

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  let random = makeid(5);
  db.set(`code_${message.author.id}`, random);
  let code = await db.fetch(`code_${message.author.id}`);

  let overlayl = await fetch(
    "https://cdn.discordapp.com/attachments/638077889023049735/678960671152668682/captcha.png"
  );
  let overlay = await overlayl.buffer();
  let bgl = fetch(
    "https://cdn.glitch.com/be628e00-f875-48a2-ba67-489bd2bf0013%2Fbg6.png?v=1583299246322"
  );
  let bg = await bgl.buffer();

  let embed = new Discord.RichEmbed()
    .setTitle("Verification")
    .setDescription(
      `**CHOOSE A THE RIGHT OPTION**\n(1). ${makeid(5)} \n (2). ${makeid(
        5
      )} \n (3). ${code}`
    )
    .setColor("blue");
  message.channel
    .send(
      `**CHOOSE A THE RIGHT OPTION**\n (1). ${makeid(5)} \n (2). ${makeid(
        5
      )} \n (3). ${code}\nYou have only one min to react`,

      new Discord.Attachment(
        new Canvas(400, 200)
          .setColor("WHITE")
          .addBeveledRect(0, 0, 400, 200, 30)
          .addbeveledImage(bg, 0, 0, 400, 200, 30)
          .setTextFont("80px sans-serif")
          .setStroke("GREY")
          .setLineWidth("9")
          .addStrokeText(random, 80, 100)
          .addImage(overlay, 0, 0)
          .toBuffer(),
        "randomCatptcha.png"
      )
    )
    .then(msg => {
      msg
        .react("1️⃣")
        .then(() => msg.react("2️⃣"))
        .then(() => msg.react("3️⃣"));

      const filter = (reaction, user) => {
        return (
          ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name) &&
          user.id === message.author.id
        );
      };

      msg
        .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
        .then(collected => {
          const reaction = collected.first();

          if (reaction.emoji.name === "1️⃣") {
            msg.edit("failed to verify").then(msg => {
              msg.delete(10000);
            });
            msg.clearReactions();
          } else if (reaction.emoji.name === "2️⃣") {
            msg.edit("failed to verify").then(msg => {
              msg.delete(10000);
            });
            msg.clearReactions();
          } else if (reaction.emoji.name === "3️⃣") {
            msg.edit("you have successfully verified yourself").then(msg => {
              msg.delete(10000);
            });
            let role1 = message.guild.roles.find(r => r.name === `${role}`);
            message.member.addRole(role1).catch(console.error);

            message.author.send({
              embed: {
                title: "Thank You!",
                description:
                  "Thank you for useing Discaptcha discord bot you been granted access to the server"
              }
            });

            const verifyed = new Verify({
              _id: mongoose.Types.ObjectId(),
              username: message.author.username,
              userid: message.author.id,
              code: code,
              guildid: message.guild.id,
              guildname: message.guild.name
            });

            verifyed.save().catch(err => console.log(err));

            msg.clearReactions();
          }
        })
        .catch(collected => {
          message.reply("You need to react to verify");
        });
    });
  Logs.send({
    embed: {
      title: `**Code given - ${message.author.username}**`,
      fields: [
        {
          name: "Code",
          value: `${code}`,
          inline: true
        }
      ]
    }
  });
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: "verify",
  category: "",
  description: "",
  usage: ""
};
