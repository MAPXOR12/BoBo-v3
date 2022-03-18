/*const Event = require('../../structures/Event');
const logger = require('../../utils/logger');
const Logging = require('../../database/schemas/logging');*/
const discord = require("discord.js");
const moment = require('moment');
const cooldown =  new Set();



module.exports = class{

async run(role, message) {

if(!role) return


const guild = await Guild.findOne({ guildID: role.guild.id })


const maintenance = await Maintenance.findOne({
  maintenance: "maintenance"
})

if(maintenance && maintenance.toggle == "true") return;

if(cooldown.has(role.guild.id)) return;

if(guild.logs.roleCreate==="off") return;
                    
if(guild){
if(guild.logs.logchannel){



const channelEmbed = await role.guild.channels.cache.get(guild.logs.logchannel)

if(channelEmbed){

let color = config.embed.Color




    const embed = new discord.MessageEmbed()
    .setThumbnail(role.guild.iconURL())
    .setDescription(`:pencil: **role Created**`)
    .addField("**role Name**", role.name,true)
///    .addField("**Moderator**",message.author.toString(),true)
  
    .addField("**role Id**",role.id,true)
    .setTimestamp()
    .setFooter({text:role.guild.name})
    .setColor(color)
  
  
        if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(role.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send({embeds:[embed]}).catch((err)=>{console.log(err.name)})
            cooldown.add(role.guild.id);
            setTimeout(()=>{
cooldown.delete(role.guild.id)
            }, 3000)
      }

} 
  


  }
}


}}