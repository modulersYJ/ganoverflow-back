import { Body, Controller, Post } from "@nestjs/common";
import { ChatbotService } from "./chatbot.service";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("chatbot")
@Controller()
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @ApiOperation({
    summary: "챗봇 : OPEN AI 연결",
    description: "챗봇연결하는곳",
  })
  @ApiBody({ schema: { example: { prompt: "Hello, I'm a chatbot" } } })
  @Post("chatbot")
  async generateText(@Body("prompt") prompt: string): Promise<{ bot: string }> {
    const botResponse = await this.chatbotService.generateText(prompt);
    return { bot: botResponse };
  }
}
