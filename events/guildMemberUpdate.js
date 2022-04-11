const Discord = require('discord.js');
module.exports = class{
  async run(client, oldRole,newRole,member,oldNickname,newNickname) {
    let data = await Guild.findOne({guildID: member.guild.id})
    const logChannel = member.guild.channels.cache.get(data.plugins.logs.channel)
    if (!logChannel) return;// member.channel.send({content:`ii`});
    
    
    if(!oldNickname && newNickname){
    const embed = new Discord.MessageEmbed()
    .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`**:writing_hand: ${member} roles has been updated.**`)
    .addFields(
      
      {
        name:'oldNickname',
        value:`${oldNickname}`,
      },
      {
        name:'newNickname',
        value:`${newNickname}`,}
      
      )
    .setTimestamp()
    .setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }))
    return logChannel.send({ embeds: [embed] })
    }
  
  
  
  }}