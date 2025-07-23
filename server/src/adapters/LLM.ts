import { GoogleGenAI } from '@google/genai';
import { AccessEnv, Logger } from "@/helpers";
import { GEMINI_API_KEY, GEMINI_MODEL } from '@/const';

export default class LLM {
    private adapter: GoogleGenAI;
    private GEMINI_API_KEY;

    constructor() {
        const key = AccessEnv.getInstance().get(GEMINI_API_KEY);
        if (!key) {
            Logger.getLogger().error("GEMINI_API_KEY env variable missing");
            process.exit(1); // server won't start without this key as it is mandatory
        }
        this.GEMINI_API_KEY = key;
        this.adapter = new GoogleGenAI({ apiKey: this.GEMINI_API_KEY });
    }

    async fetch(contents: string): Promise<string | null> {
        try {
            const response = await this.adapter.models.generateContent({
                model: GEMINI_MODEL,
                contents
            });
            if (response.text) return response.text;
            return null;
        } catch (error) {
            Logger.getLogger().error(`${this.constructor.name}: Error: ${error}`);
            throw error;
        }
    }

}