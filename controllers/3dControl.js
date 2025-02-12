const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const { createModel, getModels, modelModel } = require("../models/GLBModel");
const { getBaseUrl } = require("../utilis/helper");

const handleCreateModel = async (req, res) => {
  try {
    const { title, description } = req.body;

   
    if (!req.file) {
      return res
        .status(400)
        .json({ status: 400, message: "GLB file is required" });
    }

 
    if (!title || !description) {
      return res
        .status(400)
        .json({ status: 400, message: "Title and description are required" });
    }

    
    const fileUrl = `${getBaseUrl(req)}/uploads/${req.file.filename}`;

    const newModel = await createModel({
      title,
      description,
      file: fileUrl, 
    });

    if (!newModel) {
      return res
        .status(400)
        .json({
          status: 400,
          message: "Error occurred while creating the model",
        });
    }

    return res
      .status(200)
      .json({
        status: 200,
        message: "3D model created successfully",
        data: newModel,
      });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err.message,
    });
  }
};


const handleGetObjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const models = await getModels({ page, limit });

    if (!models.length) {
      return res.status(404).json({
        status: 404,
        message: "No 3D models found",
      });
    }

    
    const Model = models.map((model) => {
      const d = model.toObject();
      delete d.__v;

      if (d.file && !d.file.startsWith("http")) {
        d.file = `${getBaseUrl()}/${d.file}`;
      }

      return d;
    });

    return res.status(200).json({
      status: 200,
      message: "3D models fetched successfully",
      data: Model,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err.message,
    });
  }
};



const handleGetObjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const model = await modelModel.findById(id);

    if (!model) {
      return res.status(404).json({
        status: 404,
        message: "3D model not found",
      });
    }

    const d = model.toObject();
    delete d.__v;

    if (d.file && !d.file.startsWith("http")) {
      d.file = `${getBaseUrl()}/${d.file}`;
    }

    return res.status(200).json({
      status: 200,
      message: "3D model fetched successfully",
      data: d,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err.message,
    });
  }
};


const handleDeleteObject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedModel = await modelModel.findByIdAndDelete(id);

    if (!deletedModel) {
      return res.status(404).json({
        status: 404,
        message: "3D model not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "3D model deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err.message,
    });
  }
};


const handleUpdateObject = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  console.log("body object:",body); 

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    if (req.file) {
      console.log(req.file); 

      body.file = `${getBaseUrl()}/uploads/${req.file.filename}`;
    }

    const updatedPost = await modelModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res.status(404).json({
        status: 404,
        message: "Object not found or unable to update.",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Object updated successfully",
      data: updatedPost,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err.message,
    });
  }
};


module.exports = {
  handleCreateModel,
  handleGetObjects,
  handleGetObjectById,
  handleDeleteObject,
  handleUpdateObject,
};