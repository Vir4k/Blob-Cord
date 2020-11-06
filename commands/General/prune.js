const Discord = require("discord.js");

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have a permissions to do this.");
if (isNaN(args[0])) return message.channel.send("Please input a valid number.") // isNaN = is Not a Number. (case sensitive, write it right)
if (args[0] > 100) return message.channel.send("Insert the number less than 100.") // Discord limited purge number into 100.
if (args[0] < 2) return message.channel.send("Insert the number more than 1.")

await message.delete()
await message.channel.bulkDelete(args[0])
.then(messages => message.channel.send(`Deleted ${messages.size}/${args[0]} messages.`)).then(d => d.delete({timeout: 10000})) // How long this message will be deleted (in ms)
.catch(() => message.channel.send("Something went wrong, while deleting messages.")) // This error will be displayed when the bot doesn't have an access to do it.
}

exports.help = {
    name: "prune",
    description: "Clear some messages away",
    usage: "prune <amount>",
    example: "prune 69"
  }
  
  exports.conf = {
    aliases: ["clear", "purge"],
    cooldown: 5
  }