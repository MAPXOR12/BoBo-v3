const app = require("express").Router();
const path = require("path");
const Discord = require("discord.js");


function intToString (value) {
    var suffixes = ["", "K", "M", "B","T"];
    var suffixNum = Math.floor((""+value).length/3);
    var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
    if (shortValue % 1 != 0) {
        shortValue = shortValue.toFixed(1);
    }
    return shortValue+suffixes[suffixNum];
}

app.get("/dashboard", global.checkAuth, async (req, res, next) => {
  const maintenance = await Maintenance.findOne({
  server: config.serverid
})

if(maintenance && maintenance.toggle == "true") {

     return res.render( "maintenance.ejs",{
       req:req,
       res:res,
       
       
     })

}


  
  const user = bot.users.fetch(req.user.id).then(async (a) => {
  
  
    let data =
      (await User.findOne({ userID: a.id })) ||
      (await new User({ userID: a.id }));

    const user_rank = await User.find({})
      .then((docs) =>
        Promise.resolve(
          docs.sort((A, B) => B.data.global_xp - A.data.global_xp)
        )
      )
      .then((sorted) => sorted.findIndex((x) => x.userID === data.userID) + 1);
    if (!user) {
      res.redirect(
        `/error?code=404&message= I can't fetch you, yu must be a user of bot then try again`
      );
    }
    res.render("./users/dashboard.ejs", {
      config: config,
      convert:intToString,
      support: config.support,
      data: data,
      user_rank: user_rank,
      req:req,
      res: res,
      perms: Discord.Permissions,
      guildID: req.params.guildID,
      bot: bot,
      user: req.isAuthenticated() ? req.user : null,
    });
  });
});
module.exports = app;
