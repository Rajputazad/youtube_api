const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    Username: {
        type: String,
        // unique : true,
        required: true
    },
    VideoTitle: {
        type: String,
        required: true

    },
    VideoUrl: {
        type: String,
        required: true
    },
    Views: {
        type: String,
        required: true
    },
    ChannelImage:
    {
        type: String,
        required: true
    },
    ChannelName:
    {
        type: String,
        required: true

    },
    ChannelImageUrl: {
        type: String,
        required: true
    },
    Thumbnail: {
        type: String,
        required: true
    },
    Likes: {
        type: String,
        required: true
    },
    Dislikes: {
        type: String,
        required: true
    },
    Subscribers: {
        type: String,
        required: true
    },

}, { timestamps: true })

module.exports = mongoose.model("YoutubeVideos", schema);