const User = require("../models/user");
const verify = require("./verifyToken");
const router = require("./auth");

router.get("/", verify, async (req, res) => {
  const userDetails = await User.findById({ _id: req.user._id }).select(
    "-password"
  );
  res.json(userDetails);
});

module.exports = router;
