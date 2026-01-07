import url from "url";
import { classifyText } from "../controllers/classifyController.js";

export function router(req, res) {
  const { pathname } = url.parse(req.url, true);

  // Normalize trailing slash
  const route = pathname.replace(/\/+$/, "");

  if (req.method === "POST" && route === "/api/classify-text") {
    return classifyText(req, res);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
}
