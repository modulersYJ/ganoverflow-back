import { Test, TestingModule } from "@nestjs/testing";
import { ChatpostsService } from "./chatposts.service";

describe("ChatpostsService", () => {
  let service: ChatpostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatpostsService],
    }).compile();

    service = module.get<ChatpostsService>(ChatpostsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
