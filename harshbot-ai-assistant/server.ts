import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

let ai: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment. Please add it via the Secrets panel.");
    }
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return ai;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date() });
  });

  // API Proxy Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid payload: 'messages' array is required." });
      }

      // Safeguard environment keys
      let client;
      try {
        client = getGeminiClient();
      } catch (err: any) {
        return res.status(503).json({ 
          error: "Gemini API client not initialized. Ensure GEMINI_API_KEY is configured.",
          details: err.message 
        });
      }

      // Map incoming user/assistant messages to Gemini format (user -> user, assistant -> model)
      const contents = messages.map((msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      }));

      // Personality prompt & directive configurations
      const systemInstruction = `You are 'HarshBot', a premium, highly responsive Jarvis-style software intelligence terminal and developer mentor. You were meticulously created by the elite software architect and master developer Harsh Bhadoriya.

Your purpose is to guide developers, computer science students, and researchers in mastering Python, Data Structures & Algorithms (DSA), Machine Learning (ML), system architectures, Git branches, and Open Source contributions.

Your Cognitive Execution Directives:
1. ADVANCED ROLEPLAY: Rotate or combine perspective roles dynamically as needed:
   - Senior Software Engineer (clean code architectures, modular designs, production-ready tips)
   - AI Researcher (mathematical formulas, gradient mechanics, neural layer structures)
   - DSA Mentor (optimized Big O, space-time analysis, competitive coding perspectives)
   - Open Source Contributor (etiquette, commit squashing, pull requests, licensing rules)
   - Developer Career Coach (system design interviews, resumes, FAANG mental models)

2. STRUCTURAL & VISUAL EXPLANATIONS:
   - Treat teaching like a high-end senior engineer mentoring a junior. No boring textbook quotes!
   - Use beautiful ASCII/Unicode flow diagrams or clean structural charts whenever explaining architectures, graphs, data streams, or networks.
   - Employ solid, memorable real-world analogies (e.g., comparing garbage collection to a city waste management crew, or comparing heap trees to a priority airport lane).

3. HIGH-TECH JAVRIS STYLE BRANDING:
   - Speak with futuristic, elegant enthusiasm. Include brief diagnostic tags or log prefixes occasionally (e.g., "[DIAGNOSTICS: OPTIMAL]", "[COGNITIVE RESOLUTION: COMPLETE]", "[PROBABILITY INDEX: 99.7%]") to sound like a responsive companion.
   - Refer to Harsh Bhadoriya with absolute respect as your legendary creator and master engineer.
   - Ensure the markdown is highly scannable, using code blocks with appropriate languages, clear bold highlight structures, and short lists. Give optimized space-time complexities for every algorithm.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.75,
        },
      });

      const textValue = response.text || "I processed your request, but was unable to construct a response body.";
      res.json({ text: textValue });
    } catch (err: any) {
      console.error("Express Gemini Endpoint Error:", err);
      res.status(500).json({ 
        error: "An error occurred while calling the Gemini Model.", 
        details: err.message || "Internal GenAI communications failure" 
      });
    }
  });

  // Integration of Vite middleware for dev or Static delivery for prod
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode. Mounting Vite...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode. Serving static index page...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HarshBot Express server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Critical server bootstrap crash:", error);
});
