const interaction = require("discord.js");
const Discord = require("discord.js");
module.exports = class {
  async run(interaction, bot) {
    const data = {};

    if (!interaction.isCommand()) return;

    const command = bot.slash.get(interaction.commandName); //,interaction.options.getSubcommand());
   if (!command) return;
    try {
      let guild = await Guild.findOne({ guildID: interaction.guild.id });
      if (!guild) {
        Guild.create({ guildID: interaction.guild.id });
      }
      data.guild = guild;
      ///-------------user data--&------////

      let user = await User.findOne({
        userID: interaction.user.id
      });
      if (!user) {
        User.create({ userID: interaction.user.id });
      }
      data.user = user;
      let news = await News.findOne({tag:"768944616724103170"})
      data.news = news
      //---------------prime data-////////

      let prime = await Prime.findOne({ guildID: interaction.guild.id });
      if (prime && prime.log === "enable") return; //message.channel.send(`you don't have Premium version`);
      ///----------- white list--//

      let Ww = await Owner.findOne({ ownerCode: "768944616724103170" });

      ///////

      ////------black list------/////

      const userBlacklistSettings = await Black.findOne({
        userID: interaction.user.id
      });
      const guildBlacklistSettings = await Black.findOne({
        Guild: interaction.guild.id
      });

      if (userBlacklistSettings && userBlacklistSettings.isBlacklisted) {
      
        return; 
      }

      // Check if server is Blacklisted
      if (guildBlacklistSettings && guildBlacklistSettings.isBlacklisted){
        return; 
      }
      let ban = await Ban.findOne({user: interaction.user.id})
      if(ban) return;
      //-------------/////

    
      if (guild) {
       // const command = bot.slash.get(interaction.commandName)
        
        if (!interaction.channel.permissionsFor(bot.user).has("SEND_MESSAGES"))
          return;
        if (!command.enabled)
          return await interaction.reply({
            content: `This command is **Disable** for now`
          });
  
        
//---------moflogs-----------////
        
        const channelEmbed = await interaction.guild.channels.cache.get(data.guild.plugins.modlogs)

        if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(interaction.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
          
          
            setTimeout(()=>{
            }, 3000)
      }
        
        /////////guild owner

        if (command.guildOwner) {
          if (interaction.userId !== interaction.guild.ownerId)
            return interaction.reply({
              content: `this command only for guildOwner`,
              ephemeral: true
            });
        }
        ////////////////--------------////////

        if (command.prime) {
          ///let data = await Prime.findOne({ Guild: interaction.guildId });

          if (!prime)
            return interaction.reply({
              content: `you need upgrade to premium`
            });

          if (!prime.Permanent && Date.now() > prime.time) {
            prime.Guild;
            prime.deleteOne();

            return interaction.reply({
              content: `premium  on your server ended for buy mor join support server `
            });
          }
        }
        ///------------ bot owner ----///

        if (
          command.ownerOnly &&
          !Ww //worldWhitelist.find(c => c.type === message.author.id)
        )
          return await interaction.reply({
            content: `This command is only for owner the bot`,
            epheremal: true
          });

        ///---------- permissions--------////
        let neededPermissions = [];
        if (!command.botPermissions.includes("EMBED_LINKS")) {
          command.botPermissions.push("EMBED_LINKS");
        }
        command.botPermissions.forEach(perm => {
          if (!interaction.channel.permissionsFor(bot.user).has(perm)) {
            neededPermissions.push(perm);
          }
        });
        if (neededPermissions.length > 0) {
          return interaction.reply({
            content: `I don't have a ${neededPermissions
              .map(p => `\`${p}\``)
              .join(", ")} permissions`
          });
        }
        neededPermissions = [];
        command.memberPermissions.forEach(perm => {
          if (
            !interaction.channel.permissionsFor(interaction.member).has(perm)
          ) {
            neededPermissions.push(perm);
          }
        });
        if (neededPermissions.length > 0) {
          return interaction.reply({
            content: `You don't have a ${neededPermissions
              .map(p => `\`${p}\``)
              .join(", ")} permissions`
          });
        }

        if (command.botPermissions) {
          let perms = new Discord.MessageEmbed().setDescription(
            `i don't Have ${command.botPermissions} To Run Command..`
          );
          if (
            !interaction.guild.me.permissions.has(command.botPermissions || [])
          )
            return interaction.reply({ embeds: [perms] });
        }
        if (!bot.cooldowns.has(command.name)) {
          bot.cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = bot.cooldowns.get(command.name);
        const cooldownAmount = command.cooldown || 2 * 1000;
        if (timestamps.has(interaction.userId)) {
          const expirationTime =
            timestamps.get(interaction.userId) + cooldownAmount;
          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return interaction.reply({
              content: `Please wait ${timeLeft.toFixed(1)} second`
            });
            /* .then(msg =>*/
            setTimeout(() => interaction.deleteReply(), timeLeft);
          }
        }
        timestamps.set(interaction.userId, now);
      
        setTimeout(() => timestamps.delete(interaction.userId), cooldownAmount);
  if(command) command.run(interaction, bot,data);
      }
    } catch (error) {
      if (error) console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true
      });
    }
  }
};
