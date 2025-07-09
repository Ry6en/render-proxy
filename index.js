const express = require("express");
const unblocker = require("unblocker");
const https = require("https");

const app = express();

app.use(
  unblocker({
    prefix: "/proxy/",
    responseMiddleware: [
      (data, req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
      },
    ],
  })
);

// 테스트용
app.get("/test", (req, res) => {
  https
    .get("https://example.com", (r) => {
      res.send(" 외부 연결 성공");
    })
    .on("error", (err) => {
      res.send("❌ 연결 실패: " + err.message);
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
