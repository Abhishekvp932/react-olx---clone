import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    // keep original extension
    const ext = path.extname(file.originalname); 
    const name = Date.now() + '-' + Math.round(Math.random()*1E9) + ext;
    cb(null, name);
  }
});

export const upload = multer({ storage });
