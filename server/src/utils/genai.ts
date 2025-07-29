import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generateSteps = async (task: string): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

  const prompt = `Break the following task into exactly 5 clear, numbered, actionable steps.

Task: ${task}

IMPORTANT: Format your response with each step on a separate line like this:

1. [First step description]
2. [Second step description]
3. [Third step description]
4. [Fourth step description]
5. [Fifth step description]

Each step must start with the number followed by a period and space. Put each step on its own line.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  let steps = response.text().trim();

  steps = steps.replace(/(\d+\.\s[^0-9]*?)(\s+)(\d+\.)/g, '$1\n$3');

  if (!steps) throw new Error("Failed to generate steps.");

  return steps;
};
