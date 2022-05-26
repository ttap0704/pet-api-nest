import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { BusinessRepository } from './entities/business.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessRepository])],
  controllers: [BusinessController],
  providers: [BusinessService]
})
export class BusinessModule { }
