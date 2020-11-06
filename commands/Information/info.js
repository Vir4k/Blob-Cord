const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("<:mdHelp:568466408548335650> Information Centre")
    .setColor("RANDOM")
    .setDescription("This is a quite easy to use which contains: **Moderate** | **Information** | **Fun** & more systems.")
    .addField("Invite", `[Click Here](https://discord.com/oauth2/authorize?client_id=727448017799479296&scope=bot&permissions=878181502)`, true)
    .addField("Support", `[Click Here](https://discord.homes/spwoobky)`, true)
    .addField("Developer", `<@725968708358373477> <@529493423556919296>`, true)
    .addField("Goal", `Our current goal is the let the bot reaches \`75 servers\` and \`Verified Developer Badge\``, true)
    .setTimestamp()
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())

    message.channel.send(embed);
}

exports.help = {
  name: "info",
  description: "Information of the bot",
  usage: "info",
  example: "info"
}

exports.conf = {
  aliases: [],
  cooldown: 5
}