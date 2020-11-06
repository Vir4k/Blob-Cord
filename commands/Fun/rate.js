const Discord = require("discord.js");

exports.run = async (client, message, args) => {
const lol = ["1", "2", "3", "4", "5"]
const random = lol[Math.floor(Math.random() * lol.length)];

let userArray = message.content.split(" ");
let userArgs = userArray.slice(1);
let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;

const embed = new Discord.MessageEmbed()
.setAuthor("Rate Machine")
.setDescription(`I will rate you **${random}**`)
.setTimestamp()
.setColor('RANDOM')
.setTimestamp()

message.channel.send(embed);
}

exports.help = {
    name: "rate",
    description: "Rate yourself or someone",
    usage: "rate [@user]",
    example: "rate @Virakie#5424"
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 3
  }