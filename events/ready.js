

module.exports= class{
  async run(bot){
  bot.user.setActivity("Bohelp", { type: "WATCHING" });
  console.log(`${bot.user.username}: registered`);
    const checkUnmutes = require("../helpers/Checkunmute.js");
		checkUnmutes.init(bot);
    

}}
