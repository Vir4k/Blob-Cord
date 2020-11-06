const Discord = require("discord.js");
const canvacord = require("canvacord");

exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || message.author;
  
    let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
    let image = await canvacord.trigger(avatar);
    let attachment = new Discord.MessageAttachment(image, "triggered.gif");
    return message.channel.send(attachment);
}

exports.help = {
    name: "trigger",
    description: "trigger someone.",
    usage: ["trigger", "trigger <@user>"],
    example: ["trigger", "trigger @Virakie#5424"]
  }
  
  exports.conf = {
    aliases: ["triggered"],
    cooldown: 3
  }