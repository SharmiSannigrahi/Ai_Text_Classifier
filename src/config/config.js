import { HF_API_KEY } from "./env.js";
const config = {
  huggingface: {
    apiKey: HF_API_KEY,
    baseUrl:
      "https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli",
    labels: ["Complaint", "Query", "Feedback", "Other"],
    timeout: 30000,
  },
};

export default config;
