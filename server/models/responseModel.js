const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  surveyId: {
    type: ObjectId,
    required: true,
  },
  userId: {
    type: ObjectId,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  ageCategory: {
    type: String,
    required: true,
  },

  responses: [
    {
      questionId: {
        type: ObjectId,
        required: true,
      },
      response: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Response", responseSchema);
