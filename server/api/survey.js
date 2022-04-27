const router = require("express").Router();
const Response = require("../models/responseModel");
const Surveys = require("../models/surveyModel");
const verify = require("./verifyToken");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const Complaints = require("../models/complaintModel.js");

/**
 * ADD NEW SURVEYS
 *
 * Can be used to add new surveys to the db
 *
 * ROUTE: PRIVATE
 * URL = /api/admin/survey/add
 */

router.post("/add", verify, async (req, res) => {
  const { title, description, district, gender, age, questions } =
    req.body.data;
  const survey = new Surveys({
    title,
    description,
    district,
    gender,
    age,
    questions,
  });
  try {
    await survey.save();
    res.status(200).json({ message: "Survey added" });
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * DELETE A SURVEY
 *
 * Can be used to delete a survey
 *
 * ROUTE: PRIVATE
 * URL = /api/admin/survey/:surveyId
 */

router.delete("/:surveyId", verify, async (req, res) => {
  try {
    const survey = await Surveys.findByIdAndRemove(req.params.surveyId);
    await Response.deleteMany({ surveyId: req.params.surveyId });
    res.status(200).json({ id: survey._id });
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * RETURN SURVEYS
 *
 * Can be used to get all the surveys / survey for users
 *
 * ROUTE: PRIVATE
 * URL = /api/admin/survey/fetch
 */

router.get("/fetch/", verify, async (req, res) => {
  try {
    let surveyDetails = [];
    const user = await User.findOne({ _id: req.user._id });

    if (user.email === "admin@survey.com") {
      surveyDetails = await Surveys.find({}).sort({ createdAt: -1 });
    } else {
      surveyDetails = await Surveys.find({
        $and: [
          { $or: [{ district: user.district }, { district: "All" }] },
          { isAcceptingResponse: true },
        ],
      }).sort({ createdAt: -1 });
    }

    surveyDetails.length === 0
      ? res.status(200).json({ message: "no records" })
      : res.json(surveyDetails);
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * RETURN SPECIFIC SURVEY
 *
 * Can be used to fetch the specific survey
 *
 * ROUTE: PUBLIC
 * URL = /api/admin/survey/:surveyId
 */

router.get("/:surveyId", async (req, res) => {
  try {
    const surveyDetails = await Surveys.findById(req.params.surveyId);
    res.json(surveyDetails);
  } catch (err) {
    res.json(err);
  }
});

/**
 * INSERT NEW RESPONSE
 *
 * Can be used to insert the response of the survey to db
 *
 * Route :PUBLIC
 * URL = /api/admin/survey/response
 */

router.post("/response", async (req, res) => {
  try {
    const data = req.body.data;
    const userData = await User.findOne({ _id: data.userId });
    let ageCategory, gender;
    if (userData != null) {
      gender = userData.gender;
      ageCategory = userData.ageCategory;
    } else {
      let memberData = await User.aggregate([
        { $unwind: "$members" },
        { $match: { "members._id": mongoose.Types.ObjectId(data.userId) } },
      ]);
      ageCategory = memberData[0].members.ageCategory;
      gender = memberData[0].members.gender;
    }
    const finalData = { gender, ageCategory, ...data };
    const responseData = new Response(finalData);
    await responseData.save();
    res.status(200).json({ message: "response recorded" });
  } catch (err) {
    res.json(err);
  }
});

/**
 * GET NO OF RESPONSES
 *
 * Can be used to get the number of responses for a particular survey
 *
 * ROUTE : PRIVATE
 * URL = /api/admin/survey/responseCount/:surveyId
 */

router.get("/responseCount/:surveyId", verify, async (req, res) => {
  try {
    const count = await Response.countDocuments({
      surveyId: req.params.surveyId,
    });
    res.status(200).json(count);
  } catch (error) {
    res.send(error);
  }
});

/**
 * GET COUNT DETAILS FOR ADMIN DASHBOARD
 *
 * Can be used to get the number of surveys,complaints and users
 *
 * ROUTE : PRIVATE
 * URL = /api/admin/survey/dashboard/getdetails
 */

router.get("/dashboard/getdetails", verify, async (req, res) => {
  try {
    const userCount = await User.countDocuments({});
    const surveyCount = await Surveys.countDocuments({});
    const complaintsCount = await Complaints.countDocuments({});
    res.status(200).json({userCount, surveyCount, complaintsCount});
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
