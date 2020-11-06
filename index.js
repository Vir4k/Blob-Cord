const Discord = require("discord.js");
const config = require("./config.json")
const blobcord = require("./handler/ClientBuilder.js");
const client = new blobcord();
const alexa = require('alexa-bot-api');
let ai = new alexa("aw2plm");

require("./handler/module.js")(client);
require("./handler/Event.js")(client);

client.package = require("./package.json");
client.on("warn", console.warn);
client.on("error", console.error);

let memberlog = "764313658376978492";

client.on("guildMemberAdd", member => {
  if (member.guild.id !== "764313658376978492") return;
  
  client.channels.cache.get(memberlog).send(`<:Left_Arrow:766876946143117323> **<@!${member.user.id}>** has joined the party.`);
})

client.on("guildMemberRemove", member => {
    if (member.guild.id !== "764313658376978492") return;
    
    client.channels.cache.get(memberlog).send(`<:Right_Arrow:772303456735068161> **${member.user.tag}** has left the party.`);
});

client.on('message', async message => {
    if (message.author.bot) return;

    if(message.content.startsWith(`<@${client.user.id}>`)){
        return message.channel.sendI(`Hey ${message.author}, my prefix is `/``)
    }

    if (message.channel.id === "766310415533473842") {

    let content = message.content;

    ai.getReply(content).then(r => message.channel.send(r)); 
    } else {
        return;
    }
});
client.login(config.token).catch(console.error);