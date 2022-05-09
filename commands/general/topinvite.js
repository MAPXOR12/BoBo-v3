  let Discord = require("discord.js");


module.exports = {
  name: "topinvites",
  aliases: ["topinvite"],
  description: "",
  usage: [""],
  category: [""],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev, data) => {



let invites = await message.guild.invites.fetch()
    
  
    let possibleInvites = ["User Invited |  Uses "];
    
    invites.forEach(i => {
  
      if (i.uses === 0) {
        return;
      }
      possibleInvites.push([
        "\n " +  i.inviter.username + "  :  " + i.uses
      ]);
    });
    possibleInvites.reduce({
    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .addField("Top Invites.", `${possibleInvites}`);

    message.channel.send({embeds:[embed]})}}