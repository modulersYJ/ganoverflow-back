import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('my-page/:id')
  myPage(@Param('id') userId: string) {
    return this.userService.myPage(userId);
  }
}
