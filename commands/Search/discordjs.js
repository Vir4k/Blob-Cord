const Discord = require("discord.js")
const fetch = require("node-fetch")

exports.run = async(client, message, args) => {
const url = `https://djsdocs.sorta.moe/v2/embed?src=${args[1] || "stable"}&q`;

  let query = args[0];
let response = await fetch(`${url}=${query}`);
let json = await response.json();
if (json == null) return message.reply("No results found!");
return message.channel.send({ embed: json })
}

exports.help = {
    name: "discordjs",
    description: "Discord.js docs",
    usage: ["discordjs <text>"],
    example: ["discordjs <embed>"]
  }
  
  exports.conf = {
    aliases: ["djs"],
    cooldown: 10
  }