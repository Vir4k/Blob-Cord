const Discord = require("discord.js");
const canvacord = require("canvacord");

exports.run = async (client, message, args) => {
    let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
    let image = await canvacord.deleted(avatar);
    let attachment = new Discord.MessageAttachment(image, "deleted.png");
    return message.channel.send(attachment);
}

exports.help = {
    name: "delete",
    description: "delete someone.",
    usage: ["delete", "delete <@user>"],
    example: ["delete", "delete @Virakie#5424"]
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 3
  }