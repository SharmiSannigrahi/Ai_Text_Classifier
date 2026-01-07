import { readBody } from "../core/bodyParser.js";
import { classifyWithAI } from "../services/aiService.js";

export async function classifyText(req, res) {
  try {
    const body = await readBody(req);

    if (!body.text) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Text is required" }));
    }

    const result = await classifyWithAI(body.text);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  } catch (err) {
    console.error("Controller Error:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "AI classification failed" }));
  }
}
