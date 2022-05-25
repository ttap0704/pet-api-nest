import { Body, Controller, Get, Post } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';

@Controller('business')
export class BusinessController {
  constructor(private businessService: BusinessService) { }

  @Get('')
  public async testBusiness() {
    return 'test business'
  }

  @Post('/certification')
  public async certificateBusiness(@Body() data: CreateBusinessDto): Promise<{ pass: boolean, messasge?: string }> {
    return await this.businessService.certificateBusiness(data)
  }
}
