
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

/**
 * Standard error handler for Gemini API interactions.
 */
const handleApiError = (error: any): never => {
  const message = error?.message || "An unknown error occurred during market analysis.";
  console.error(`[GeminiService Error] ${message}`, error);
  throw new Error(`Market Analysis Failed: ${message}`);
};

export const getMarketUpdate = async (query: string = "Give me a full market update for all metals."): Promise<{ text: string, sources: any[] }> => {
  try {
    // Initializing inside the function to ensure the latest API key is used and following SDK patterns.
    // ALWAYS use new GoogleGenAI({apiKey: process.env.API_KEY}) directly before the call.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const sanitizedQuery = query.trim() || "Full market update";

    // Use gemini-3-pro-preview for complex reasoning and technical market analysis.
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: sanitizedQuery,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      },
    });

    if (!response || !response.text) {
      return { text: "The AI analyst returned an empty response. Please retry.", sources: [] };
    }

    // Accessing .text property directly as it is a property, not a method.
    const text = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { text, sources };
  } catch (err) {
    return handleApiError(err);
  }
};

export const streamMarketAnalysis = async (message: string, onChunk: (chunk: string) => void): Promise<void> => {
  try {
    // Initializing inside the function to ensure the latest API key is used and following SDK patterns.
    // ALWAYS use new GoogleGenAI({apiKey: process.env.API_KEY}) directly before the call.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const sanitizedMessage = message.slice(0, 1000).trim();
    if (!sanitizedMessage) throw new Error("Input message cannot be empty.");

    // Use gemini-3-pro-preview for complex reasoning and technical market analysis.
    const response = await ai.models.generateContentStream({
      model: 'gemini-3-pro-preview',
      contents: sanitizedMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      },
    });

    for await (const chunk of response) {
      // Accessing .text property directly as it is a property, not a method.
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (err) {
    handleApiError(err);
  }
};
