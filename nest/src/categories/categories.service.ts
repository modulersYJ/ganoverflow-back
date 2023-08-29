import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import { CategoryTopTags } from "./entities/category-top-tags.entity";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(CategoryTopTags)
    private readonly categoryTopTagsRepository: Repository<CategoryTopTags>
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return "This action adds a new category";
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findCategoriesAndTopTags() {
    // 모든 카테고리를 가져옴
    const categories = await this.categoryRepository.find();

    // 각 카테고리에 대한 상위 태그를 가져와서 정보를 조합
    const categoriesAndMatchedTopTagsInfo = await Promise.all(
      categories.map(async (category) => {
        const topTags = await this.categoryTopTagsRepository.find({
          where: { categoryName: category.categoryName },
        });

        const tagsInfo = topTags.map((topTag) => ({
          tag: topTag.tag,
          frequency: topTag.frequency,
        }));

        return {
          categoryName: category.categoryName,
          tagsInfo,
        };
      })
    );

    return categoriesAndMatchedTopTagsInfo;
  }

  findOne(categoryName: string) {
    return this.categoryRepository.findOne({
      where: { categoryName: categoryName },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
