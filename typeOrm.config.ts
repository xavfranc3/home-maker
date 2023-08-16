import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import Organization from './src/organization/organization.entity';
import { CreateOrganization1692200562640 } from './migrations/1692200562640-CreateOrganization';

config();

const configService = new ConfigService();
export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [Organization],
  migrations: [CreateOrganization1692200562640],
});
