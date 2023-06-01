import { Body, Controller, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { SkipAuth } from 'src/auth/auth.decorator';
import { ApiBody } from '@nestjs/swagger';

@Controller()
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @SkipAuth()
  @ApiBody({ schema: { example: { prompt: "Hello, I'm a chatbot" } } })
  @Post()
  async generateText(@Body('prompt') prompt: string): Promise<{ bot: string }> {
    const botResponse = await this.chatbotService.generateText(prompt);
    return { bot: botResponse };
  }
}