const express = require("express");
const {
  createUser,
  loginUser,
  checkAuth,
  googleAuthCallback,
} = require("../controllers/Auth");
const passport = require("passport");

const router = express.Router();
//  /auth is already added in base path
router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), checkAuth)
  .get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  )
  .get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    googleAuthCallback
  );

exports.router = router;
