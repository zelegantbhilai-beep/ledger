
import { GoogleGenAI, Type } from "@google/genai";
import { Expense } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSpendingInsights = async (expenses: Expense[]) => {
  if (expenses.length === 0) return null;

  const expenseSummary = expenses.map(e => 
    `- ${e.date}: [${e.type}] ${e.description} (${e.category}) via ${e.paymentMode} - ₹${e.amount.toLocaleString('en-IN')}`
  ).join('\n');

  const prompt = `
    Analyze the following list of transactions for an Indian "Thekedaar" (Contractor).
    The categories include Labor Payment, Raw Materials, Machinery, etc.
    Provide professional coaching on project profitability, labor cost efficiency, and material management.
    Be practical and business-oriented. Highlight cash-flow gaps and offer 3 actionable tips for scaling a contracting business in the Indian construction landscape.
    
    Transactions:
    ${expenseSummary}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: 'A brief 2-sentence summary of project health.'
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Three business-scaling tips for a contractor.'
            },
            riskLevel: {
              type: Type.STRING,
              enum: ['Low', 'Medium', 'High'],
              description: 'Project stability risk level.'
            }
          },
          required: ['summary', 'suggestions', 'riskLevel']
        }
      }
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return null;
  }
};
