import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { OrganizationModule } from './organization/organization.module';
import { AddressModule } from './address/address.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    OrganizationModule,
    AddressModule,
    UserModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
