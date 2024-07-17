const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  //TODO : this is temporary token for testing without cookie
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTdkYzM3N2RhNTc2YzMzMjk2YzhmNCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMTIyODQzM30.tKgWFxfRz-mWMHaPL1y2Yg3U346Y0fwnng05rNPtOnU"
  return token;
};
