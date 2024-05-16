const Canvas = require("canvas")
const Discord = require("discord.js")

const background = "https://cdn.discordapp.com/attachments/837017905932664895/1098648221141717012/pic1.png"

const dim ={
    height: 675,
    width: 1200,
    margin: 50
}

const av = {
    size: 256,
    x: 480,
    y: 170
}

const generateImage = async (member) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size})

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    //dram in the background
    const backimg =await Canvas.loadImage(background)
    ctx.drawImage(backimg, 0, 0)

    //draw black tinted box
    ctx.fillStyle = "rgba(0,0,0,0.7)"
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()

    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()

    //write in text
    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    //draw in welcome
    ctx.font = "50px Sans"
    ctx.fillText("We are delighted to have you here", dim.width/2, dim.margin + 70)

    // draw in the username
    ctx.font = "60px Sans"
    ctx.fillText(username + discrim, dim.width/2, dim.height - dim.margin - 125)

    //draw in the server
    ctx.font = "40px Sans"
    ctx.fillText("Welcome to Ceylon Unreal Life", dim.width / 2, dim.height - dim.margin - 50)


    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachment
}

module.exports = generateImage