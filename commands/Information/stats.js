const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let m = require('moment-duration-format'),
    os = require('os'),
    cpuStat = require('cpu-stat'),
    ms = require('ms'),
    moment = require('moment'),
    fetch = require('node-fetch')
  
      cpuStat.usagePercent(function (error, percent, seconds) {
      if (error) {
        return console.error(error)
      }
      
      const cores = os.cpus().length
      const cpuModel = os.cpus()[0].model      
      const guild = client.guilds.cache.size.toLocaleString()
      const user = client.users.cache.size.toLocaleString()
      const channel = client.channels.cache.size.toLocaleString()
      const usage = formatBytes(process.memoryUsage().heapUsed)
      const Node = process.version
      const CPU = percent.toFixed(2)
      
      const embed = new Discord.MessageEmbed()
      .addField('Bot Statistics:', `Server: ${guild} \nUser: ${user} \nChannel: ${channel} \nUsage: ${usage} \nNode: ${Node} \nCPU Usage: ${CPU}%`) // Use Grave accent or `` 
      .addField('Physical Statistics:', `CPU: ${cores} - ${cpuModel}  \nUptime: **${parseDur(client.uptime)}**`)
      .setColor("RANDOM")
      
      message.channel.send(embed)
    })
}

exports.help = {
  name: "stats",
  description: "Information of the bot",
  usage: "stats",
  example: "stats"
};

exports.conf = {
  aliases: [],
  cooldown: 5
};

function formatBytes (a, b) {
  if (0 == a) return "0 Bytes";
  let c = 1024,
      d = b || 2,
      e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      f = Math.floor(Math.log(a) / Math.log(c));
  
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}

function formatBytes (a, b) {
  if (0 == a) return "0 Bytes";
  let c = 1024,
      d = b || 2,
      e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      f = Math.floor(Math.log(a) / Math.log(c));
  
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}

function parseDur(ms) {
  let seconds = ms / 1000,
      days = parseInt(seconds / 86400);
  seconds = seconds % 86400
  
  let hours = parseInt(seconds / 3600);
  seconds = seconds % 3600
  
  let minutes = parseInt(seconds / 60);
  seconds = parseInt(seconds % 60)
  
  if (days) {
    return `${days} day, ${hours} hours, ${minutes} minutes`
  } else if (hours) {
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
  } else if (minutes) {
    return `${minutes} minutes, ${seconds} seconds`
  }
  
  return `${seconds} second(s)`
}  