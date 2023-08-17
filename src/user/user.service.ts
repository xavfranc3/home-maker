import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';
import { Repository } from 'typeorm';
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
