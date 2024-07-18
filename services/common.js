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
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTdhODA0OTVmMGU4ZDY1ZjM3NDcxMCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIxMzE3MTI1fQ.sbwXzkuXdGxma-VYEBQ0CdI5g8QW_aJXstbjkiaTsHA'
  return token;
};
