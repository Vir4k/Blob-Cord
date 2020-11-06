const Discord = require("discord.js");
const superagent = require("superagent");

exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  
  let mention;
  
  if (!message.mentions.users.first()) {
    mention = `${message.author.username} is slapping ${client.user.username}`;
  } else {
    mention = `${message.author.username} is slapping ${user.username}`;
  }
  
  const { body } = await superagent.get("https://nekos.life/api/v2/img/slap");
  
  const slap = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(mention, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 64 }))
  .setImage(body.url)
  return message.channel.send(slap);
}

exports.help = {
  name: "slap",
  description: "slap someone.",
  usage: ["slap", "slap <@user>"],
  example: ["slap", "slap @Virakie#5424"]
}

exports.conf = {
  aliases: [],
  cooldown: 3
}