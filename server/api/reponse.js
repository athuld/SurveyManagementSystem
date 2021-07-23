const router = require("express").Router();
const verify = require("./verifyToken");
const Response = require("../models/responseModel");

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

module.exports = router;
