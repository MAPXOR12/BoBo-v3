const Discord = require("discord.js")
module.exports = {
  name: "help",
  aliases: ["h"],
  enabled: true,            
  memberPermissions: [ "SEND_MESSAGES" ],            
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],        
  ownerOnly: false,            
  cooldown: 10000,
  run: async (bot, message, args, dev) => {
////if(message.guild.me.has("838593240328044554"))return
  
  message.channel.send({content:`You can see full commands in dashboard https://boboworld.xyz/commands`})
    /*
let embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`a game bot for spending time and enjoying[ Invite ](https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=260383435985&scope=bot%20applications.commands) - [ Support ](https://discord.gg/rjhPpahNNR)`)
      .addField ("Admin || ⚠️","`prefix`, `xp`")
      .addField("General || 🌎","`news`, `about`,  `invite`, `serverinfo`, `userinfo`, `ping`, `bots`,`redeem`")  
      .addField("Economy || 💶","`daily`, `balance`, `give`, `birthday`")
      .addField("Game ||  🎮"," `coinflip`, `slots`")
      .addField("Shop || 🛍️","`buy`, `shop`, `use`, `unequip`, `inventory`")
      .addField("Fun || 🥳","`slap`, `hug`, `ship`, `kiss`, `marry`")
      .addField("Ranking || 🧧"," `profile`, `rank`, `setinfo`, `setbackground`, `tip`, `setcolor`")
 message.channel.send({embeds:[embed]});*/
  }
}
