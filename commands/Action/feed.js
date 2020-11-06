const Discord = require("discord.js");
const superagent = require("superagent");

exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  
  let mention;
  
  if (!message.mentions.users.first()) {
    mention = `${message.author.username} is feeding ${client.user.username}`;
  } else {
    mention = `${message.author.username} is feeding ${user.username}`;
  }
  
  const { body } = await superagent.get("https://nekos.life/api/v2/img/feed");
  
  const feed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(mention, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 64 }))
  .setImage(body.url)
  return message.channel.send(feed);
}

exports.help = {
  name: "feed",
  description: "Feed someone.",
  usage: ["feed", "feed <@user>"],
  example: ["feed", "feed @Virakie#5424"]
}

exports.conf = {
  aliases: [],
  cooldown: 3
}