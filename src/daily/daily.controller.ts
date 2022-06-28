import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DailyService } from './daily.service';
import { CreateDailyDto } from './dto/create-daily.dto';
import { Daily } from './entities/daily.entity';

@Controller('daily')
export class DailyController {
  constructor(
    private dailyService: DailyService
  ) { }

  @Post('')
  public async createDaily(@Body() create_data: CreateDailyDto): Promise<Daily> {
    return await this.dailyService.createDaily(create_data);
  }

  @Get('')
  public async getDailyList(@Query('page') page: number) {
    return await this.dailyService.getDailyList(page);
  }

  @Get('/:daily_id')
  public async getDailyDetail(@Param('daily_id') daily_id: number) {
    return await this.dailyService.getDailyDetail(daily_id);
  }
}
