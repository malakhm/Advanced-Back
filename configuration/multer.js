import multer from 'multer';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Define the destination for uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + file.originalname); // Generate a unique filename for each file
    }
  });
  
  const upload = multer({ storage: storage });

 export { upload}
