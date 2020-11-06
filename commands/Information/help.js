const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let prefix = client.config.prefix;
  
  if (!args[0]) {
    let module = client.helps.array();
    
    if (!client.config.owners.includes(message.author.id)) module = client.helps.array().filter(x => !x.hide);
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp(new Date())
    .setDescription(`You can type \`${prefix}help [command | aliase]\` to get more specific information about a command. [Click here](https://discord.homes/spwoobky) if you want to join **SpwoobkyCord's support server** and [click here](https://discord.com/oauth2/authorize?client_id=727448017799479296&scope=bot&permissions=878181502) if you want to invite **SpwoobkyCord** to your own server, if you're on phone you can use \`.support\` or \`.invite\``)
    .setTitle(`Help Menu`)
    
    for (const mod of module) {
      embed.addField(`${mod.name}`, mod.cmds.map(x => `\`${x}\``).join(" | "));
    }
    
    return message.channel.send(embed);
  } else {
    let cmd = args[0];
    
    if (client.commands.has(cmd) || client.commands.get(client.aliases.get(cmd))) {
      let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
      let name = command.help.name;
      let desc = command.help.description;
      let cooldown = command.conf.cooldown + " second(s)";
      let aliases = command.conf.aliases.join(", ") ? command.conf.aliases.join(", ") : "No aliases provided.";
      let usage = command.help.usage ? command.help.usage : "No usage provided.";
      let example = command.help.example ? command.help.example : "No example provided.";
      
      let embed = new Discord.MessageEmbed()
      .setColor(0x7289DA)
      .setTitle(name)
      .setDescription(desc)
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter("[] optional, <> required. Don't includes these things while typing a command.")
      .addField("Cooldown", cooldown)
      .addField("Aliases", aliases, true)
      .addField("Usage", usage, true)
      .addField("Example", example, true)
      
      return message.channel.send(embed);
    } else {
      return message.channel.send({embed: {color: "RED", description: "Unknown command."}});
    }
  }
}

exports.help = {
  name: "help",
  description: "Show a command list.",
  usage: "help [command]",
  example: "help verify"
}

exports.conf = {
  aliases: ["?"],
  cooldown: 5
}