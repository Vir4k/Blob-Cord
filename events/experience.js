const Discord = require("discord.js");
const db = require("quick.db");

module.exports = async (client, message) => {
    let recent = client.recent; // new Set();

    // Ignore the bot.
    if (message.author.bot || message.author === client.user) return;

    // If the user has an exp. cooldown, ignore it.
    if (recent.has(message.author.id)) return;

    // Get the leveling database.
    // This is global leveling. If you want the leveling per server, do this:
    // let userprof = db.get(`leveling.${message.guild.id}.${message.author.id}`);
    let userprof = db.get(`leveling.${message.author.id}`);

    // If the user doesn't have any leveling stats at all, set it up.
    if (!userprof) return db.set(`leveling.${message.author.id}`, {xp: 0, level: 0});

    // Give them an EXP.
    await db.add(`leveling.${message.author.id}.xp`, client.leveling.gainedXp());

    // Notice them if the user has leveled/ranked up.
    if (client.leveling.getLevel(userprof.xp) > userprof.level) {
        await db.add(`leveling.${message.author.id}.level`, 1);
        userprof.level = client.leveling.getLevel(userprof.xp);
        message.channel.send(`**${message.author.tag}** reached level **${userprof.level}!** Congratulations!`);
    };

    // Generate a random timer. (2)
    let randomTimer = getRandomInt(60000, 75000); // Around 60 - 75 seconds. You can change it.

    // Add the user into the Set()
    recent.add(message.author.id);

    // Remove the user when it's time to stop the cooldown.
    client.setTimeout(() => {
        recent.delete(message.author.id)
    }, randomTimer);
}

// Generate a random timer.
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}