const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    Username : {
        type: String,
        // unique : true,
        // required : true
    },
    Name : {
        type: String,
        unique : false,
        // required : true
    },
    Email : {
        type: String,
        unique : false,
        // required : true
    },
    Mobile : {
        type: String,
        unique : false,
        // required : true
    },
    image_file :
    {
        type: String,
    },
    ImageSize :
    {
        type: String
    },
    Src:{
        type: String,
    }
    
},{timestamps:true})

module.exports =mongoose.model("Userprofiles",schema);