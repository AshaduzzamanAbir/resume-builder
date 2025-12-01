import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

// File Filter

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetypes)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg .jpg .png file are allowed in this Formets "));
  }
};

const upload = multer({ storage, fileFilter });
export default upload;
