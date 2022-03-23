const app = require('express').Router();
const banSchema = require("../../data/site-ban.js");

console.log(" Admin/Ban router loaded.");

app.get("/admin/userban", global.checkAuth, async (req, res) => {
    if (!config.owners.includes(req.user.id)) return res.redirect('../admin');
    let bandata = await banSchema.find();
    res.render("admin/administrator/user-ban.ejs", {
        bot: bot,
        path: req.path,
        config: config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
    
        bandata: bandata
    })
});
app.post("/admin/userban", global.checkAuth, async (req, res) => {
    if (!config.owners.includes(req.user.id)) return res.redirect('../admin');
    new banSchema({
        user: req.body.userID,
        reason: req.body.reason,
        moderator: req.user.id
    }).save()
    return res.redirect('../admin/userban?success=true&message=User banned.');
});
app.post("/admin/userunban", global.checkAuth, async (req, res) => {
    if (!config.owners.includes(req.user.id)) return res.redirect('../admin');
    banSchema.deleteOne({
        user: req.body.userID
    }, function(error, user) {
        if (error) console.log(error)
    })
    return res.redirect('../admin/userban?success=true&message=User ban removed.');
});

module.exports = app;