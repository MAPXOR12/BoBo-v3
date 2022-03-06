const app = require("express").Router();
const path = require("path");
console.log("setting router loaded");
app.get(
  "/dashboard/guild/:guildID/setting",
  global.checkAuth,
  async (req, res, next) => {
    const guild = bot.guilds.cache.get(req.params.guildID)
  let data = await Guild.findOne({guildID: guild.id});
      res.render("./guild/setting.ejs", {
        config: config,
        data:data,
        req: req,
        bot: bot,
        guild: guild,
        user: req.isAuthenticated() ? req.user : null,
      })
    });

    app.post(
      "/dashboard/guild/:guildID/setting",
      global.checkAuth,
      async (req, res) => {
        const guild = bot.guilds.cache.get(req.params.guildID);
        let rbody = req.body;
      
       if (rbody["prefix"].length > 5){
          return res.redirect( 
            "?error=true&message=You cant add up 5 words to prefix..");}
        let data = await Guild.findOne({guildID: guild.id})
        
          
          data.prefix = req.body.prefix
        data.save();
        
        
        await Guild.findOneAndUpdate({
          
          guildID: req.params.guildID},{
          $set:{
  
            prefix:req.body.prefix,
           "xp.onoff":req.body.xp,
            
            
            
          }})
                
        /*if (data) {
          data.prefix = rbody["prefix"];
          data.xp.onoff = rbody["xp"];
          data.channels.xp = rbody["xpchannel"];
      data.save();
        
          */
        
      
        res.redirect(
          `?success=true&message=Your changes have been successfully applied`
        );
      }
    );
module.exports = app;
