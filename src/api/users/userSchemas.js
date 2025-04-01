"use strict";

const { default: mongoose } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  id: { type: String, required: true, default: uuidv4() },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
