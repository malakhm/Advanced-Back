import multer from 'multer';

const storageForCompany = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/company/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const storageForDesign = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/design/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export const uploadForCompany = multer({ storage: storageForCompany });
export const uploadForDesign = multer({ storage: storageForDesign });
