import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3001;
export const HF_API_KEY = process.env.HF_API_KEY;
