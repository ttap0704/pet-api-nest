import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    private restaurantService: RestaurantService
  ) { }

  @Get('')
  public async getdRestaurantList(@Query('types') types: string, @Query('location') location: string): Promise<any> {
    return await this.restaurantService.getRestaurantList(types, location);
  }

  @Get('/:restaurant_id')
  public async getdRestaurantDetail(@Param('restaurant_id') restaurant_id: number): Promise<any> {
    return await this.restaurantService.getRestaurantDetail(restaurant_id);
  }

  @Post('/:restaurant_id/count')
  public async setAccommodationViewsCount(@Param('restaurant_id') restaurant_id: number): Promise<any> {
    return await this.restaurantService.setRestaurantViewsCount(restaurant_id);
  }
}
