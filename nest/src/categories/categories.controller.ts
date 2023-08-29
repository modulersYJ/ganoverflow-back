import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Public } from "src/auth/public.decorator";

@ApiTags("categories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Public()
  @Get("categories-and-top-tags")
  @ApiOperation({
    summary: "Categories에 대해 각각 집계된 상위 5개 Tags 가져오기",
    description: "Categories에 대해 각각 집계된 상위 5개 Tags 가져오기",
  })
  findCategoriesAndTopTags() {
    return this.categoriesService.findCategoriesAndTopTags();
  }

  @Get(":categoryName")
  findOne(@Param("categoryName") categoryName: string) {
    return this.categoriesService.findOne(categoryName);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(+id);
  }
}
