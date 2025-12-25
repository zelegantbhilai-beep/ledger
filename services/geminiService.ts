
import { GoogleGenAI, Type } from "@google/genai";
import { Expense } from "../types";

// Fix: Initialize GoogleGenAI using process.env.API_KEY directly as a named parameter
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSpendingInsights = async (expenses: Expense[]) => {
  if (expenses.length === 0) return null;

  const expenseSummary = expenses.map(e => 
    `- ${e.date}: [${e.type}] ${e.description} (${e.category}) via ${e.paymentMode} - ₹${e.amount.toLocaleString('en-IN')}`
  ).join('\n');

  const prompt = `
    Analyze the following list of recent financial transactions (Incomes and Expenses) from an Indian user.
    Provide coaching on their cash flow, savings potential, and spending habits.
    Be encouraging but honest. Highlight any concerning trends and offer 3 actionable tips relevant to the Indian middle-class context.
    
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
              description: 'A brief 2-sentence summary of the financial health.'
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Three actionable financial tips.'
            },
            riskLevel: {
              type: Type.STRING,
              enum: ['Low', 'Medium', 'High'],
              description: 'Financial stability risk level.'
            }
          },
          required: ['summary', 'suggestions', 'riskLevel']
        }
      }
    });

    // Fix: Access the .text property directly instead of calling it as a method, following the SDK guidelines
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return null;
  }
};
