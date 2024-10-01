import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,"./public/temp")
    },
    filename: function (req, file, cb) {
     
      cb(null, file.originalname)
    }
  })
    // File type validation
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
      return cb(null, true);
  } else {
      cb(new Error("Only images (jpg, jpeg, png) are allowed!"));
  }
};

  
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Limit of 5MB
});
  
