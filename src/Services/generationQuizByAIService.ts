import axios from 'axios';
import dotenv from 'dotenv';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'; 

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

async function extractTextFromPdf(pdfBuffer: Buffer): Promise<string> {
    const data = new Uint8Array(pdfBuffer);
    
    const doc = await getDocument(data).promise;
    const numPages = doc.numPages;
    let fullText = '';

    for (let i = 1; i <= numPages; i++) {
        const page = await doc.getPage(i);
        const textContent = await page.getTextContent();
        
        const pageText = textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');
        fullText += pageText + ' ';
    }
    
    return fullText.split(' ').slice(0, 1500).join(' ');
}

interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}

interface QuizResponse {
  questions: Question[];
}

async function generateQuestionsFromText(textContext: string): Promise<QuizResponse> {
    if (!OPENROUTER_API_KEY) {
        throw new Error("OpenRouter API key not found.");
    }
    
    const shortText = textContext.split(' ').slice(0, 800).join(' ');
    
    const prompt = `Generate 5 multiple-choice questions from the following text: 
    
    ${shortText}
    
    Requirements:
    1. Each question must have 4 options
    2. Mark the correct answer as a number (0-3)
    3. Output ONLY JSON in this exact format:
    {
      "questions": [
        {
          "text": string ,
          "options": string[],
          "correctAnswer": number 0 to 3 
        }
      ]
    }`;

    try {
        const response = await axios.post(
            OPENROUTER_URL,
            {
                model: "mistralai/mixtral-8x7b-instruct", 
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 2000,
                temperature: 0.7
            },
            {
                headers: { 
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'HTTP-Referer': 'http://localhost', 
                    'X-Title': 'Quiz Generator' 
                },
                timeout: 60000 
            }
        );

        
        const content = response.data.choices[0]?.message?.content;
        if (!content) {
            throw new Error("No content in API response");
        }

        const jsonStart = content.indexOf('{');
        const jsonEnd = content.lastIndexOf('}');
        
        if (jsonStart === -1 || jsonEnd === -1) {
            throw new Error("No JSON found in response");
        }

        const jsonString = content.substring(jsonStart, jsonEnd + 1);
        const quizData: QuizResponse = JSON.parse(jsonString);

        return quizData;

    } catch (error: any) {
        if (error.response) {
            throw new Error(`API error: ${error.response.data.error?.message || error.response.data} (status: ${error.response.status})`);
        } else if (error.request) {
            throw new Error("No response received from API");
        } else {
            throw new Error(`Request setup error: ${error.message}`);
        }
    }
}

export async function generateQuiz(pdfBuffer: Buffer): Promise<object> {
    console.log("Service: Extracting text from PDF buffer...");
    const text = await extractTextFromPdf(pdfBuffer);
    
    if (!text || text.trim() === '') {
        throw new Error("No text could be extracted from the PDF.");
    }

    console.log("Service: Generating questions from text using OpenRouter...");
    const quizData = await generateQuestionsFromText(text);

    console.log("Service: Processing complete.");
    
    return {
        generated_at: new Date().toISOString(),
        questions: quizData.questions.map((q, index) => ({
            id: index + 1,
            text: q.text,
            options: q.options,
            correctAnswer: q.correctAnswer
        }))
    };
}