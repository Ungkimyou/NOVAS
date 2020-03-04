const mongoose = require("mongoose");

const suggestionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  userID: String,
  suggestion: String,
  code: Number
});

module.exports = mongoose.model("Suggestion", suggestionSchema);
