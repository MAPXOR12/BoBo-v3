const schema = mongoose.Schema({
  guildID: String,
  ///user:String,
  prefix: { type: String, default: "Bo" },

  isPremium: {
    type: String,
    default: false
  },
  xp: {
    onoff: { type: String, default: "on" },
    message: {type:String, default: "Congratulations {user}, your leveled up to {level}!!"},
    max:{type: Number, default: 3},
    min:{type: Number, default:1},
  },
  voice:{ type: Array, default:[]},
  premium: {
    redeemedBy: {
      id: { type: String, default: null },
      tag: { type: String, default: null }
    },

    redeemedAt: { type: String, default: null },

    expiresAt: { type: String, default: null },

    plan: { type: String, default: null }
  },
  channels:{
    xp:{type: String, default:null}
  },
  plugins: { type: Object, default: { // Plugins data
  welcome: {
			enabled: false, // Whether the welcome messages are enabled
			message: null, // The welcome message
		channel: null, // The channel to send the welcome messages
			withImage: null // Whether the welcome images are enabled
		},
		// Goodbye messages
		goodbye: {
			enabled: false, // Whether the goodbye messages are enabled
			message: null, // The goodbye message
		///	channel: null, // The channel to send the goodbye messages
			withImage: null // Whether the goodbye images are enabled
    },
    autorole: {
			enabled: false, // Whether the autorole is enabled
			role: null // The role to add when a member join the server
		},
		// modlgs
modlogs: false, // the channel in which the moderation logs (mute, kick, ban, etc...) will be sent
		reports: false, // the channel in which the reports will be sent
	
	
  
  }
           },
  member:{ type: Object, default:{
    user:null,
    mute:false,
    time: null,
    reason:null,
    
    
    
    
  }},
  
  casesCount: { type: Number, default: 0 },

  whitelist: { type: Array, default: [] },
 
});
module.exports = mongoose.model("Guild", schema);
