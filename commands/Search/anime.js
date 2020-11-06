const Discord = require("discord.js");
const Kitsu = require("kitsu.js");
const kitsu = new Kitsu();

exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.send(`**${message.author.username}**, enter the name of anime you are looking for!`);
  
  const search = args.join(" ");
  
  kitsu.searchAnime(search).then(async result => {
    const anime = result[0];
    
    if (result.length === 0) return message.channel.send(`**${message.author.username}**, there is no result called **${search}**.`);
    
    const info = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("Kitsu", "https://kitsu.io/favicon-194x194-2f4dbec5ffe82b8f61a3c6d28a77bc6e.png")
    .setTitle(`**${anime.titles.romaji ? anime.titles.romaji : "Unknown"}**`)
    .setURL(anime.url)
    .setDescription(`**Synopsis:**\n> ${anime.synopsis.replace(/<[^>]*>/g, "").split("\n")[0]}`)
    .setThumbnail(anime.posterImage.original)
    .addField("**Japanese:**", `${anime.titles.japanese ? anime.titles.japanese : "Unknown"}`, true)
    .addField("**English:**", `${anime.titles.english ? anime.titles.english : "Unknown"}`, true)
    .addField("**Rating:**", `${anime.averageRating ? anime.averageRating : "Unknown"}`, true)
    .addField("**Start Date:**", `${anime.startDate ? anime.startDate : "Unknown"}`, true)
    .addField("**End Date:**", `${anime.endDate ? anime.endDate : "Unknown"}`, true)
    .addField("**Type:**", `${anime.showType ? anime.showType : "Unknown"}`, true)
    .addField("**Episodes:**", `${anime.episodeCount ? anime.episodeCount : "Unknown"}`, true)
    .addField("**Duration:**", `${anime.episodeLength ? anime.episodeLength : "??"} minutes`, true)
    .addField("**Rank:**", `${anime.ratingRank ? anime.ratingRank : "Unknwon"}`, true)
    .setTimestamp(new Date)
    .setFooter(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 64 }));
    return message.channel.send(info);
  })
}

exports.help = {
  name: "anime",
  description: "Show anime information.",
  usage: ["anime <title>"],
  example: ["anime <Fairy Tail>"]
}

exports.conf = {
  aliases: [],
  cooldown: 10
}