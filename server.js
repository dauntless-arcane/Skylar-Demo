import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import fetch from "node-fetch";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Skylark BI Agent"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    console.log("OpenRouter response:", data);

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});