const router = require("express").Router();
const verify = require("./verifyToken");
const Complaint = require("../models/complaintModel");

router.post("/new", verify, async (req, res) => {
  const userId = req.user._id;
  const complaintBody = req.body.data;
  const complaint = new Complaint({ userId, ...complaintBody });
  try {
    await complaint.save();
    res.status(200).json({ message: "complaint recorded" });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
