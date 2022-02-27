const router = require("express").Router();
const verify = require("./verifyToken");
const Response = require("../models/responseModel");
const Survey = require("../models/surveyModel");

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

module.exports = router;
