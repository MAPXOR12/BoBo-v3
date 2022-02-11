const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  
name:"ban",
  description:"moderation command to ban someone",
  options:[{
    User:{
      
      name:"target",
      description:"target someone",
      required:true,
    }},
           {
             String:{
             name:"reason",
             description:"why you ban this user?",
             required:false,
           }
    
    
    
  }],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  enabled: true,
  category: ["moderation"],
  ownerOnly: false,
  cooldown: 10000,
  prime: false,
  run: async (interaction, bot, data) => {
    // let data = await Guild.findOne({guildID: message.guild.id})

    let user = await interaction.options.getUser("target");
    let reason = await interaction.options.getString('reason');
    // let reason = await interaction.options.getString("reason");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(() => {});
    if (member) {
      const memberPosition = member.roles.highest.position;
      const moderationPosition = interaction.member.roles.highest.position;
      if (
        interaction.member.ownerId !== interaction.user.id &&
        !(moderationPosition > memberPosition)
      ) {
        await interaction.reply({
          content: `You can't sanction or update a sanction for a member who has an higher or equal role hierarchy to yours!
    `,
        });}/*
setTimeout (async()=>{
        await interaction.editReply({
          content: `An error has occurred... Please check that I have the permission to ban this specific member and try again!`,
        })},3000)}*/

      const channelEmbed = await interaction.guild.channels.cache.get(
        data.guild.plugins.modlogs
      );

      if (!channelEmbed) return;
      const embed = new Discord.MessageEmbed()
        .setDescription(`:pencil: **Ban Action**`)
        .addField("Moderator Name", interaction.user.tag, true)
        .addField("User banned", member.user.username, true)
        .setFooter({ text: interaction.guild.name })
        .setThumbnail(interaction.guild.iconURL())
        .setTimestamp()
        .setColor(config.embed.Color);

      if (
        channelEmbed &&
        channelEmbed.viewable &&
        channelEmbed
          .permissionsFor(interaction.guild.me)
          .has(["SEND_MESSAGES", "EMBED_LINKS"])
      ) {
        channelEmbed.send({ embeds: [embed] }).catch((err) => {
          console.log(err);
        });

      setTimeout(() => {}, 3000);
      }
    }

    await user
      .send(
        `**${interaction.user.tag}** banned you from ${
          interaction.guild.name
        }!\n**Reason**: ${"Unspecified."}`
      )
      .catch((err) => console.log(err.name));

    await member.ban({ reason: `Ban Command: ${reason||"Unspecified"}` });

    interaction
      .reply({
        content: `Successfully banned **${user.tag}**`,
      })
      .catch(() =>
        interaction.editReply({ content: `Failed to ban **${user.user.tag}**` })
      );
  },
};
