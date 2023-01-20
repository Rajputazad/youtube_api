const multer = require("multer");
const fs = require("fs");
const path = require("path");

// console.log(filename);
const uploadfile = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const limits = {fileSize: 5 * 1024 * 1024,};
      // fs.promises.mkdir("./assets/Files/"+filename, { recursive: true }).catch(console.error),
      // cb(null,"./assets/Files/"+req.body.Username);
      // console.log(filename);
      cb(null,"./assets/Files");
    },
   
    filename: (req, file, cb) => {
      // console.log(file);
      const ext = path.extname(file.originalname);
      if (ext) {
        cb(null, Date.now() + "--" + file.originalname);
      } else {
        console.log("unsupported format");
        cb(new Error("Only images are allowed"));
      }
    },
  }),
});



module.exports=uploadfile;