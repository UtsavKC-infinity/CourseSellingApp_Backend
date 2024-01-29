const { Router } = require("express");
const router = Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const userMiddleware = require("../middleware/user");

// User Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  //check if a user with this username already exists

  User.create({
    username: username,
    password: password,
  })
    .then(function () {
      res.json({
        msg: "User created successfully",
      });
    })
    .catch(function () {
      res.json({
        msg: "User not created",
      });
    });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.find({
    username,
    password,
  });
  if (user) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );
    res.json({
      token,
    });
  } else {
    res.status(411).json({
      message: "Incorrect email and password",
    });
  }
});

router.get("/courses", (req, res) => {
  // Implement listing all courses logic
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.username;
  try {
    await User.updateOne(
      {
        username: username,
      },
      {
        $push: {
          purchasedCourse: courseId,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
  res.json({
    msg: "Purchase Complete",
  });
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
});

module.exports = router;
