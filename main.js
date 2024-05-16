const Discord = require("discord.js")

const generateImage = require("./generateimage")
//const leaveMember = require("./leavemember")

const client = new Discord.Client({
    intents: [
        "GUILD_MEMBERS"
    ]
})
const prefix = '!';
const fs = require('fs')


client.commands = new Discord.Collection();

client.once("ready", () => {
  console.log('The Bot is online')

  const statuses = [
    { name: "Team Unreal��", type: "LISTENING" },
    { name: "Playing Ceylone Unreal Life", type: "PLAYING" },
    { name: "Unreal Life Citizen", type: "WATCHING" },
  ]

  client.user.setActivity(statuses[Math.floor(Math.random() * (statuses.length - 1) +1 )],{ type: 'COMPETING'});
        setInterval(() => {
            client.user.setActivity(statuses[Math.floor(Math.random() * (statuses.length - 1) + 1)], { type: 'COMPETING'});
        }, 5000);

        client.user.setStatus('online')

        });


/*client.on("message", msg => {
  if (msg.content === "Gm" || msg.content === "gm") {
      msg.reply("බුදුඅම්මො කොලුවො සෑහෙන උදෙන් ඇහැරිලානෙ") 
  }
  else if (msg.content === "Gn" || msg.content === "gn") {
      msg.reply("ඔය නිදාගන්නෙයි හදන්නෙ ටිකක් රෑ වෙනකන් හිටහන්")
  }
  else if (msg.content === "current na" || msg.content === "light na" || msg.content === "light giya"  || msg.content === "current giya" || msg.content === "current na bn" || msg.content === "light na bn") {
    msg.reply("බොලටත් නැහැයි අපිටත් නෑ බොල රට රකින විරුවා හොදටම කරල තියෙන්නෙ  ඔව්!!")

  }
  else if (msg.content === "Hi" || msg.content === "hi") {
    msg.reply("හායි කොලුවෝ මක්කයි වෙන්නෙ!!")

  }
  else if (msg.content === "LIVE emu" || msg.content === "LIVE enne nadda" || msg.content === "live enne nadda" || msg.content === "live emu") {
    msg.reply("එයා LIVE එන්නෙ අරය කිව්වොත් විතරයි!!")

  }
  else if (msg.content === "BOTA" || msg.content === "Bota" || msg.content === "bota" || msg.content === "Boto" || msg.content === "boto") {
    msg.reply("බොටා තමයි බොල උබ හිතුවද ශරුක්කාන් කියල")
  }
  
  
})*/

client.on('message', message => {
    const words = ["pako", "huththo","ponnaya","pakaya","kariyo","vesapaka","fuck","hukapan","bitch","huththa","හුත්තා","පකයා","පකා","පොන්නයා","හුට්ත","හුකපන්","fuckyou","huththi"];

    let foundInText = false;
    for (let i in words) {
        if(message.content.toLowerCase().includes(words[i])) foundInText = true
    }

    if (foundInText) {
        message.reply("අඩො අඩො මෙ ඔවා දාන්න ලැස්ති වෙන්න එපා!!")
        message.delete()
    }
})

client.on('message',message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();

    if(command === 'discord_link' || command === 'Discord_link' || command === 'discord' || command === 'link'){
        client.commands.get('discord').execute(message,args);
    }
})

const welcomeChannelId = "1093029025330511942" //welcome mssg

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Welcome To **Ceylon Unreal Life Roleplay **please go through our <#1093028086905323520>.`,
        files: [img]
    })
})

//const leaveChannelId = "1093028086905323521" //leave mssg

//client.on("guildMemberRemove", async (member) => {
//    const img = await leaveMember(member)
//    member.guild.channels.cache.get(LeaveChannelId).send({
//        content: `<@${member.id}> leave from server!`,
//        files: [img]
//    })
//})



client.login('MTAxMzI2MzkwNzE1NjE0NDIwOQ.GSC6p-.5GWntieWii_iVOpDD8A4SCEhaPeL72Z0w2Jxis')