import { Test, TestingModule } from "@nestjs/testing";
import { FavoritecategoriesController } from "./favoritecategories.controller";
import { FavoritecategoriesService } from "./favoritecategories.service";

describe("FavoritecategoriesController", () => {
  let controller: FavoritecategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritecategoriesController],
      providers: [FavoritecategoriesService],
    }).compile();

    controller = module.get<FavoritecategoriesController>(
      FavoritecategoriesController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
