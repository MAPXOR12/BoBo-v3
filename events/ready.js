

module.exports= class{
  async run(bot){
const guilds = await bot.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)
  bot.user.setActivity(`https://boboworld.tk | ${bot.guilds.cache.size} Servers`, { type: "WATCHING" });
  console.log(`${bot.user.username}: registered`);
    const checkUnmutes = require("../helpers/Checkunmute.js");
		checkUnmutes.init(bot);
    

}}
