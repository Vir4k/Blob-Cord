const Discord = require("discord.js"),
            { post } = require("node-superfetch");
const dateformat = require("dateformat");
const moment = require("moment");

exports.run = async (bot, message, args) => {
  const created = moment.utc(message.guild.createdAt).format("dddd, MMMM Do YYYY at h:mm:ss a");
  
  const verify = {
    NONE: "None",
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
    VERY_HIGH: "Highest"
  }
  
  const region = {
    brazil: ":flag_br: Brazil",
    "eu-central": ":flag_eu: Central Europe",
    singapore: ":flag_sg: Singapore",
    "us-central": ":flag_us: U.S. Central",
    sydney: ":flag_au: Sydney",
    "us-east": ":flag_us: U.S. East",
    "us-south": ":flag_us: U.S. South",
    "us-west": ":flag_us: U.S. West",
    "eu-west": ":flag_eu: Western Europe",
    "vip-us-east": ":flag_us: VIP U.S. East",
    london: ":flag_gb: London",
    amsterdam: ":flag_nl: Amsterdam",
    hongkong: ":flag_hk: Hong Kong",
    russia: ":flag_ru: Russia",
    japan: ":flag_jp: Japan",
    southafrica: ":flag_za:  South Africa"
  }
  
  const contentFilterLevels = {
		DISABLED: "Don't scan any media content.",
		MEMBERS_WITHOUT_ROLES: "Scan media content from members without role.",
		ALL_MEMBERS: "Scan media content from all members."
	}
  
  const server = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.guild.name, message.guild.iconURL({ format: "png", dynamic: true, size: 64 }))
  .setThumbnail(message.guild.iconURL({ format: "png", dynamic: true, size: 1024 }))
  .addField("**Server Name:**", `${message.guild.name}`, true)
  .addField("**Server Region:**", `${region[message.guild.region]}`, true)
  .addField("**Verification Level:**", `${verify[message.guild.verificationLevel]}`, true)
  .addField("**Server ID:**", `${message.guild.id}`)
  .addField("**Server Owner:**", `${message.guild.owner} <:Owner:742557045898739882>`)
  .addField("**Explicit Filter:**", `${contentFilterLevels[message.guild.explicitContentFilter]}`)
  .addField("**Server Created:**", `${created}`)
  .addField("**Roles:**", `${message.guild.roles.cache.sort((a, b) => b.position - a.position).filter(r => r.id !== message.guild.id).map(r => `\`${r.name}\``).length}`)
  .addField("**Statuses:**", `<:online:742557148730359819> Online: ${message.guild.members.cache.filter(s => s.user.presence.status === "online").size}\n<:idle:742557093432655905> Idle: ${message.guild.members.cache.filter(s => s.user.presence.status === "idle").size}\n<:dnd:742557115876638762> Do Not Disturb: ${message.guild.members.cache.filter(s => s.user.presence.status === "dnd").size}\n<:offline:742557131026464768> Offline: ${message.guild.members.cache.filter(s => s.user.presence.status === "offline").size}`)
  .addField(`**Channels [${message.guild.channels.cache.filter(c => c.type === "text" || c.type === "voice").size}]:**`, `<:channel:745264480946225252> Text: ${message.guild.channels.cache.filter(c => c.type === "text").size}\n<:voice:745264517017108540> Voice: ${message.guild.channels.cache.filter(c => c.type === "voice").size}\n<:category:745264504157503498> Category: ${message.guild.channels.cache.filter(c => c.type === "category").size}`, true)
  .addField(`**Members [${message.guild.memberCount}]:**`, `Humans: ${message.guild.members.cache.filter(m => !m.user.bot).size}\nBots: ${message.guild.members.cache.filter(m => m.user.bot).size}`, true)
  .addField(`**Booster [${message.guild.premiumSubscriptionCount}]:**`, `Level: ${message.guild.premiumTier ? message.guild.premiumTier : "None"}`, true)
  .addField(`**Emojis [${message.guild.emojis.cache.size}]:**`, `Normal: ${message.guild.emojis.cache.filter(e => !e.animated).size}\nAnimated: ${message.guild.emojis.cache.filter(e => e.animated).size}`, true)
  .addField("**Inactive Timeout:**", `${message.guild.afkTimeout / 60} minutes`, true)
  .addField("**Inactive Channel:**", `${message.guild.afkChannel ? message.guild.afkChannel.name : "No AFK Channel"}`, true)
  .setTimestamp(new Date())
  .setFooter(message.author.username, message.author.displayAvatarURL({ format: "png", dynmaic: true, size: 64 }));
  return message.channel.send(server);
}

exports.help = {
  name: "serverinfo",
  description: "Show server information.",
  usage: ["serverinfo"],
  example: ["serverinfo"]
};

exports.conf = {
  aliases: ["guildinfo"],
  cooldown: 5
};

function truncate(str, n){
  return (str.length > n) ? str.substr(0, n) + "..." : str;
}