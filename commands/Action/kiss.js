const Discord = require("discord.js");
const superagent = require("superagent");

exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  
  let mention;
  
  if (!message.mentions.users.first()) {
    mention = `${message.author.username} is kissing ${client.user.username}`;
  } else {
    mention = `${message.author.username} is kissing ${user.username}`;
  }
  
  const { body } = await superagent.get("https://nekos.life/api/v2/img/kiss");
  
  const kiss = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(mention, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 64 }))
  .setImage(body.url)
  return message.channel.send(kiss);
}

exports.help = {
  name: "kiss",
  description: "kiss someone.",
  usage: ["kiss", "kiss <@user>"],
  example: ["kiss", "kiss @Virakie#5424"]
}

exports.conf = {
  aliases: [],
  cooldown: 3
}