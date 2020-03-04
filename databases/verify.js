const mongoose = require("mongoose");

const verify = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   username: String,
   userid: String,
   code: String,
   guildid: String,
   guildname: String
});

module.exports = mongoose.model("Verify", verify);
