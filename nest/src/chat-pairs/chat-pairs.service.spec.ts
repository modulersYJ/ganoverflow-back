import { Test, TestingModule } from "@nestjs/testing";
import { ChatPairsService } from "./chat-pairs.service";

describe("ChatPairsService", () => {
  let service: ChatPairsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatPairsService],
    }).compile();

    service = module.get<ChatPairsService>(ChatPairsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
