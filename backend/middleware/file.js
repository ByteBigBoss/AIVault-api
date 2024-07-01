const multer = require("multer");

const MIME_TYPE_OBJ = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const isValid = MIME_TYPE_OBJ[file.mimetype];
        let error = new Error("Invalid mime type");
        if(isValid){
            error = null;
        }
        cb(error,"images");
    },
    filename:(req,file,cb)=>{
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const exe = MIME_TYPE_OBJ[file.mimetype];
        cb(null,name+"-"+Date.now()+"."+exe);
    }
});

module.exports = multer({storage:storage}).single("image");