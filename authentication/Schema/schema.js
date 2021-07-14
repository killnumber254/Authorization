const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: Number,
  username: {
    type: String,
    uniqe: true,
    required: true,
  },
  password: {
    type: Schema.Types.Mixed,
    required: true,
  },
  token: Schema.Types.Mixed,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
