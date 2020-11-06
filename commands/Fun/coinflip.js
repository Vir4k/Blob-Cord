const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.channel.send(coinToss());
}

function coinToss() {
var rand = ['You flipped the coin, it lands on tails.', 'I flipped the coin, it lands on tails.', 'You flipped the coin, it lands on heads.', 'I flipped the coin, it lands on heads.'];

return rand[Math.floor(Math.random()*rand.length)];
}

exports.help = {
    name: "coinflip",
    description: "Flips some coin",
    usage: "coinflip",
    example: "coinflip"
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 3
  }