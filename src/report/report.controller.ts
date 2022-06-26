import { Body, Controller, Ip, Post } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto'

@Controller('report')
export class ReportController {
  constructor(
    private reportService: ReportService
  ) { }

  @Post('')
  public async acceptReport(@Ip() ip: string, @Body() report_data: CreateReportDto) {
    return await this.reportService.acceptReport(ip, report_data);
  }
}
