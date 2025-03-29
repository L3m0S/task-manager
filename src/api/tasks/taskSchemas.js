"use strict";

const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    default: "TODO",
    enum: ["TODO", "IN_PROGRESS", "DONE"],
  },
  userId: String,
});

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
