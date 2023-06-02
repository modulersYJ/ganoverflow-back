import { Injectable } from "@nestjs/common";
import { Configuration, OpenAIApi } from "openai";

@Injectable()
export class ChatbotService {
  private readonly openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: "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",
    });

    this.openai = new OpenAIApi(configuration);
  }

  async generateText(prompt: string): Promise<string> {
    const response = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    return response.data.choices[0].text;
  }
}
