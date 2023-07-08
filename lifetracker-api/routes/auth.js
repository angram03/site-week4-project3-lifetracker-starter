const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {createUserJwt} = require("../utils/tokens")
const security = require("../middleware/security")
// const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = require("../config");

router.post("/login", async (req, res, next) => {
  try {
    console.log("post login route", req.body)
    const user = await User.login(req.body);
    console.log("user", user)
    const token = createUserJwt(user)

    // const token = jwt.sign(
    //   { email: user.email, id: user.id, userName: user.userName },
    //   SECRET_KEY,
    //   { expiresIn: "1h" }
    // );

    return res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const user = await User.register(req.body);
    const token = createUserJwt(user)
    // const token = jwt.sign(
    //   { email: user.email, id: user.id, userName: user.userName  },
    //   SECRET_KEY,
    //   {expiresIn: "1h",}
    // );

    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }


});

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const {email} = res.locals.user
        const user = await User.fetchUserByEmail(email)
        const publicUser = await User.makePublicUser(user)
        return res.status(200).json({user: publicUser})
    } catch(err) {
        next(err)
    }
})

module.exports = router;
