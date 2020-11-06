const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

exports.run = async (client, message, args) => {
    const amount = parseInt(args[0]);
    const result = Math.floor(Math.random() * 10);
    const balance = db.get(`account.${message.author.id}.balance`);

    if (!amount) return message.channel.send("Please insert an amount first.");
    if (isNaN(amount)) return message.channel.send("The amount was not a number.");
    if (amount > balance || !balance || balance === 0) return message.channel.send("You don't have enough money.");
    
    // Optional:
    if (amount < 200) return message.channel.send("You don't have enough money for gambling. The minimum was $200.");

    let cooldown = 25000; // 25 Seconds.
    let pad_zero = num => (num < 10 ? '0' : '') + num;
    let lastGamble = await db.get(`lastGamble.${message.author.id}`);

    if (lastGamble !== null && cooldown - (Date.now() - lastGamble) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastGamble));
        let second = pad_zero(timeObj.seconds).padStart(2, "0");
        return message.channel.send(`Wooo that is too fast. You need to wait **${second}** second(s) before you can gambling again.`);
    }

    // 50:50
    if (result < 5) {
        await db.set(`lastGamble.${message.author.id}`, Date.now());
        await db.subtract(`account.${message.author.id}.balance`, amount);
        return message.channel.send(`Ahh, no. You lose $${amount}. Good luck next time.`);
    } else if (result > 5) {
        await db.set(`lastGamble.${message.author.id}`, Date.now());
        await db.add(`account.${message.author.id}.balance`, amount);
        return message.channel.send(`Woohoo! You won $${amount}! Good luck, have fun!`);
    }
}

exports.help = {
    name: "gamble",
    description: "An efficient way to double your money.",
    usage: "gamble <bet/amount>",
    example: "gamble 500"
}

exports.conf = {
    aliases: ["gambling"],
    cooldown: 5
}