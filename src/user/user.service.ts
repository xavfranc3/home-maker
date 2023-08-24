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
    } catch (e) {
      console.log(e);
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

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    await this.usersRepository.update(userId, {
      refreshToken,
    });
  }

  async getUserWithValidRefreshToken(refreshToken: string, userId: number) {
    const user = await this.getUserById(userId);

    const isRefreshTokenMatching = refreshToken === user.refreshToken;

    if (isRefreshTokenMatching) return user;
  }

  async removeRefreshToken(userId: number) {
    return this.usersRepository.update(userId, { refreshToken: null });
  }
}
