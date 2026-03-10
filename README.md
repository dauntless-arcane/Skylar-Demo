# Skylark BI Agent

A conversational **Business Intelligence assistant** for analyzing
operational and sales data at **Skylark Drones**.

The agent allows leadership to ask natural language questions about
**work orders, revenue, pipeline health, and sector performance**, and
receive structured analytical responses.

Example questions:

-   "How does our pipeline look this quarter?"
-   "What sectors generate the most revenue?"
-   "Which deals are closest to closing?"
-   "What operational risks should leadership watch?"

------------------------------------------------------------------------

# Features

### Conversational BI

Ask business questions in plain English and receive structured insights.

### Cross-Board Analysis

The agent combines insights from:

-   **Work Orders Board** (execution, billing, collections)
-   **Deals Board** (sales pipeline)

### Founder-Level Responses

Responses include:

-   key metrics
-   insights
-   risks
-   opportunities

### Real-Time Data Context

The system prompt injects summarized operational and pipeline statistics
into the model.

### Free LLM Support

Uses **OpenRouter free models** such as:

**NVIDIA: Nemotron 3 Nano 30B A3B (free) : nvidia/nemotron-3-nano-30b-a3b:free**

------------------------------------------------------------------------

# Tech Stack

Frontend - React - Vite

Backend - Node.js - Express

AI Provider - OpenRouter API (OpenAI-compatible interface)

------------------------------------------------------------------------

# Architecture

User ↓ React Frontend ↓ POST /chat ↓ Node.js Express Server ↓ OpenRouter
API ↓ LLM generates BI analysis ↓ Response displayed in UI

The backend acts as a **secure proxy** so API keys are never exposed to
the browser.

------------------------------------------------------------------------

# Project Structure

skylark-bi-app │ ├ server.js ├ package.json ├ .env.example ├
index.html ├ vite.config.js │ └ src ├ App.jsx └ main.jsx

------------------------------------------------------------------------

# Setup Instructions

## 1. Install dependencies

npm install

------------------------------------------------------------------------

## 2. Configure API key
(for now you can use the api key given as it is a free model)
Create a `.env` file from the example:

cp .env.example .env

Add your **OpenRouter API key**:

OPENROUTER_KEY=your_openrouter_api_key_here

You can generate a key here:

https://openrouter.ai/keys

------------------------------------------------------------------------

## 3. Start the application

npm run dev

This launches both:

-   React frontend
-   Express API server

Frontend runs on:

http://localhost:5173

Backend runs on:

http://localhost:3001

------------------------------------------------------------------------

# Example Questions

Try asking the agent:

-   "Give me a leadership update on the pipeline."
-   "Which sectors drive the most revenue?"
-   "What are our biggest ongoing work orders?"
-   "Where are the biggest revenue risks?"

------------------------------------------------------------------------

# Data Notes

The included dataset has been anonymized:

-   Client names replaced with fictional names
-   Company identifiers masked
-   Financial values remain realistic

Additional constraints:

-   Some records contain blank values or `#VALUE!`
-   Some work orders are marked **Not Billable**
-   Billing labels may have inconsistent formatting

The BI agent accounts for these inconsistencies when analyzing the data.

------------------------------------------------------------------------

# Security Notes

API keys are stored **server-side only**.

The frontend communicates with the backend proxy, preventing exposure of
API credentials in the browser.

------------------------------------------------------------------------

# Future Improvements

Potential enhancements:

-   Query-based analytics instead of prompt-based summaries
-   Streaming LLM responses
-   Dashboard visualizations
-   Vector search over deal descriptions
-   Multi-board analytics expansion

------------------------------------------------------------------------

# License

This project is provided for demonstration and evaluation purposes.
