import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';

@Controller('accommodation')
export class AccommodationController {
  constructor(
    @Inject(AccommodationService)
    private accommodationService: AccommodationService
  ) { }

  @Get('')
  public async getAccommodationList(@Query('types') types: string, @Query('location') location: string): Promise<any> {
    return await this.accommodationService.getAccommodationList(types, location);
  }

  @Get('/:accommodation_id')
  public async getAccommodationDetail(@Param('accommodation_id') accommodation_id: number): Promise<any> {
    return await this.accommodationService.getAccommodationDetail(accommodation_id);
  }
}
