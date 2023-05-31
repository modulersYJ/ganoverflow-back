import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
} from "class-validator";

export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  @Length(1, 150)
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({ enum: ["M", "F", "N"], required: false })
  @IsEnum(["M", "F", "N"])
  @IsOptional()
  gender: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  birth_date: Date;

  @ApiProperty({ enum: ["Y", "N"] })
  @IsEnum(["Y", "N"])
  @IsNotEmpty()
  svc_use_pcy_agmt: string;

  @ApiProperty({ enum: ["Y", "N"] })
  @IsEnum(["Y", "N"])
  @IsNotEmpty()
  ps_info_proc_agmt: string;

  @ApiProperty({ enum: ["Y", "N"] })
  @IsEnum(["Y", "N"])
  @IsNotEmpty()
  mkt_info_recv_agmt: string;

  @ApiProperty()
  @IsString()
  @Length(1, 50)
  @IsOptional()
  provider: string;

  @ApiProperty()
  @IsString()
  @Length(1, 200)
  @IsOptional()
  social_id: string;
}
