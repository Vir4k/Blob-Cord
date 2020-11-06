const Discord = require("discord.js");

exports.run = async (client, message, args) => {
const lol = ["Bass", "Guitar", "Flute", "Drum", "bassoon", "castanets", "didgeridoo", "double bass", "gong", "harpsichord", "lute", "mandolin", "oboe", "piccolo", "viola"]
const random = lol[Math.floor(Math.random() * lol.length)];

let userArray = message.content.split(" ");
let userArgs = userArray.slice(1);
let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;

const embed = new Discord.MessageEmbed()
.setAuthor("Instrument Generator Machine")
.setDescription(`**${member.user.tag}** favorite instrument is **${random}**`)
.setTimestamp()
.setColor('RANDOM')
.setTimestamp()

message.channel.send(embed);
}

exports.help = {
    name: "instrument",
    description: "Generate some instrument",
    usage: "instrument [@user]",
    example: "instrument @Virakie#5424"
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 3
  }