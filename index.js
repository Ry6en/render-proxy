const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/proxy",
  createProxyMiddleware({
    target: "https://wikipedia.org", // 기본 대상 URL은 무시됨
    changeOrigin: true,
    pathRewrite: {
      "^/proxy/": "", // /proxy/ 이후의 경로를 실제 대상 URL로 변환
    },
    onProxyReq(proxyReq, req, res) {
      proxyReq.setHeader("User-Agent", "Mozilla/5.0"); // 위키 같은 곳 우회
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy running at http://localhost:${PORT}/proxy/`);
});
