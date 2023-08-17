import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}
