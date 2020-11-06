const Discord = require("discord.js");

exports.run = async (client, message, args) => {
const lol = ["Male", "Female", "Gay", "Lesbian"]
const random = lol[Math.floor(Math.random() * lol.length)];

let userArray = message.content.split(" ");
let userArgs = userArray.slice(1);
let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;

const embed = new Discord.MessageEmbed()
.setAuthor("Gender Generator Machine")
.setDescription(`**${member.user.tag}** gender is **${random}**`)
.setTimestamp()
.setColor('RANDOM')
.setTimestamp()

message.channel.send(embed);
}

exports.help = {
    name: "gender",
    description: "Checkmate other people gender",
    usage: "gender [@user]",
    example: "gender @Virakie#5424"
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 3
  }