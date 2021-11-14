const router = require("express").Router();
const verify = require("./verifyToken");
const Complaint = require("../models/complaintModel");
const User = require("../models/userModel");

/**
 * POST a new complaint
 *
 * Add a new complaint from the user to the db
 *
 * ROUTE: PRIVATE
 * URL: /api/user/complaint/new
 *
 */
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

/*******************************************************************/

/**
 * GET all complaints for admin
 *
 * Retrieve all the complaints
 *
 * ROUTE: PRIVATE
 * URL: /api/admin/complaint/get
 *
 */

router.get("/get", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  const isAdmin = user.email === "admin@survey.com" ? true : false;
  try {
    if (isAdmin) {
      const complaints = await Complaint.find();
      res.status(200).json(complaints);
    } else res.status(404).json({ "message": "Unauthorised" })
  } catch (err) {
    res.status(400).json(err);
  }
});

/*******************************************************************/

/**
 * GET all complaints based on the statusType
 *
 * Retrieve all the statusType complaints
 *
 * ROUTE: PRIVATE
 * URL: /api/user/complaint/get/:statusType
 *
 */

router.get("/get/:statusType", verify, async (req, res) => {
  const userId = req.user._id;
  try {
    const statusComplaints = await Complaint.find({
      userId: userId,
      "complaintRes.status": req.params.statusType,
    }).sort('-date');
    res.status(200).json(statusComplaints);
  } catch (err) {
    res.status(400).json(err);
  }
});

/*******************************************************************/

/**
 * UPDATE the complaint resolution body
 *
 * Admin route which help
 *
 * ROUTE: PRIVATE
 * URL: /api/admin/complaint/update/:complaintId
 */
router.post("/update/:complaintId", verify, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    const isAdmin = user.email === "admin@survey.com" ? true : false;
    if (isAdmin) {
      const updatedComplaint = await Complaint.findOneAndUpdate(
        { _id: req.params.complaintId },
        req.body.data,
        { new: true }
      );
      res.status(200).json(updatedComplaint);
    } else res.status(404).json({ message: "Unauthorised" });
  } catch (err) {
    res.status(400).json(err);
  }
});

/*******************************************************************/

module.exports = router;
