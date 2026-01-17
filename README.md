
# 🪙 MetalQuest: Live Market Tracker

A professional-grade real-time metal market analyst tool powered by **Gemini 3 Flash** with integrated **Google Search Grounding**. Track precious, industrial, battery, tech, and energy metals with high-precision AI analysis.

## 🚀 Overview

MetalQuest transforms raw market data into actionable intelligence. By leveraging the latest generative AI, it scans global exchanges (LME, COMEX, NYMEX) to provide spot prices, technical trends, and macroeconomic impact summaries.

### Key Features
- **Real-Time Tickers**: Live spot prices for Gold, Copper, Lithium, and Uranium.
- **AI Analyst Chat**: Interactive query interface for technical analysis and market "vibes".
- **Google Search Grounding**: Every report is backed by live web search results for 2026 data accuracy.
- **Multi-Category Tracking**: Organized views for Precious, Base, Battery, Ferrous, and Specialty metals.
- **Security-First**: Robust error handling, environment variable protection, and input sanitization.

## 🛠 Tech Stack

- **Framework**: React 19 (ES6 Modules)
- **AI Engine**: Google Gemini API (`@google/genai`)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Type Safety**: TypeScript

## 🛡 Security & Sanity

This project implements strict security patterns:
- **API Isolation**: The `process.env.API_KEY` is never exposed to the client-side bundle in cleartext beyond necessary execution.
- **Input Sanitization**: Chat inputs are trimmed and validated before being processed by the LLM.
- **Response Validation**: Fallback logic handles partial or failed AI generations to prevent UI crashes.
- **Fail-Safe Initialisation**: The `GoogleGenAI` client verifies the presence of credentials before every request.

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/shards-inc/metalquest.git
    cd metalquest
    ```

2.  **Set up environment**:
    Ensure your `API_KEY` is available in your environment.

3.  **Execution**:
    This project is designed to run in modern ES module environments. Simply serve the `index.html`.

## 🧪 Testing

The logic is decoupled into services to facilitate unit testing. See `tests/market.test.ts` for the conceptual test suite covering:
- API response parsing.
- Sanity check triggers.
- Category mapping.

## 📄 License

MIT License - Copyright (c) 2026 Shards Inc.
