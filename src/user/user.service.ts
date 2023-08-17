import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import CreateUserDto from './dto/createUser.dto';
import { OrganizationService } from '../organization/organization.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly organizationService: OrganizationService,
  ) {}

  async createUser(userData: CreateUserDto) {
    try {
      const userOrganization =
        await this.organizationService.findOrganizationByName(
          userData.organizationName,
        );
      const newUser = this.usersRepository.create({
        ...userData,
        organization: userOrganization,
      });
      await this.usersRepository.save(newUser);
      return newUser;
    } catch (error) {
      // console.log(error);
      if (error instanceof QueryFailedError) {
        if (error.driverError.code === '23505')
          throw new HttpException(
            `User with email ${userData.email} already exists`,
            HttpStatus.BAD_REQUEST,
          );
      }
      if (error.status === 404)
        throw new HttpException(
          `Organization with name ${userData.organizationName} does not exist`,
          HttpStatus.NOT_FOUND,
        );
    }
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      return user;
    } else {
      throw new HttpException(
        `User with email ${email} could not be found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
