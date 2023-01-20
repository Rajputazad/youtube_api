const multer = require("multer");
const fs = require("fs");
const path = require("path");


const uploadaudio = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,"./assets/Audio");
    },
   
    filename: (req, file, cb) => {
    //   console.log(file);
      const ext = path.extname(file.originalname);
      if (ext == ".mp3" || ext == ".mpeg" ) {
        cb(null, Date.now() + "--" + file.originalname);
      } else {
        console.log("unsupported format");
        cb(new Error("Only Audio are allowed"));
      }
    },
  }),
});

module.exports=uploadaudio;