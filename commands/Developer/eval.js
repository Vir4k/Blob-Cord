const Discord = require("discord.js"),
      { post } = require("node-superfetch");

exports.run = async (client, message, args) => {
  // This command is super frickin' dangerous. Make it only visible and usable for you only, or give it to someone you trust.
  if (!client.config.owners.includes(message.author.id)) return message.channel.send({embed: {color: "RED", description: "This is a dangerous command for you to use it."}});
  
  const embed = new Discord.MessageEmbed()
  .addField(":inbox_tray: Input", "```js\n" + args.join(" ") + "```");
  
  try {
    const code = args.join(" ");
    if (!code) return message.channel.send("Please include the code.");
    let evaled;
    
    // This method is to prevent someone that you trust, open the secret shit here.
    if (code.includes(`secret`) || code.includes(`token`) || code.includes("process.env")) {
      evaled = "No, shut up, what will you do it with the token?";
    } else {
      evaled = eval(code);
    }
    
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0});
    
    let output = clean(evaled);
    if (output.length > 1024) {
      // If the output was more than 1024 characters, we're gonna export them into the hastebin.
      const {body} = await post("https://hastebin.com/documents").send(output);
      embed.addField(":outbox_tray: Output", `https://hastebin.com/${body.key}.js`).setColor(0x7289DA);
      // Sometimes, the body.key will turn into undefined. It might be the API is under maintenance or broken.
    } else {
      embed.addField(":outbox_tray: Output", "```js\n" + output + "```").setColor(0x7289DA)
    }
    
    message.channel.send(embed);
    
  } catch (error) {
    let err = clean(error);
    if (err.length > 1024) {
      // Do the same like above if the error output was more than 1024 characters.
      const {body} = await post("https://hastebin.com/documents").send(err);
      embed.addField(":outbox_tray: Output", `https://hastebin.com/${body.key}.js`).setColor("RED");
    } else {
      embed.addField(":outbox_tray: Output", "```js\n" + err + "```").setColor("RED");
    }
    
    message.channel.send(embed);
  }
}

exports.help = {
  name: "eval",
  description: "Evaluate some code.",
  usage: "eval <code>",
  example: "eval client.commands"
}

exports.conf = {
  aliases: ["code"]
}

function clean(string) {
  if (typeof text === "string") {
    return string.replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
  } else {
    return string;
  }
}