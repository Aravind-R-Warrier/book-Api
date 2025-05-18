import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/'); // make sure this folder exists
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

export const upload = multer({ storage });
