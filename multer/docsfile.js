const multer = require("multer");
const fs = require("fs");
const path = require("path");


const uploadfile = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const limits = {fileSize: 5 * 1024 * 1024,};
      cb(null,"./assets/Doc");
    },
   
    filename: (req, file, cb) => {
    //   console.log(file);
      const ext = path.extname(file.originalname);
    //   if (ext) {
        cb(null, Date.now() + "--" + file.originalname);
    //   } else {
    //     console.log("unsupported format");
    //     cb(new Error("Only Docs are allowed"));
    //   }
    },
  }),
});

module.exports=uploadfile;