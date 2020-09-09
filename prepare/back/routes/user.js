const express = require("express");
const { User } = require("../models");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/", async (req, res) => {
  // POST /user
  try {
    console.log(req.body);
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용 중인 이메일입니다.");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.log(error);
    next(error); // status 500
  }
});

module.exports = router;
