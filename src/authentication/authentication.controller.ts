import {
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Req,
  Body,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';
import CreateUserDto from '../user/dto/createUser.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: CreateUserDto) {
    return this.authenticationService.registerUser(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
