// uploadMiddleware.js
import multer from "multer";
import path from "path";

// Set storage engine
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 6 * 1024 * 1024 }, // Limit file size to 6MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png") {
      return cb(null, true); // Accepted file
    } else {
      cb(new Error("Error: Only PDF files & PNG images are allowed!"));
    }
  },
});

// Export the middleware
export default upload;
