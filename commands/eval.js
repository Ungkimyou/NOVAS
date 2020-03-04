const Discord = require('discord.js')
const { inspect } = require("util");
const db = require("quick.db");
const canvas = require("canvas-constructor")



exports.run = async (client, message, args) => {
  // let owner = ["663433648019734540", "632020134289997824"]
  
  if(message.author.id !== "632020134289997824") {
    let q = new Discord.RichEmbed()
    .setTitle("Only my developer can use this command")
    message.channel.send(q)
    return
  }
  
 
  
  const code = async () => {
  
  
    
  try {
            let toEval = args.join(" ")
        
   

            
        if (toEval.includes("client.token")) return message.channel.send('Fuck you I am not going to leak my token')
			let evaluated = await inspect(eval(toEval, { depth: 0 }))
            
            if (!toEval) {
                return message.channel.send(`Error while evaluating: \`air\``);
            } else {
                let hrStart = process.hrtime()
                let hrDiff;
                hrDiff = process.hrtime(hrStart);
              
              return message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*\n\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 })
              
            }
            
        } catch (e) {
            return message.channel.send(`Error while evaluating: \`${e.message}\``);
        }

  };
  code()

    
  
},
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    
  },
    exports.help = {
  name: 'eval',
	category: 'Miscelaneous',
	description: 'Eval command',
	usage: 'eval [code]'
  };