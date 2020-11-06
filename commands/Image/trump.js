const jimp = require("jimp")

exports.run = async (client, message, args) => {

        let img = jimp.read("https://cdn.discordapp.com/attachments/747483679890341908/756156592449257602/trump.png")
        if (!args[0]) return message.reply("Indicate that Trump should speak.")
        img.then(image => {
            jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(font => {
                image.resize(1000,500)
                image.print(font, 22, 120, args.join(" "), 600)
                image.getBuffer(jimp.MIME_PNG, (err, i) => {
                    message.channel.send({files: [{ attachment: i, name: "trump.png"}]})
                })
            })
        })
    }

    exports.help = {
        name: "trump",
        description: "Trump's tweet",
        usage: ["trump <text>"],
        example: ["trump covid"]
      }
      
      exports.conf = {
        aliases: [],
        cooldown: 3
      }