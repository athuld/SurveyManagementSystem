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
 * FETCH ALL USER DETAILS
 *
 * returns all the users for admin
 *
 * ROUTE: PRIVATE
 * URL: /api/user/fetch
 *
 */

router.get("/fetch", verify, async (req, res) => {
  try {
    const userDetails = await User.find({
      email: { $not: { $eq: "admin@survey.com" } },
    }).select("-password");
    res.json(userDetails);
  } catch (error) {
    res.send(error);
  }
});

/***********************************************************************/

/**
 * DELETE A USER
 *
 * delete a user
 *
 * ROUTE: PRIVATE
 * URL: /api/user/:userId
 *
 */

router.delete("/:userId", verify, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ id: user._id });
  } catch (err) {
    res.send(err);
  }
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

  // Assign Avatar
  const getAvatar = () => {
    if (relationship === "grandmother") {
      return "grandma.png";
    }
    if (relationship === "grandfather") {
      return "grandpa.png";
    }
    if (memberAge >= 60) {
      if (relationship === "brother" || relationship === "father") {
        return "grandpa.png";
      }
      return "grandma.png";
    }
    if (memberAge >= 30) {
      if (relationship === "brother" || relationship === "father") {
        return "man.png";
      }
      return "woman.png";
    }
    if (memberAge >= 18) {
      if (relationship === "brother" || relationship === "father") {
        return "teenboy.png";
      }
      return "teengirl.png";
    } else {
      if (relationship === "brother") {
        return "boy.png";
      }
      return "girl.png";
    }
  };

  const memberDetails = new User({
    firstName,
    lastName,
    relationship,
    dob,
    age: memberAge,
    avatar: getAvatar(),
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
