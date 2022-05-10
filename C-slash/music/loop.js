const player = require("../../handler/player");
const { QueueRepeatMode } = require('discord-player');

module.exports = {
  name: "loop",
  aliases: ["loop","repeat"],
  usage: ["Boloop"],
  description: "repeat mode",
  category: "music",
  enabled: true,
  ownerOnly: false,
  cooldown: 6000,
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  memberPermissions: ["SEND_MESSAGES"],
  run: async (interaction, args) => {
    
    
    const h = await interaction.options.getString("");
if(!interaction.member.voice.channel){ return interaction.reply({content:`You can't change loop mode`})}
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.channel.send({content:`No music currently playing ${message.author}... try again ? ❌`});

        if (interaction.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return interaction.channel.send({content:`You must first disable the current music in the loop mode (${client.config.app.px}loop) ${message.author}... try again ? ❌`});

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return interaction.channel.send({content: `Repeat mode **${queue.repeatMode === 0 ? 'disabled' : 'enabled'}** the whole queue will be repeated endlessly 🔁`});
        } else {
            if (queue.repeatMode === 2) return interaction.channel.send({content:`You must first disable the current queue in the loop mode loop queue ${interaction.user}... try again ? ❌`});

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return interaction.channel.send({content: `Repeat mode **${queue.repeatMode === 0 ? 'disabled': 'enabled'}** the current music will be repeated endlessly (you can loop the queue with the <queue> option) 🔂`});
        };
  }}