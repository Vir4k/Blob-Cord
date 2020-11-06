const Discord = require("discord.js");

exports.run = async (client, message, args) => {
const lol = ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"]
const random = lol[Math.floor(Math.random() * lol.length)];

let userArray = message.content.split(" ");
let userArgs = userArray.slice(1);
let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;

const embed = new Discord.MessageEmbed()
.setAuthor("Gay Machine")
.setDescription(`You is **${random}%** gay.`)
.setTimestamp()
.setColor('RANDOM')
.setTimestamp()

message.channel.send(embed);
}

exports.help = {
    name: "howgay",
    description: "Are you a gay?",
    usage: "howgay [@user]",
    example: "howgay @Virakie#5424"
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 3
  }