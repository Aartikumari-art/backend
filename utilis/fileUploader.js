const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the upload folder
    cb(null, path.join(__dirname, "../uploads")); // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    // Use timestamp to avoid file name collisions
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with timestamp + extension
  },
});

// Configure Multer with file size and type validation
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Limit file size to 100 MB (adjust as needed)
  fileFilter: (req, file, cb) => {
    // Only accept .glb files
    if (
      file.mimetype === "model/gltf-binary" ||
      path.extname(file.originalname).toLowerCase() === ".glb"
    ) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error("Invalid file type, only .glb files are allowed!"), false); // Reject non-.glb files
    }
  },
});

module.exports = upload;
