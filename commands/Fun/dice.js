const Discord = require("discord.js");

exports.run = async (client, message, args) => {
const lol = ["1", "2", "3", "4", "5", "6"]
const random = lol[Math.floor(Math.random() * lol.length)];

const embed = new Discord.MessageEmbed()
.setAuthor("Dice Machine")
.setDescription(`you rolled the dice and it landed on number **${random}**`)
.setTimestamp()
.setColor('RANDOM')
.setTimestamp()

message.channel.send(embed);
}

exports.help = {
    name: "dice",
    description: "Dice Game",
    usage: "dice",
    example: "dice"
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 3
  }