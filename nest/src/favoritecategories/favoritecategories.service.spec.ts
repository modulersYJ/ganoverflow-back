import { Test, TestingModule } from "@nestjs/testing";
import { FavoritecategoriesService } from "./favoritecategories.service";

describe("FavoritecategoriesService", () => {
  let service: FavoritecategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoritecategoriesService],
    }).compile();

    service = module.get<FavoritecategoriesService>(FavoritecategoriesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
