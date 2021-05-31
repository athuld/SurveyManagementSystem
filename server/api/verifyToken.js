const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.autherisation.split(" ")[1];

  if (!token) return res.status(403).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
