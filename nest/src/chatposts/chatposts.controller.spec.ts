import { Test, TestingModule } from "@nestjs/testing";
import { ChatpostsController } from "./chatposts.controller";
import { ChatpostsService } from "./chatposts.service";

describe("ChatpostsController", () => {
  let controller: ChatpostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatpostsController],
      providers: [ChatpostsService],
    }).compile();

    controller = module.get<ChatpostsController>(ChatpostsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
