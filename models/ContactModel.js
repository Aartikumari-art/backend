const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const feedbackSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: false, 
    },
  },
  { timestamps: true }
);


const feedbackModel = model("Feedback", feedbackSchema);


const createFeedback = async (body) => {
  const newFeedback = await feedbackModel.create(body);
  return newFeedback;
};


const getFeedbacks = async (pagination) => {
  const startIndex = (pagination.page - 1) * pagination.limit;

  const feedbacks = await feedbackModel
    .find()
    .skip(startIndex)
    .limit(pagination.limit);
  return feedbacks;
};

module.exports = {
  createFeedback,
  getFeedbacks,
  feedbackModel,
};
