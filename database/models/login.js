const mongoose = require("mongoose");
const LoginSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      require: true,
    },
    Email: {
      type: String,
      unique: [true, "that Email is taken. try another"],
      required: [true, "User Email required"],
    },
    Username: {
      type: String,
      require: true,
      unique: [true, "that Username is taken. try another"],
    },
    Password: {
      type: String,
      require: true,
      // unique: [true, "Somethig went wrong"],
      // select: false
    },
    photoUrl: {
      type: String,
    },
    Gtoken: {
      type: String,
    },
    provider: {
      type: String,
    },
    token: [{
      type: String,
      require: true
  }],
    membership:{
      type: String,
      require: true,
    },Role_id:{
      type: Number,
      require: true,
    },
    verify:{
      type:Boolean,
      require:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Social_LoginDetails", LoginSchema);
