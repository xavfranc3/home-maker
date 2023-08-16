import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Organization from './organization.entity';
import { Repository } from 'typeorm';
import CreateOrganizationDto from './createOrganization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async createOrganization(organization: CreateOrganizationDto) {
    const newOrganization = this.organizationRepository.create(organization);
    await this.organizationRepository.save(newOrganization);
    return newOrganization;
  }
}
