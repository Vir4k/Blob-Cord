const Discord = require("discord.js");
const canvacord = require("canvacord");

exports.run = async (client, message, args) => {
    let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
    let image = await canvacord.wanted(avatar);
    let attachment = new Discord.MessageAttachment(image, "wanted.png");
    return message.channel.send(attachment);
}

exports.help = {
    name: "wanted",
    description: "Search him and get the money",
    usage: ["wanted", "wanted <@user>"],
    example: ["wanted", "wanted @Virakie#5424"]
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 3
  }