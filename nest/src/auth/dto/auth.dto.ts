import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class AuthAccessTokenRefreshDto {
  @ApiProperty()
  @IsOptional()
  token: string;
}
