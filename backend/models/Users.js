const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: { type: String },
});
// Add timestamps to track when a document is created or updated
usersSchema.set("timestamps", true);

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
