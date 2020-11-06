const Discord = require('discord.js');
const fetch = require("node-fetch");

exports.run = async (client, message, args) => {
    let loadingEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`<a:loading:732919805254041701> Generating a meme!...`)
    let msg = await message.channel
      .send(loadingEmbed)
      .then(m => m.delete({ timeout: 2000 }));

      let random = ["Memes", "Meme", "Davie504", "Dankmemer", "funny"]
      let memes = random[Math.floor(Math.random() * random.length)]
      fetch(`https://www.reddit.com/r/${memes}.json?sort=top&t=daily`)
      .then(res => res.json())
      .then(body => {
        if (!body) return message.reply("I broke, try again!");

      const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
      if (!allowed.length) return message.channel.send('Hmm looks like an error to me...');
        const randomnumber = Math.floor(Math.random() * allowed.length)
       
    let url = `https://www.reddit.com${allowed[randomnumber].data.permalink}`
    let embed = new Discord.MessageEmbed()
      .setTitle(allowed[randomnumber].data.title)
      .setURL(url)
      .setImage(allowed[randomnumber].data.url)
      .setDescription("**-----------------------------------**")
      .addField("Meme provided by", `https://reddit.com/r/${memes}`)
      .addField("Upvotes and Comments", `<:upvote:744158383631892580> **${allowed[randomnumber].data.ups}** | <:comment:744158388337901578> **${allowed[randomnumber].data.num_comments}**`)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())

    return message.channel.send(embed);
    });
  }

exports.help = {
  name: "meme",
  description: "Checkmate some memes from Reddit",
  usage: "meme",
  example: "meme"
}

exports.conf = {
  aliases: [],
  cooldown: 3
}