const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = config.embed.Color;
module.exports = {
  /*
  data: new SlashCommandBuilder()
    .setName("xp")
    .setDescription("xptoggle")
  .addStringOption(option => option.setName("toggle"). setDescription("only off or on").setRequired(true)),
                */
  name:"xptoggle",
  description:"xp toggle",
options:[{
    StringChoices:{
      
      name:"xp",
      description:"what's you want to system",
      required:true,
      choices:[
        ["on","enable xp system"],
        ["off","disable xp system"]
      
        ]
    
      }}],
    
    
    
  
  category: ["admin"],
  memberPermissions: ["SEND_MESSAGES", "MANAGE_GUILD"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  enabled: true,
  cooldown: 1000,
  prime: false,
  run: async (interaction,bot,data) => {
    const toggle = interaction.options.getString('xp')
  
    if (toggle ==="on") {
      data.guild.xp.onoff = "on";
      data.guild.save();
  return interaction.reply({content:`On`})
     
     }
    
    
   if (toggle === "off") {
        data.guild.xp.onoff = "off";
       data.guild.save();
      return interaction.reply({content:` Xp system from guild is disabled`})
    }
  
      return interaction.reply({content:`error syntax [on,off] `})

    
    
    
    
    
  }
};
