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
    const categories = await this.categoryRepository.find();

    // "전체" 카테고리에 대한 상위 태그를 가져옴
    const totalTopTags = await this.categoryTopTagsRepository.find({
      where: { categoryName: "전체" },
    });

    // "전체" 카테고리의 상위5 태그 정보를 추가
    const totalTagsInfo = totalTopTags.map((topTag) => ({
      tag: topTag.tag,
      frequency: topTag.frequency,
    }));

    // 각 카테고리에 대한 상위5 태그를 가져와서 정보를 조합
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

    // "전체" 카테고리 정보를 배열의 맨 앞에 추가
    return [
      {
        categoryName: "전체",
        tagsInfo: totalTagsInfo,
      },
      ...categoriesAndMatchedTopTagsInfo,
    ];
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
