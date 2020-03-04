let db = require("quick.db");
const Discord = require("discord.js");
const config = require("../config.json");

exports.run = async (client, message, args) => {
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
  db.set(`suggestcode_${message.author.id}`, random);

  let Invite = await message.guild.channels
    .find(c => c.type === "text")
    .createInvite();
  let Sender = message.author;
  const sayMessage = args.join(" ");
  if (!sayMessage)
    return message.channel
      .send("Please give a suggestion")
      .then(msg => {
        msg.delete(5000);
      });

  let contact = new Discord.RichEmbed()
    .setColor("00ff00")
    .setThumbnail(Sender.displayAvatarURL)
    .setDescription(
      `Contact message from [${message.guild.name}](${Invite.url})`
    )
    .setTitle("Message from sugggestion command")
    .addField("User", Sender, true)
    .addField("User ID: ", Sender.id, true)
    .addField("Message: ", sayMessage)
    .setTimestamp();

  client.users.get("632020134289997824").send(contact);

  let embed = new Discord.RichEmbed()
    .setColor("#00ff00")
    .setTitle("Message Sent!")
    .setDescription("Your suggestion message has been sent!")
    .addField("Reqested by ", Sender)
    .addField("Message: ", sayMessage)
    .setFooter("Thanks you for giving us a suggestion to add for `Discaptcha`");

  message.channel.send(embed)//.then(msg => {
    // msg.delete(10000);
//  });

  // let code = await db.fetch(`suggestcode_${message.author.id}`)

  //   const suggestion = new Suggestion({
  //     _id: mongoose.Types.ObjectId(),
  //     username: message.author.username,
  //     userid: message.author.id,
  //     suggstion: sayMessage,
  //     code: code
  //   });

  //   suggestion.save()
  //   // .then(result => console.log(result))
  //   .catch(err => console.log(err));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: "suggestion",
  category: "",
  description: "",
  usage: ""
};
