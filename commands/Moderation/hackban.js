exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("BAN_MEMBERS")) {

        return message.channel.send("Something went wrong: No permission. (BAN_MEMBERS)");

    }



    let userID = args[0];

    let reason = args.slice(1).join(" ");



    if (!userID) return message.channel.send("Please insert a valid user ID.");

    if (isNaN(userID)) return message.channel.send("User ID must be a number.");

    if (userID === message.author.id) return message.channel.send("You can't ban yourself.");

    if (userID === client.user.id) return message.channel.send("You can't ban me. Why?");



    if (!reason) reason = "No reason provided";



    client.users.fetch(userID).then(async user => {

        await message.guild.members.ban(user.id, {reason: reason});

        return message.channel.send(`**${user.tag}** has been banned, from outside this server.`);

    }).catch(error => {

        // If the user is unavailable, return some errors. (Recommended)

        return message.channel.send(`An error occurred: **${error}**`);

    })

};

exports.help = {
    name: "hackban",
    description: "Ban raider or someone outside of the server",
    usage: ["hackban <id>"],
    example: ["hackban <1234567890>"]
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 10
  }