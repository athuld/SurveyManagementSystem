const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  ageCategory: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  surveys: {
    type: Number,
    default: 0,
  },
  relationship: {
    type: String,
    default: null,
  },
  members: [
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      relationship: {
        type: String,
        required: true,
      },
      dob: {
        type: Date,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      ageCategory: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
      surveys: {
        type: Number,
        default: 0,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
