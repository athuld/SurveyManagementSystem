const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          default: "radio",
        },
        options: [
          {
            option: {
              type: String,
              required: true,
            },
          },
        ],
        required: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Surveys", surveySchema);
