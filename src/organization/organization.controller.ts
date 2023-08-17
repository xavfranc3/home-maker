import { Body, Controller, Post } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import CreateOrganizationDto from './createOrganization.dto';

@Controller('organization')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Post()
  async createOrganization(@Body() organization: CreateOrganizationDto) {
    return this.organizationService.createOrganization(organization);
  }
}
