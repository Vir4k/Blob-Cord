const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if(!args[0]) return message.channel.send("Unknown parameter. Please choose the method first, either decord or encode it.");

    let choice= ["decode", "encode"];
    if(!choice.includes(args[0].toLowerCase())) return message.channel.send("Unknown parameter. Please choose the method first, either decord or encode it.");

    let text = args.slice(1).join(" ");

    if (!text) return message.channel.send("Please input some text.");

    if (text.length > 1024) return message.channel.send("Oww, that is too much. The maximium character was 1,204.");

    function encode(char) {
        return char.split("").map(str => {
            const converted = str.charCodeAt(0).toString(2);
            return converted.padStart(8, "0");
        }).join(" ")
    };

    function decode(char) {
        return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join (" ");
    };

    if (args[0].toLowerCase() === "encode") {
        return message.channel.send(encode(text));
    } else if (args[0].toLowerCase() === "decode") {
        return message.channel.send(decode(text));
    }
};

exports.help = {
    name: "binary",
    description: "Convert text to binary or otherwise.",
    usage: "binary <encode | decode> <text>",
    example: "binary encode hello"
  }
  
  exports.conf = {
    aliases: [],
    cooldown: 5
  }