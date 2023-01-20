const mongoose = require("mongoose");
// const Schema = mongoose.Schema; 

const UserNotificationSchema = new mongoose.Schema({
    Email: {
      type: String,
      ref: "Email"
    },
    registration_ids: [],
    readAt: { type: Date, required: true, default: Date.now() }
  });

module.exports =mongoose.model("UserNotification",UserNotificationSchema);