const Discord = require('discord.js')

module.exports = {
  name: "lock",
  aliases: ["close","lock"],
  description: "Locks the current or selected text channels",
  usage: ["lock","lock <@ channel>"],
  category: ["moderation"],
  enabled: true,			  
  memberPermissions: [ "MANAGE_CHANNELS","SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","MANAGE_ROLES" ],		
  ownerOnly: false,			
  cooldown: 6000,
  run: async (bot, message, args, dev) => {
    const data = await Guild.findOne({guildID: message.guild.id})
  let channel = await message.mentions.channels.first() || message.channel
  if(!channel) return message.channel.send({content:`Mention channel first `})
  channel
      .permissionOverwrites.edit(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
        message.channel.send({content:`channel locked`});})
    
        /// send to log channel
    const channelEmbed = await message.guild.channels.cache.get(data.plugins.modlogs)

      if(!channelEmbed) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`:pencil: **Channel Action**`)
    .addField('Moderator Name', message.author.toString(), true)
    .addField('Channel',channel.name, true)
    .setFooter({text:message.guild.name})
    .setThumbnail(message.guild.iconURL())
    .setTimestamp()
    .setColor(config.embed.Color)
  
   
   
        if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send({embeds:[embed]}).catch((err)=>{console.log(err)})
          
            setTimeout(()=>{
            }, 3000)
      }
    
     
   }
}
