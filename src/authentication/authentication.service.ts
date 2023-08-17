import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import CreateUserDto from '../user/dto/createUser.dto';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService) {}

  async registerUser(registrationData: CreateUserDto) {
    try {
      const createdUser = await this.userService.createUser(registrationData);
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error.driverError.code === '23505')
          throw new HttpException(
            `User with email ${registrationData.email} already exists`,
            HttpStatus.BAD_REQUEST,
          );
      }
      if (error.status === 404)
        throw new HttpException(
          `Organization with name ${registrationData.organizationName} does not exist`,
          HttpStatus.NOT_FOUND,
        );
    }
  }

  async getAuthenticatedUser(email: string, password: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      await this.verifyPassword(password, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(plainPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
