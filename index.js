const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const productRouter = require("./routes/Product");
const categoryRouter = require("./routes/Category");
const brandRouter = require("./routes/Brand");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");
const cors = require("cors");
const { User } = require("./models/User");
const { sanitizeUser, isAuth, cookieExtractor } = require("./services/common");

const SECRET_KEY = "SECRET_KEY";
// JWT options
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY; // TODO: should not be in code;

app.use(express.static("dist"));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
app.use(passport.authenticate("session"));
app.use(express.json());
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

async function main() {
  await mongoose.connect(
    "mongodb+srv://chhavigupta1705:Lqw16Ah9vxTMJmLY@zaroorthai.kmn803r.mongodb.net/?retryWrites=true&w=majority&appName=ZaroortHai"
  );
  console.log("db connected");
}

main().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({ status: "success" });
});

app.use("/products", isAuth(), productRouter.router);
app.use("/categories", isAuth(), categoryRouter.router);
app.use("/brands", isAuth(), brandRouter.router);
app.use("/users", isAuth(), userRouter.router);
app.use("/auth", authRouter.router);
app.use("/cart", isAuth(), cartRouter.router);
app.use("/orders", isAuth(), orderRouter.router);

passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    // by default passport uses username
    try {
      const user = await User.findOne({ email: email });
      console.log(email, password, user);
      if (!user) {
        return done(null, false, { message: "invalid credentials" }); // for safety
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "invalid credentials" });
          }
          const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
          done(null, { token }); // this lines sends to serializer
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user)); // this calls serializer
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  console.log("serialize", user);
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
  console.log("de-serialize", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.listen(8080, () => {
  console.log("Server started at 8080");
});
