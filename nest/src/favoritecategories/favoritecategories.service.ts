import { Injectable } from "@nestjs/common";
import { CreateFavoritecategoryDto } from "./dto/create-favoritecategory.dto";
import { UpdateFavoritecategoryDto } from "./dto/update-favoritecategory.dto";

@Injectable()
export class FavoritecategoriesService {
  create(createFavoritecategoryDto: CreateFavoritecategoryDto) {
    return "This action adds a new favoritecategory";
  }

  findAll() {
    return `This action returns all favoritecategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favoritecategory`;
  }

  update(id: number, updateFavoritecategoryDto: UpdateFavoritecategoryDto) {
    return `This action updates a #${id} favoritecategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} favoritecategory`;
  }
}
