const Discord = require("discord.js");

exports.run = async (client, message, args) => {
const lol = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35"]
const random = lol[Math.floor(Math.random() * lol.length)];

const embed = new Discord.MessageEmbed()
.setAuthor("Roulette Machine")
.setDescription(`You rolled the machine and it landed on number **${random}**`)
.setTimestamp()
.setColor('RANDOM')
.setTimestamp()

message.channel.send(embed);
}

exports.help = {
    name: "roulette",
    description: "Roulette Game",
    usage: "Roulette",
    example: "Roulette"
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 3
  }