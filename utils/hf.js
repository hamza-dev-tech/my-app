import { HfInference } from "@huggingface/inference";

const HF_TOKEN = process.env.HUGGINGFACE_API_KEY; // Ensure this is set in .env.local
export const inference = new HfInference(HF_TOKEN);
