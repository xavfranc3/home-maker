import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import Organization from './src/organization/organization.entity';
import { CreateOrganization1692200562640 } from './migrations/1692200562640-CreateOrganization';
import Address from './src/address/address.entity';
import { CreateAddress1692203653449 } from './migrations/1692203653449-CreateAddress';
import { AddOrganizationUniqueName1692263709523 } from './migrations/1692263709523-AddOrganizationUniqueName';
import { AddNullableFieldsToAddress1692265879502 } from './migrations/1692265879502-AddNullableFieldsToAddress';
import User from './src/user/user.entity';
import { CreateUserModel1692267160796 } from './migrations/1692267160796-CreateUserModel';
import { AddNullableFieldsToUser1692282950463 } from './migrations/1692282950463-AddNullableFieldsToUser';

config();

const configService = new ConfigService();
export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [Organization, Address, User],
  migrations: [
    CreateOrganization1692200562640,
    CreateAddress1692203653449,
    AddOrganizationUniqueName1692263709523,
    AddNullableFieldsToAddress1692265879502,
    CreateUserModel1692267160796,
    AddNullableFieldsToUser1692282950463,
  ],
});
