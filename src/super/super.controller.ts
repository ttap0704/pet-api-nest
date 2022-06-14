import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AccommodationService } from 'src/accommodation/accommodation.service';
import { UpdateAccommodationDto } from 'src/accommodation/dto/update-accommodation.dto';
import { UpdateRestaurantDto } from 'src/restaurant/dto/update-restaurant';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { SuperService } from './super.service';

@Controller('super')
export class SuperController {
  constructor(
    private superService: SuperService,
    private restaurantService: RestaurantService,
    private accommodationService: AccommodationService
  ) { }

  @Get('/product/restaurant')
  public async getRestaurantProducts(@Query('page') page: number): Promise<any> {
    return await this.superService.getRestaurantProducts(page)
  }

  @Get('/product/accommodation')
  public async getAccommodationProducts(@Query('page') page: number): Promise<any> {
    return await this.superService.getAccommodationProducts(page)
  }

  @Post('/product/restaurant/:restaurant_id/status')
  public async setRestaurantStatus(@Param('restaurant_id') restaurant_id: number, @Body() data: UpdateRestaurantDto): Promise<any> {
    return await this.restaurantService.updateRestaurant(restaurant_id, data)
  }

  @Post('/product/accommodation/:accommodation_id/status')
  public async setAccommodationStatus(@Param('accommodation_id') accommodation_id: number, @Body() data: UpdateAccommodationDto): Promise<any> {
    return await this.accommodationService.updateAccommodation(accommodation_id, data)
  }
}
