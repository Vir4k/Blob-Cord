const discord = require("discord.js")
const { NovelCovid } = require("novelcovid");
const track = new NovelCovid();

exports.run = async (client, message, args) => {
  if(!args.length) {
    return message.channel.send("Please give the name of country")
  }
  
  if(args.join(" ") === "all") {
    let corona = await track.all()
    
    let embed = new discord.MessageEmbed()
    .setTitle("Global Cases")
    .setColor("RANDOM")
    .setDescription("**Data for: Global**")
    .addField("Total Cases", corona.cases.toLocaleString(), true)
    .addField("Total Deaths", corona.deaths.toLocaleString(), true)
    .addField("Total Recovered", corona.recovered.toLocaleString(), true)
    .addField("Today's Cases", corona.todayCases.toLocaleString(), true)
    .addField("Today's Deaths", corona.todayDeaths.toLocaleString(), true)
    .addField("Active Cases", corona.active.toLocaleString(), true)
    .setTimestamp();

    return message.channel.send(embed)
    
    
    
  } else {
    let corona = await track.countries(args.join(" "))
    
    let embed = new discord.MessageEmbed()
    .setTitle("Coronavirus Statistics")
    .setColor("RANDOM")
    .setDescription(`**Data for: ${corona.country}**`)
    .addField("Total Cases", corona.cases, true)
    .addField("Total Deaths", corona.deaths, true)
    .addField("Total Recovered", corona.recovered, true)
    .addField("Today's Cases", corona.todayCases, true)
    .addField("Today's Deaths", corona.todayDeaths, true)
    .addField("Active Cases", corona.active, true)
    .setTimestamp();
    
    return message.channel.send(embed)
    
    
  }
  
  
}

exports.help = {
  name: "corona",
  description: "Corona Virus informaton",
  usage: "corona [country]",
  example: "corona Cambodia"
}

exports.conf = {
  aliases: ["covid"],
  cooldown: 5
}