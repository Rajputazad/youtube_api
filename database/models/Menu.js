const mongoose = require("mongoose")
const schema = new mongoose.Schema({
  Model0:[],
  Model1:[]
},{timestamps:true})

module.exports =mongoose.model("Menus",schema);