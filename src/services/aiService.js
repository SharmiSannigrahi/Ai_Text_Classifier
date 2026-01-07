
import axios from "axios";
import config from "../config/config.js";

// own confidence mapping
const CONFIDENCE_MAP = {
  Complaint: 0.9,
  Query: 0.85,
  Feedback: 0.8,
  Other: 0.7,
};

export async function classifyWithAI(text) {
  try {
    if (!config.huggingface.apiKey) {
      throw new Error("HF_API_KEY not configured");
    }

    // Call Hugging Face Inference API
    const response = await axios.post(
      config.huggingface.baseUrl,
      {
        inputs: text,
        parameters: {
          candidate_labels: config.huggingface.labels,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${config.huggingface.apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: config.huggingface.timeout,
      }
    );

    if (response.status !== 200) {
      throw new Error(`HF API returned status ${response.status}`);
    }

    const data = response.data;

    if (!data) {
      throw new Error("HF API returned no data");
    }

    // Handle different response formats
    if (Array.isArray(data)) {
      const best = data.reduce((a, b) => (b.score > a.score ? b : a));

      return {
        category: best.label,
        confidence:
          best.score !== undefined
            ? Number(best.score.toFixed(2))
            : CONFIDENCE_MAP[best.label] || 0.6,
      };
    }

    if (data.labels && data.scores) {
      const bestIndex = data.scores.indexOf(Math.max(...data.scores));
      const category = data.labels[bestIndex];

      return {
        category,
        confidence:
          data.scores[bestIndex] !== undefined
            ? Number(data.scores[bestIndex].toFixed(2))
            : CONFIDENCE_MAP[category] || 0.6,
      };
    }

    if (typeof data === "string") {
      return {
        category: data,
        confidence: CONFIDENCE_MAP[data] || 0.6,
      };
    }

    throw new Error("Unexpected Hugging Face response format");
  } catch (err) {
    console.error("HF ERROR:", {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
    });


    throw err;
  }
}
