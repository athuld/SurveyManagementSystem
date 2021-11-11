const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  complaintBody: {
    subject: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    issue: {
      type: String,
      requred: true,
    },
  },
  complaintRes: {
    status: {
      type: String,
      default: "Pending",
    },
    resolution: {
      type: String,
      default: "",
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Complaint", complaintSchema);
