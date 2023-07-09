import { IsArray, IsInt, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class PostOrder {
  @IsInt()
  chatPostId: number;

  @IsInt()
  order: number;
}

export class UpdatePostOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PostOrder)
  posts: PostOrder[];
}
