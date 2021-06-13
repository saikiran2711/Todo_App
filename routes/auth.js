const express = require("express");
const router = express.Router();
const UserModel = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const SECRET_KEY =
  "n2r5u8x/A?D(G+KbPeShVkYp3s6v9y$B&E)H@McQfTjWnZq4t7w!z%C*F-JaNdRg";

const generateToken = async (id, secret_key) => {
  return (token = jwt.sign({ _id: id }, secret_key));
};

function isEmailAddress(str) {
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(str); // returns a boolean
}

const verifyCookie = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    const verify = jwt.verify(token, SECRET_KEY);

    const user = await UserModel.findOne({ _id: verify._id, token: token });
    if (!user) {
      throw error("User not found");
    }

    req.body.username = user.username;
    req.body.email = user.email;
    req.body.id = user._id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "You are unauthorised !" });
  }
};

router.post("/api/signup", async (req, res) => {
  const { username, email, password1 } = req.body;
  if (!username || !email || !password1) {
    return res.status(422).json({ message: "Some fields are missing" });
  } else if (req.body.password1 != req.body.password2) {
    res.status(422).json({ message: "password not matched" });
  } else {
    try {
      const resp = await UserModel.findOne({ email: email });
      if (resp) {
        return res
          .status(422)
          .json({ message: "User with this email already exists!" });
      } else if (!isEmailAddress(email)) {
        return res
          .status(422)
          .json({ message: "Please enter avalid email address!!" });
      }
      const user = new UserModel({
        username: username,
        email: email,
        password: password1,
      });
      await user.save();
      //   SendVerifyEmail(user._id, user.email);
      res.status(201).json({
        message: "User created successfully",
      });
    } catch (err) {
      console.log("User registration failed!!");
    }
  }
});

// router.get("/api/profile", verifyCookie, (req, res) => {
//   res.status(201).json({ userData: req.body });
// });

router.post("/api/login", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ message: "Some fields are missing" });
    } else {
      UserModel.find({ email: req.body.email }, async (err, docs) => {
        if (docs[0] == undefined) {
          return res.status(422).json({ message: "user doesnot exist" });
        } else if (!err) {
          if (docs[0].password == req.body.password) {
            const token = await generateToken(docs[0]._id, SECRET_KEY);
            const user = await UserModel.findOne({ _id: docs[0]._id });
            user.token = token;
            const updUser = await user.save();

            res.cookie("token", token, {
              httpOnly: true,
            });

            let data = {};
            data.username = updUser.username;
            data.email = updUser.email;
            data.id = updUser._id;
            return res.status(201).json({ message: updUser });
          } else {
            return res.status(422).json({ message: "password is incorrect" });
          }
        } else {
          return res.status(422).json({ error: "something went wrong" });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/api/logout", async (req, res) => {
  res.clearCookie("token");
  res.status(201).json({ message: "get lost" });
});

module.exports = router;
