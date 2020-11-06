const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else if (args[0]) {
        user = message.guild.members.cache.get(args[0]).user;
    } else {
        user = message.author;
    }

    if (user.bot || user === client.user) {
        return message.channel.send("This user is a bot.");
        // If the user was a bot, ignore it.
    }

    let balance = db.get(`account.${user.id}.balance`);
    if (!balance) balance = 0;
    else balance = balance;

    const embed = new Discord.MessageEmbed()
    .setColor(0x7289DA)
    .setTitle(`Balance of ${user.tag}`)
    .addField("Total Balance:", `${(balance).toLocaleString()} <:Coin:742557027313909771>`)
    .setThumbnail(user.displayAvatarURL({size: 4096, dynamic: true}))
    .setTimestamp(new Date) // Optional :)
    return message.channel.send(embed);
}

exports.help = {
    name: "balance",
    description: "Checking yours, or other members money.",
    usage: "balance [@user | user ID]",
    example: "balance \nbalance @ray#1337"
}
  
exports.conf = {
    aliases: ["bal", "coin", "money", "credit"],
    cooldown: 5
}