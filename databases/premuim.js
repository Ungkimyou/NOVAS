const mongoose = require("mongoose");

const PermiumSchema = mongoose.Schema({
 _id: mongoose.Schema.Types.ObjectId,
  username: String,
  userID: String,
  time: String
});

module.exports = mongoose.model("Permuim", PermiumSchema);
