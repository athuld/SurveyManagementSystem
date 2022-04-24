const router = require("express").Router();
const verify = require("./verifyToken");
const Response = require("../models/responseModel");
const Survey = require("../models/surveyModel");
const User = require("../models/userModel");

/**
 * RETURN SPECIFIC SURVEY RESPONSES
 *
 * Can be used to get all the responses of a paricular survey
 *
 * ROUTE: PRIVATE
 * URL = /api/survey/response/:surveyId
 */

router.get("/:surveyId", verify, async (req, res) => {
  try {
    const responseData = await Response.find({
      surveyId: req.params.surveyId,
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json(error);
  }
});

/**
 * CHANGE SURVEY ACCEPT STATUS
 *
 * Can be used to change survey response status
 *
 * ROUTE: PRIVATE
 * URL = /api/survey/response/update/accept/:surveyId
 */

router.post("/update/accept/:surveyId", verify, async (req, res) => {
  try {
    const updatedRecord = await Survey.findOneAndUpdate(
      { _id: req.params.surveyId },
      req.body.data,
      { new: true }
    );
    res.status(200).json(updatedRecord.isAcceptingResponse);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

/**
 * CHECK IF A USER HAS ALREADY RESPONDED TO SURVEY
 *
 * User can only respond to a survey only one time, check if they have already done it
 *
 * ROUTE: PUBLIC
 * URL = /api/survey/response/user/is_valid/?surveyId&userId
 */

router.get("/user/is_valid/", async (req, res) => {
  try {
    const surveyId = req.query.surveyId;
    const userId = req.query.userId;
    const result = await Response.exists({ surveyId, userId });
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

/**
 * UPDATE THE USER SURVEY COUNT
 *
 * User survey count is updated after every response for graph
 *
 * ROUTE: PUBLIC
 * URL = /api/survey/response/user/update_count/:userId
 */

router.post("/user/update_count/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const isUser = await User.exists({ _id: userId });
    isUser
      ? await User.findOneAndUpdate({ _id: userId }, { $inc: { surveys: 1 } })
      : await User.findOneAndUpdate(
          { "members._id": userId },
          { $inc: { "members.$.surveys": 1 } }
        );
    res.status(200).json({ message: "Count Updated" });
  } catch (err) {
    res.status(400).json({ message: "error" });
  }
});

/**
 * GET FILTERED RESPONSES
 *
 * Retrun filtered responses to admin according to params
 *
 * ROUTE: PUBLIC
 * URL = /api/survey/response/admin/fetch/?distict&gender&age
 */
router.get("/admin/fetch", async (req, res) => {
  const { surveyId, district, gender, age } = req.query;
  try {
    let query = { surveyId, district, gender, ageCategory: age };
    if (district === "All") {
      delete query.district;
    }
    if (gender === "All") {
      delete query.gender;
    }
    if (age === "All") {
      delete query.ageCategory;
    }
    const data = await Response.find(query);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: "error" });
  }
});

module.exports = router;
