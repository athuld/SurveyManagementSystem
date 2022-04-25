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
      let query;
      let initRender = true;
      if (Object.keys(req.query).length === 0) {
        query = {};
      } else {
        initRender = false;
        const { urgency, area, status } = req.query;
        query = {
          "complaintBody.urgency": urgency,
          "complaintBody.area": area,
          "complaintRes.status": status,
        };
        if (urgency === "All") {
          delete query["complaintBody.urgency"];
        }
        if (area === "All") {
          delete query["complaintBody.area"];
        }
        if (status === "All") {
          delete query["complaintRes.status"];
        }
      }
      const complaints = await Complaint.find(query);
      if (complaints.length === 0) {
        initRender
          ? res.status(200).json({ message: "no records" })
          : res.status(200).json({ message: "no filter records" });
      } else {
        res.status(200).json(complaints);
      }
    } else res.status(404).json({ message: "Unauthorised" });
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
    }).sort("-date");

    if (statusComplaints.length === 0) {
      res.status(200).json({ message: "no records" });
    } else {
      res.status(200).json(statusComplaints);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

/*******************************************************************/

/**
 * UPDATE the complaint resolution body
 *
 * Admin route which help to add a resoltion to the complaint
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

/**
 * DELETE a particular Complaint
 *
 * Admin route to delete a complaint
 *
 * ROUTE: PRIVATE
 * URL: /api/admin/complaint/delete/:complaintId
 * */
router.delete("/delete/:complaintId", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  const isAdmin = user.email === "admin@survey.com" ? true : false;
  if (isAdmin) {
    try {
      const user = await Complaint.findByIdAndDelete(req.params.complaintId);
      res.status(200).json({ id: user._id });
    } catch (err) {
      res.send(err);
    }
  } else res.status(404).json({ message: "Unauthorised access" });
});

/*******************************************************************/

module.exports = router;
