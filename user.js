var { Schema, model } = require("mongoose");

var user = new Schema({
  username: { type: String, unique: true, required: true },
  userpassword: { type: String, required: true },
  usermail: { type: String, unique: true, required: true },
  roles: [{ type: String, ref: "Role" }],
});

module.exports = model("user", user);
