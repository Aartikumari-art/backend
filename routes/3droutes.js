const express = require("express");
const router = express.Router();

const upload = require("../utilis/fileUploader"); 
const { handleCreateModel, handleGetObjects, handleGetObjectById, handleDeleteObject, handleUpdateObject } = require("../controllers/3dControl");


router.post("/add", upload.single("file"), handleCreateModel);
router.get("/get-objects", handleGetObjects);
router.get("/get-by-id/:id", handleGetObjectById);
router.delete("/delete/:id", handleDeleteObject);
router.post("/update/:id", upload.single("file"), handleUpdateObject);
module.exports = router;
