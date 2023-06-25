import { PartialType } from '@nestjs/swagger';
import { CreateFavoritecategoryDto } from './create-favoritecategory.dto';

export class UpdateFavoritecategoryDto extends PartialType(CreateFavoritecategoryDto) {}
