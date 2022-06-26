import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportRepository } from './entities/report.repository';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportRepository)
    private reportRepository: ReportRepository
  ) { }

  public async acceptReport(ip: string, report_data: CreateReportDto) {
    report_data.ip = ip;

    return await this.reportRepository.save(report_data);
  }
}
