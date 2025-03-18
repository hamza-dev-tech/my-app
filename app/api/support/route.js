import { NextResponse } from "next/server";
import { inference } from "../../../utils/hf"; // Import Hugging Face inference instance

const predefinedResponses = {
  "who are you": "I am Hamza Shabbir's personal AI assistant. Hamza is a Software Engineer specializing in Web & Blockchain development.",
  "what projects have you worked on": "Hamza has developed projects like a blockchain minting platform, a university smart bus app, and a cryptocurrency swap UI.",
  "how can I contact you": "You can reach Hamza at hamza@example.com or via LinkedIn: linkedin.com/in/hamza-shabbir.",
  "what services do you offer": "Hamza provides web & mobile app development, blockchain solutions, AI integrations, and more. Visit his website for details."
};

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Check if the message matches a predefined response
    const lowerMessage = message.toLowerCase();
    if (predefinedResponses[lowerMessage]) {
      return NextResponse.json({ reply: predefinedResponses[lowerMessage] }, { status: 200 });
    }

    // Send request to Hugging Face API
    const response = await inference.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: `User: ${message}\nAssistant:`,
      parameters: { max_new_tokens: 100, temperature: 0.7 }
    });

    // Extract only the assistant's reply
    const generatedText = response?.generated_text || "";
    const reply = generatedText.split("Assistant:")[1]?.trim() || generatedText.trim();

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error("Hugging Face API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}