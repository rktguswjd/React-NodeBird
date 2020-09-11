const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const app = express();
const passportConfig = require("./passport");

dotenv.config();

passportConfig();

db.sequelize
  .sync()
  .then(() => {
    console.log("db연결 성공");
  })
  .catch(console.error);

app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("nodebirdsecret"));
app.use(
  session({
    saveUninitalized: false,
    resavs: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.get -> 가져오기
// app.post -> 생성
// app.put -> 전체 수정
// app.delete -> 제거
// app.patch -> 부분 수정
// app.options -> 찔러보기
// app.head -> 헤더만 가져오기(헤더/바디)

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/", (req, res) => {
  res.send("hello api");
});

app.get("/posts", (req, res) => {
  res.json([
    { id: 1, content: "hello" },
    { id: 2, content: "hello2" },
    { id: 3, content: "hello3" },
  ]);
});

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행 중");
});
