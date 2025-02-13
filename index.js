const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const upload = require("./utilis/fileUploader"); 

const app = express();

app.use(express.json());
app.use(cors());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const MONGO_URI = process.env.MONGO_URI;


const userRoute = require("./routes/userRoutes.js");
const threeDRoute = require("./routes/3droutes.js");


try {
 mongoose.connect(MONGO_URI, {
  
   tlsAllowInvalidCertificates: true,
 });

  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}

app.get("/", (req, res) => {
  res.send("Node server up and running.");
});


app.use("/user", userRoute);
app.use("/three", threeDRoute);


app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded!" });
  }
  res.json({ message: "File uploaded successfully!", file: req.file.filename });
});

// Start server 
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
