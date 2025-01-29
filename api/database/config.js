const multer = require("multer");
const path=require('path')
const upload = multer({ 
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      console.log(req.body)
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext !== '.pdf') {
        return cb(new Error('Only PDFs are allowed'), false);
      }
      cb(null, true);
    },
    limits: {
      fileSize: 10 * 1024 * 1024 // 10MB file size limit
    }
  });
  
module.exports={upload}