import { Test, TestingModule } from '@nestjs/testing';
import { ChatPairsController } from './chat-pairs.controller';
import { ChatPairsService } from './chat-pairs.service';

describe('ChatPairsController', () => {
  let controller: ChatPairsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatPairsController],
      providers: [ChatPairsService],
    }).compile();

    controller = module.get<ChatPairsController>(ChatPairsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
