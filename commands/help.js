exports.run = async (client, message, args) => {
  
  message.channel.send({embed: {
    title: "**Information**",
    description: `Thank you for using **__Discaptcha__**!

This is a simple program that requires user to fill in a Captcha before automatically getting a pre-set role.`,
    
    fields: [{
      name : "➜ Getting Started",
      value: "Run ``!checklist`` to view the remaining actions needed to setup the bot. You can also use ``!config`` to view and update the current configuration."
    }, {
      name: "➜ Why is this useful?",
      value: "This helps to protect your server against spammers and bots only bot you give role to."
    }, {
      name: "➜ What if a user is already in the server?",
      value: "Users can run the command ``!verify`` to get a Captcha sent to them, it will also add the pre-set role when they complete it."
    }, {
      name: "➜ you can suggest things to add",
      value: "do !suggestion <Your suggestion to add>"
    }, {
      name: "**Links**",
      value: "[Invite](https://discordapp.com/api/oauth2/authorize?client_id=639646942451728412&permissions=8&scope=bot)"
    }]
  }})
  
}

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
};

exports.help = {
  name: "help",
  category: "",
  description: "",
  usage: ""
};