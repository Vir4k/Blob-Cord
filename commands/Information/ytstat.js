const fetch = require("node-superfetch");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    let name = args.join(" ");
    if (!name) return message.channel.send("Unknown channel name.");

    const channel = await fetch.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=${client.config.google}&maxResults=1&type=channel`)
    .catch(() => message.channel.send("Unknown channel error."));

    if (!channel.body.items[0]) return message.channel.send("No channel result. Try again.");

    const data = await fetch.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=${client.config.google}`)
    .catch(() => message.channel.send("Unknown channel data error."));

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(channel.body.items[0].snippet.thumbnails.high.url)
    .setTimestamp(new Date())
    .addField("Channel Name", channel.body.items[0].snippet.channelTitle, true)
    .addField("Channel Description", channel.body.items[0].snippet.description, true)
    .addField("Subscribers Count", parseInt(data.body.items[0].statistics.subscriberCount).toLocaleString(), true)
    .addField("Total Views", parseInt(data.body.items[0].statistics.viewCount).toLocaleString(), true)
    .addField("Total Video(s)", parseInt(data.body.items[0].statistics.videoCount).toLocaleString(), true)
    .addField("Date Created", new Date(channel.body.items[0].snippet.publishedAt).toDateString(), true)
    .addField("Link", `[${channel.body.items[0].snippet.channelTitle}](https://www.youtube.com/channel/${channel.body.items[0].id.channelId})`, true)
    return message.channel.send(embed);
}

exports.help = {
    name: "ytstat",
    description: "Display a YouTube user information."
}

exports.conf = {
    aliases: [],
    cooldown: 10
}