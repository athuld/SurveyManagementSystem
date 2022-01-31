const router = require("express").Router();
const Response = require("../models/responseModel");
const Surveys = require("../models/surveyModel");
const verify = require("./verifyToken");

/**
 * ADD NEW SURVEYS
 *
 * Can be used to add new surveys to the db
 *
 * ROUTE: PRIVATE
 * URL = /api/admin/survey/add
 */

router.post("/add", verify, async (req, res) => {
  const { title, description, questions } = req.body.data;
  const survey = new Surveys({ title, description, questions });
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
 * RETURN ALL SURVEYS
 *
 * Can be used to get all the surveys
 *
 * ROUTE: PRIVATE
 * URL = /api/admin/survey/fetch
 */

router.get("/fetch/", verify, async (req, res) => {
  try {
    const surveyDetails = await Surveys.find({}).sort({ createdAt: -1 });
    if (surveyDetails.length === 0) {
      res.status(200).json({ message: "no records" });
    } else {
      res.json(surveyDetails);
    }
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
    const responseData = new Response(req.body.data);
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

module.exports = router;
