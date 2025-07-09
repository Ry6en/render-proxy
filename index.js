const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

// 프록시 경로: 예) /proxy/https://example.com
app.use("/proxy/", (req, res, next) => {
  const targetUrl = req.url.slice(1); // "/https://example.com" -> "https://example.com"
  if (!/^https?:\/\//.test(targetUrl)) {
    return res.status(400).send("❌ 유효한 URL이 아닙니다.");
  }

  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: (path, req) => {
      return ""; // 원래 경로 유지
    },
    onProxyReq: (proxyReq, req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
    }
  })(req, res, next);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🌐 Universal proxy running on port ${PORT}`);
});
