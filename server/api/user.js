const User = require("../models/userModel");
const verify = require("./verifyToken");
const router = require("./auth");

/**
 * FETCH USER DETAILS
 *
 * After Login the user details needs to be fetched
 *
 * ROUTE: PRIVATE
 * URL: /api/users/
 *
 */
router.get("/", verify, async (req, res) => {
  const userDetails = await User.findById({ _id: req.user._id }).select(
    "-password"
  );
  res.json(userDetails);
});

/*********************************************************************/

/**
 * ADD MEMBERS
 *
 * Can be used to add new subdocument to the subdocument
 * array field which is the memnbers array
 *
 * ROUTE: PRIVATE
 * URL: /api/user/members/add
 */

router.post("/members/add/", verify, (req, res) => {
  const userId = req.user._id;
  const { firstName, lastName, relationship, dob } = req.body.data;

  // Calculate member age //
  let currDay = new Date();
  let memberDob = new Date(dob);
  let memberAge = currDay.getFullYear() - memberDob.getFullYear();
  let m = currDay.getMonth() - memberDob.getMonth();
  if (m < 0 || (m === 0 && currDay.getDate() < memberDob.getDate())) {
    memberAge--;
  }

  const memberDetails = new User({
    firstName,
    lastName,
    relationship,
    dob,
    age: memberAge,
  });

  if (userId) {
    User.findByIdAndUpdate(
      userId,
      { $push: { members: memberDetails } },
      { new: true },
      (err, model) => {
        if (err) {
          res.send(err);
          res.json({ message: "Error in adding record" });
        }
        res.json(model);
      }
    );
  } else res.json({ message: "Unauthorised" });
});

/*******************************************************************/

/**
 * DELETE MEMBERS
 *
 * Can be used to delete the subdocument array
 * which is the  family members array
 *
 * Route: Private
 * Url: /api/user/members/delete/:memberId
 */

router.delete("/members/delete/:memberId", verify, (req, res) => {
  const userId = req.user._id;
  const memberId = req.params.memberId;
  if (userId && memberId) {
    User.findByIdAndUpdate(
      userId,
      { $pull: { members: { _id: memberId } } },
      { new: true },
      (err, model) => {
        if (err) {
          res.send(err);
          res.json({ message: "Error in deleting record" });
        }
        res.json(model);
      }
    );
  } else res.json({ message: "Unauthorised" });
});

/*********************************************************************/

module.exports = router;
