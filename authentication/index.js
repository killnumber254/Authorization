const express = require("express");
const expressSession = require("express-session");
const bcrypt = require("bcrypt");
const User = require("./Schema/schema");
const db = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const auth = require("./routes/routes");
const hat = require("hat");
const insertRouter = require("./routes/routes");
const cookieParser = require("cookie-parser");

let token = {
  tokens: hat(),
};

const app = express();
app.use(cookieParser("secret key"));
app.use(
  expressSession({
    secret: hat(),
    resave: false,
    saveUninitialized: true,
    session: true,
    cookie: {
      maxAge: -1,
    },
  })
);

app.use(cookieParser());

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/regist", (req, res, next) => {
  if (!req.body) return res.status(400);
  console.log(req.body);
  const id = req.body.id;
  const userName = req.body.username;
  const passwordUser = req.body.password;
  const passSalt = bcrypt.genSaltSync(10);
  const pasSave = bcrypt.hashSync(passwordUser, passSalt);
  const user = new User({
    id: id,
    username: userName,
    password: pasSave,
  });
  console.log(user);
  user.save((err) => {
    if (err) return console.log(err);
  });
  next();
});

passport.serializeUser((user, done) => {
  done(null, user.id);
  // console.log(user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    // err ? done(err) : done(null, user);
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username })
      .then((user) => {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "wrong" });
          }
        });
      })
      .catch((err) => {
        return done(null, false, { message: err });
      });
    // return err
    //   ? done(err)
    //   : user
    // ? password === user.password
    //   done(null, user)
    // : done(null, false, { message: "Incor pass" });
    // : done(null, false, { message: "Incor username" });
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/login", (req, res, next) => {
  passport.authenticate("local", function (err, user) {
    // console.log(user);
    if (err) {
      return res.status(400).json({ error: err });
    }
    if (!user) {
      return res.status(404).json({ error: "No users" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(401).json({ error: err });
      }
      res.cookie("Token", token.tokens);
      return res.status(200).json(user);
    });
  })(req, res, next);
});

module.exports = app;
