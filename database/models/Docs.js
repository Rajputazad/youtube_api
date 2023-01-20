const mongoose = require("mongoose")
const schema = new mongoose.Schema({
  DocsfileName :
    {
        type: String
    },
    Url:{
        type: String
    },
    
},{timestamps:true})

module.exports =mongoose.model("Docs",schema);