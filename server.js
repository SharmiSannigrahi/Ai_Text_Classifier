import http from "http";
import { PORT } from "./src/config/env.js";
import { router } from "./src/core/router.js";

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  router(req, res);
});

server.listen(PORT, () => {
  console.log(`AI Text Classification API running on port ${PORT}`);
});
