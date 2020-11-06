const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment");

exports.run = async (client, message, args) => {
  // If the database are empty, ignore it or return with error.
  let data = db.get("account");
  if (!data) return message.channel.send("Unknown generated data.");

  // Limit.
  var limit = 15; // 1 page with 15 users inside the leaderboard.
  // You can change it to 10 maybe, to decrease the embed.

  let lastpage = Math.ceil(Object.keys(data).length / limit);
  let page = parseInt(args[0]); // !lb 1
  if (!page) page = 1;
  if (page > lastpage) return message.channel.send(`Sorry, there is no **page ${page}**.`);

  let frompages = limit * (page - 1);
  let pageslimit = 15 * page;

  let list = Object.entries(data).sort((a, b) => b[1].xp - a[1].xp).slice(frompages, pageslimit);
  let arr = [];

  for (var i in list) {
    arr.push(`**${i * 1 + 1 + frompages}.** ${message.guild.members.cache.get(list[i][0]) ? message.guild.members.cache.get(list[i][0]).user.tag : "UnknownUser"} — XP: **${list[i][1].xp}** | Level: **${list[i][1].level}**`);
  };

  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`${message.guild.name} XP Leaderboard`, message.guild.iconURL({size: 2048, dynamic: true}))
  .setThumbnail(message.guild.iconURL({size: 4096, dynamic: true}))
  .setDescription(arr.join("\n"))
  .setFooter(`Page: ${page} / ${lastpage}`)
  return message.channel.send(embed);
}

exports.help = {
  name: "leaderboard",
  description: "Display a leveling leaderboard",
  usage: "leaderboard <page(s)>",
  example: "leaderboard 3"
};

exports.conf = {
  aliases: ["top", "lb"],
  cooldown: 7.5
}