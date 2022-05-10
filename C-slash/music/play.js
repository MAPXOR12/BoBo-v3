const Discord = require("discord.js");
const { QueryType } = require("discord-player");
const player = require("../../handler/player");

const talkedRecently = new Set();
module.exports = {
  name: "play",
  aliases: ["play"],
  usage: ["Boplay Song"],
  description: "Play your favorite music or anything you want",

  options: [
    {
      String: {
        name: "song",
        description: "find_song",
        required: true,
      },
    },
  ],
  category: "music",
  enabled: true,
  ownerOnly: false,
  cooldown: 6000,
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  memberPermissions: ["SEND_MESSAGES"],
  run: async ( interaction, args) => {
    const songSearch =  await interaction.options.getString("song");
    
if (interaction.member.voice.userLimit != 0 && interaction.member.voice.full)
				return interaction.reply({
					embeds: [new Discord.MessageEmbed()
						.setColor(config.embed.Color)
					
						.setTitle(` Your Voice Channel is full, I can't join!`)
					],
					ephemeral: true
				});
    
    if (!interaction.member.voice.channel)
      return await interaction.followUp({
        content: " You need to join a voice channel for me to play song!",
      });


    const searchResult = await player.search(songSearch, {
      requestedBy: interaction.user,
    searchEngine: QueryType.AUTO,
    }).catch((err)=>{ console.log(err)})
    if (!searchResult || !searchResult.tracks.length)
      return interaction.reply({
        content:
          " Hmm, I couldn't quite find the song you requested for; try playing another one!",
      });

    const queue = player.createQueue(interaction.guild, {
      metadata: interaction.
      // disabling volume controls can improve performance
      leaveOnEnd: false,
      leaveOnStop: false,
      spotifyBridge: true,
    });

    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel);
    } catch {
      await player.deleteQueue(interaction.guild.id);

      queue.destroy();
      return interaction.reply({
        content:
          "There was an error with your request, please trye again later!",
      });
    }
    searchResult.playlist
      ? queue.addTracks(searchResult.tracks)
      : queue.addTrack(searchResult.tracks[0]);

    if (!queue.playing) await queue.play();
  },
};