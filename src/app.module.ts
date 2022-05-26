import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { BusinessModule } from './business/business.module';
import { JoinCertificationModule } from './join_certification/join_certification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    AdminModule,
    BusinessModule,
    JoinCertificationModule
  ],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule { }