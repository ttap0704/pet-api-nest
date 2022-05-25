import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ManagerModule } from './manager/manager.module';
import { BusinessModule } from './business/business.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    ManagerModule,
    BusinessModule
  ],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule { }