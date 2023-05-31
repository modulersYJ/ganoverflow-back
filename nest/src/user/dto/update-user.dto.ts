import { OmitType, PartialType } from "@nestjs/swagger";
import { RegisterUserDto } from "./register-user.dto";

export class UpdateUserDto extends PartialType(
  OmitType(RegisterUserDto, ["username"] as const)
) {} // RegisterUserDto를 상속하되, "username" 속성을 제외한 나머지 속성은 optional로 설정
