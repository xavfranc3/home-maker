import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { OrganizationModule } from './organization/organization.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    OrganizationModule,
    AddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
