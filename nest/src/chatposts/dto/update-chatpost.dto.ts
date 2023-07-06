import { PartialType } from "@nestjs/swagger";
import { CreateChatpostDto } from "./create-chatpost.dto";

export class UpdateChatpostDto extends PartialType(CreateChatpostDto) {}
