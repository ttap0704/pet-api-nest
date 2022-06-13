import { Controller, Get, Query } from '@nestjs/common';
import { SuperService } from './super.service';

@Controller('super')
export class SuperController {
  constructor(
    private superService: SuperService
  ) { }

  @Get('/product/restaurant')
  public async getRestaurantProducts(@Query('page') page: number): Promise<any> {
    return await this.superService.getRestaurantProducts(page)
  }

  @Get('/product/accommodation')
  public async getAccommodationProducts(@Query('page') page: number): Promise<any> {
    return await this.superService.getAccommodationProducts(page)
  }
}
