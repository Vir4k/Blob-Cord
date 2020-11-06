const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    try {
      const m = await message.channel.send("<a:loading:732919805254041701> Calculating Pings...");
      const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .addField("⌛ Latency", `**${m.createdTimestamp -  message.createdTimestamp}ms**`)
      .addField("💓 API", `**${Math.floor(client.ws.ping)}ms**`)
      return m.edit(`🏓 Pong!`, embed);
    } catch (error) {
      return message.channel.send(`Something went wrong: ${error.message}`);
    }
  }

exports.help = {
  name: "ping",
  description: "Checkmate the `ms`",
  usage: "ping",
  example: "ping"
}

exports.conf = {
  aliases: ["ms"],
  cooldown: 5
}