const datas = require("./database/models/Video");
const file = require("./multer/fileUpload");
const fs = require("fs");
const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
app.use(cookieParser())
// const auth= require("./middleware/auth")
const { promisify } = require("util");
const { stat, createReadStream } = require("fs");
const { pipeline } = require("stream");
const fileInfo = promisify(stat);
module.exports = function (router) {


  router.get("/Video/:name",async(req,res)=>{
    // var users= await datas.find()
   try {
	    var Filestream = `./assets/Files/${req.params.name}`
			const { size } = await fileInfo(Filestream);
			const range = req.headers.range;
			// console.log(size);
			if (range) {
				/** Extracting Start and End value from Range Header */
				let [start, end] = range.replace(/bytes=/, "").split("-");
				start = parseInt(start, 10);
				end = end ? parseInt(end, 10) : size - 1;

				if (!isNaN(start) && isNaN(end)) {
					start = start;
					end = size - 1;
				}
				if (isNaN(start) && !isNaN(end)) {
					start = size - end;
					end = size - 1;
				}

				// Handle unavailable range request
				if (start >= size || end >= size) {
					// Return the 416 Range Not Satisfiable.
					res.writeHead(416, {
						"Content-Range": `bytes */${size}`,
					});
					return res.end();
				}

				/** Sending Partial Content With HTTP Code 206 */
				res.writeHead(206, {
					"Content-Range": `bytes ${start}-${end}/${size}`,
					"Accept-Ranges": "bytes",
					"Content-Length": end - start + 1,
					"Content-Type": "audio/mp4",
				});

				let readable = createReadStream(Filestream, { start: start, end: end });
				pipeline(readable, res, (err) => {
					console.log(err);
				});
			} else {
				res.writeHead(200, {
					"Content-Length": size,
					"Content-Type": "audio/mp4",
				});

				let readable = createReadStream(Filestream);
				pipeline(readable, res, (err) => {
					console.log(err);
				});
				//   res.json({success:true,data:Audiodata})
			}
} catch (error) {
  res.json({ success: false, message: "something went wrong" });
  console.log(error);
}
  })




  router.get("/Users",async (req, res) => {
    try {
 var users= await datas.find()
      // console.log(users)
      res.json({ success: true, data:users});
    } catch (error) {
      res.json({ success: false, message: "something went wrong" });
      console.log(error);
    }
  });


  router.get("/SendVideo/:_id", async (req, res) => {
    // console.log(req.params)
    try {
      // let userdatas = req.body
      // console.log(userdatas)
      // console.log(req.body.Username)
      let data = await datas.findById(req.params._id);
      res.json({ success: true, data:data});
      // console.log(data)
    } catch (error) {
        res.json({ success: false, message: "something went wrong" });

    }
  });

  router.post("/Video", file.fields([
    {name:"Video",maxCount:1},
    {name:"Thumbnail",maxCount:1},
    {name:"ChannelImage",maxCount:1},
  ]), async (req, res) => {
    try {
//  console.log(req.files.Video.filename);
  const  data={
    Username:req.body.Username,
    VideoTitle:req.body.VideoTitle ,
    VideoUrl:`http://localhost:5000/Video/${req.files.Video[0].filename}` ,
    Views:req.body.Views,
    ChannelImage:req.files.ChannelImage[0].originalname,
    ChannelName:req.body.ChannelName,
    ChannelImageUrl:`http://localhost:5000/Video/${req.files.ChannelImage[0].filename}` ,
    Thumbnail:`http://localhost:5000/Video/${req.files.Thumbnail[0].filename}` ,
    Likes: req.body.Likes,
    Dislikes: req.body.Dislikes,
    Subscribers:req.body.Subscribers
    }
// console.log(req.body);
// console.log(req.files);

      let upload = await datas(data);
      let result = await upload.save();
      res.json({ success: true, message: "Video Successfully uploaded" });
    } catch (error) {
      res.json({ success: false, message: "something went wrong" });
      console.log(error);
    }
  });

  router.delete("/Profiledelete/:_id", async (req, res) => {
    let img = await datas.findOne(req.params);
    let delimg = img.image_file;
    try {
      fs.unlinkSync(`${__dirname}/assets/images/` + delimg);
    } catch (error) {}
    let data = await datas.deleteOne(req.params);
    if (data.deletedCount == 0) {
      console.log("Data not found!");
      res.json({ success: false, message: "Data not found!" });
    } else {
      res.json({ success: true, message: "Profile Successfully deleted" });
    }
  });

  router.put("/Profileupdate/:_id",file.single("image_file"),
  async (req, res) => {

      try {
        let data = await datas.findById(req.params);
        let delimg = data.image_file;
      
        // console.log(delimg) 
        // console.log(req.params);
        // console.log(data);
        if (!data) {
          console.log("id not found");
          res.status(404).json("id not found");
        } else {
         try {
          let upimg=req.file.filename
          if(upimg){
            fs.unlinkSync(`${__dirname}/assets/images/` + delimg);
          }
       }
 catch (error) {
  // console.log(error);
	
}
         try {
          let upimg=req.file.filename
           req.body.image_file = upimg;
         } catch (error) {
          //  console.log(error);
         }
         let data = await datas.updateOne(req.params, { $set: req.body });
         if (data.modifiedCount==1) {
          res.json({ success: true, message: "Profile and details updated!" });
          console.log("Profile and details updated!");
         }
       }
     } catch (error) {
      res.json({ success: false, message: "something went wrong" });
      console.log(error);
        }
    } 
  );

  return router;
};

