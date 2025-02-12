const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const modelSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    file: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true }
);


const modelModel = model("3DModel", modelSchema);


const createModel = async (body) => {
  const newModel = await modelModel.create(body);
  return newModel;
};


const getModels = async (pagination) => {
  const startIndex = (pagination.page - 1) * pagination.limit;
  const models = await modelModel
    .find()
    .skip(startIndex)
    .limit(pagination.limit)
    .exec();
  return models;
};

module.exports = {
  createModel,
  getModels,
  modelModel,
};
