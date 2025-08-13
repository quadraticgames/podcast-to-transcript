import { GoogleGenAI } from "@google/genai";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // remove the "data:audio/mpeg;base64," part
      const base64String = result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const transcribeAudio = async (audioFile: File): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("The API_KEY environment variable is not set.");
  }

  const ai = new GoogleGenAI(process.env.API_KEY);

  try {
    const base64Audio = await fileToBase64(audioFile);

    const audioPart = {
      inlineData: {
        mimeType: audioFile.type,
        data: base64Audio,
      },
    };

    const textPart = {
      text: "You are an expert audio transcriptionist. Please transcribe the following podcast audio. The output should be a clean, readable text transcript. Identify different speakers if possible (e.g., Speaker 1:, Speaker 2:). Format the transcript into paragraphs for better readability. Do not include any of your own commentary, just provide the raw transcript.",
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [textPart, audioPart] },
      config: {
        temperature: 0.2
      }
    });

    let transcript = response.text;

    // Check for multiple speakers. The regex looks for "Speaker 2:", "Speaker 3:", etc.
    const hasMultipleSpeakers = /speaker [2-9]:/i.test(transcript) || /speaker \d{2,}:/i.test(transcript);

    // If there are no other speakers detected, remove all speaker tags (e.g., "Speaker 1:").
    if (!hasMultipleSpeakers) {
      transcript = transcript.replace(/speaker \d+:\s?/gi, '').trim();
    }
    
    return transcript;

  } catch (error) {
    console.error("Error transcribing audio:", error);
    if (error instanceof Error) {
        throw new Error(`Error during transcription: ${error.message}`);
    }
    throw new Error("An unknown error occurred during transcription.");
  }
};