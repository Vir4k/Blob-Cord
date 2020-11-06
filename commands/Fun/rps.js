const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let embed = new Discord.MessageEmbed()
    .setTitle("Rock, Paper, Scissor")
    .setColor("RANDOM")
    .setDescription("*Choose your path.*")
  m = await message.channel.send(embed);
  await m.react("👊");
  await m.react("✋"); 
  await m.react("✌");
  let choices = {};
  await m.awaitReactions((reaction, user) => user.id === message.author.id, {max: 1, time: 60000, errors:['time','max']})
    .then(collected => {
      try{
          succes = collected.get("👊");
          if(succes){  
              choices[message.author.id] = "r"
          }
      }catch(err){

      }
      try{
          succes = collected.get("✋");
          if(succes){  
              choices[message.author.id] = "p"
          }
      }catch(err){

      }
      try{
          succes = collected.get("✌");
          if(succes){  
              choices[message.author.id] = "s"
          }
      }catch(err){

      }
  })
  try{
    await m.reactions.removeAll();
  }catch(err){}
  
  pos = ["r","p","s"]
  choices['ai'] = pos[Math.floor((Math.random() * pos.length))];
  id = 'ai'
  pos = {"r" : "👊","p" : "✋","s" : "✌"}
  embed = new Discord.MessageEmbed()
  .setDescription("You:" + pos[choices[message.author.id]] + "\n" + "Bot:" + pos[choices[id]])
  switch("" + choices[message.author.id] + choices[id]){
    case 'rs':
    case 'pr':
    case 'sp':
        embed.setColor([0,255,0]).setTitle("This is the real **pro**");
        m.edit(embed);
        break;
    case 'rp':
    case 'ps':
    case 'sr':
        embed.setColor([255,0,0]).setTitle("**You** so weak bro, try again next time !");
        m.edit(embed);
        break;
    case 'rr':
    case 'pp':
    case 'ss':
        embed.setColor([200,200,0]).setTitle("**You** and **Bot** chose the same, so this match is a draw !");
        m.edit(embed);
        break;
  }
}

exports.help = {
    name: "rps",
    description: "Play rock, paper, scissor with bot",
    usage: "rps",
    example: "rps"
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 3
  }