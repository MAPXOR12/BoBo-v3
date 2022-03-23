const app = require('express').Router();
const channels = global.config.server.channels,
      roles = global.config.server.roles;
const client = global.clientSL;
const path = require("path");
const config = global.config

console.log(": Admin/Partner router loaded.");
function createID(length) {
    var result = '';
    var characters = '123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
app.get("/admin/partners", global.checkAuth, async (req, res) => {
    if (!config.owners.includes(req.user.id)) return res.redirect('../admin');
    
   const data = await Partner.find()
  
	res.render("admin/administrator/partner.ejs", {
	    bot:bot,
	    path: req.path,
	    config: config,
	    user: req.isAuthenticated() ? req.user : null,
	    req: req,
	    
	    db: data
	 })
});
app.post("/admin/partners", global.checkAuth, async (req, res) => {
    if (!config.owners.includes(req.user.id)) return res.redirect('../admin');
  
 await new db({
   code:createID(12),
   icon: req.body.icon,
   ownerID:req.body.ownerID,
   serverNAME:req.body.serverName,
   website:req.body.Website,
   description:req.body.partnerDesc,
   status:req.body["Approved"],
   backgroundUrl: req.body.background}).save()
    let x = client.guilds.cache.get(global.config.serverid).members.cache.get(req.body.ownerID)
    if (x) {
        x.roles.add(global.config.server.partnerRole)
    }
    return res.redirect('/admin/partners?success=true&message=Partner added.')
});

module.exports = app;