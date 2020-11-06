const discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {
    if (!client.config.owners.includes(message.author.id)) return message.channel.send({embed: {color: "RED", description: "This is a dangerous command for you to use it."}});

    if(!args.length) {
        return message.channel.send("Please give status message")
      }
      
   db.set(`status`, args.join(" "))
   client.user.setActivity(args.join(" "));

   message.channel.send("Updated the bot status")
}

exports.help = {
    name: "status",
    description: "Change the bot status",
    usage: "status [status]",
    example: "status ?help"
}

exports.conf = {
    aliases: [],
    cooldown: 5
  }