const router = require("express").Router();
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
    const savedSurvey = await survey.save();
    res.status(200).json(savedSurvey);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
