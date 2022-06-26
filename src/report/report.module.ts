import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportService } from './report.service';
import { ReportRepository } from './entities/report.repository'
import { ReportController } from './report.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReportRepository])],
  providers: [ReportService],
  controllers: [ReportController]
})
export class ReportModule { }
