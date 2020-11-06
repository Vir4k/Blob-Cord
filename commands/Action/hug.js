const Discord = require("discord.js");
const superagent = require("superagent");

exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  
  let mention;
  
  if (!message.mentions.users.first()) {
    mention = `${message.author.username} is hugging ${client.user.username}`;
  } else {
    mention = `${message.author.username} is hugging ${user.username}`;
  }
  
  const { body } = await superagent.get("https://nekos.life/api/v2/img/hug");
  
  const hug = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(mention, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 64 }))
  .setImage(body.url)
  return message.channel.send(hug);
}

exports.help = {
  name: "hug",
  description: "hug someone.",
  usage: ["hug", "hug <@user>"],
  example: ["hug", "hug @Virakie#5424"]
}

exports.conf = {
  aliases: [],
  cooldown: 3
}