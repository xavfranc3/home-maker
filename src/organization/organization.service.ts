import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Organization from './organization.entity';
import { QueryFailedError, Repository } from 'typeorm';
import CreateOrganizationDto from './createOrganization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async createOrganization(organization: CreateOrganizationDto) {
    try {
      const newOrganization = this.organizationRepository.create(organization);
      await this.organizationRepository.save(newOrganization);
      return newOrganization;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error.driverError.code === '23505') {
          throw new HttpException(
            `Organization with name ${organization.name} already exists`,
            HttpStatus.BAD_REQUEST,
          );
        } else {
          throw new HttpException(
            `Error: ${error.message}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }
  }

  async findOrganizationByName(name: string) {
    const organization: Organization =
      await this.organizationRepository.findOne({
        where: {
          name: name,
        },
      });
    if (organization) {
      return organization;
    } else {
      throw new HttpException(
        `Organization with name ${name} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
