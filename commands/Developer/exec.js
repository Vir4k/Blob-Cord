const Discord = require("discord.js")
const process = require("child_process")

exports.run = async (client, message, args) => {
    if (message.author.id !== "725968708358373477") return;

// Optional.
message.channel.send("Please wait...").then(m => m.delete({timeout: 5000}));

process.exec(args.join(" "), (error, stdout) => {
    let response = (error || stdout);
    message.channel.send(response, {code: "asciidoc", split: "\n"}).catch(err => message.channel.send(err));
})

return;
}

exports.help = {
    name: "exec",
    description: "Shell / CMD Prompt command",
    usage: "exec <text>",
    example: "exec -h"
  }
  
  exports.conf = {
    aliases: ["shell"],
    cooldown: 5
  }