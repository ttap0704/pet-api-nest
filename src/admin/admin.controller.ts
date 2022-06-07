import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Users } from 'src/users/entities/users.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateAdminAccommodationDto } from './dto/create-admin_accommodation.dto';
import { CreateAdminRestaurantDto } from './dto/create-admin_restaurant.dto';
import { AccommodationService } from 'src/accommodation/accommodation.service';
import { Accommodation } from 'src/accommodation/entities/accommodation.entity';
import { Images } from 'src/images/entities/images.entity';
import { RoomsService } from 'src/rooms/rooms.service';
import { Rooms } from 'src/rooms/entities/rooms.entity';
import { CreateAccommodationPeakSeasonDto } from 'src/accommodation_peak_season/dto/create-accommodation_peak_season.dto';
import { AccommodationPeakSeasonService } from 'src/accommodation_peak_season/accommodation_peak_season.service';
import { UpdateAccommodationDto } from 'src/accommodation/dto/update-accommodation.dto';
import { CreateRoomsDto } from 'src/rooms/dto/create-rooms.dto';
import { UpdateRoomsDto } from 'src/rooms/dto/update-rooms.dto';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { UpdateRestaurantDto } from 'src/restaurant/dto/update-restaurant';
import { UpdateEntireMenuDto } from 'src/entire_menu/dto/update-entire_menu.dto';
import { EntireMenuService } from 'src/entire_menu/entire_menu.service';
import { EntireMenuCategoryService } from 'src/entire_menu_category/entire_menu_category.service';
import { ExposureMenuService } from 'src/exposure_menu/exposure_menu.service';
import { UpdateEntireMenuCategoryDto } from 'src/entire_menu_category/dto/update-entire_menu_category.dto';
import { UpdateExposureMenuyDto } from 'src/exposure_menu/dto/update-exposure_menu.dto';

interface AccommodationList extends Accommodation {
  accommodation_images: Images[]
}

interface RoomsList extends Rooms {
  rooms_images: Images[],
  accommodation_label: string
}

interface RestaurantList extends Restaurant {
  restaurant_images: Images[];
}


@Controller('admin')
// @UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(
    private adminService: AdminService,

    private accommodationService: AccommodationService,
    private roomsService: RoomsService,
    private accommodationPeakSeasonService: AccommodationPeakSeasonService,

    private restaurantService: RestaurantService,
    private entireMenuService: EntireMenuService,
    private entireMenuCategoryService: EntireMenuCategoryService,
    private exposureMenuService: ExposureMenuService
  ) { }

  @Get('')
  public getAdmin() {
    return 'hihi'
  }

  @Post('/join')
  public async joinAdmin(@Body() data: CreateAdminDto) {
    return await this.adminService.joinAdmin(data)
  }

  // ========================== 숙박업소 관리자 시작
  @Post('/:admin/accommodation')
  public async createAccommodation(@Param('admin') admin: number, @Body() data: CreateAdminAccommodationDto) {
    return await this.adminService.createAccommodation(admin, data);
  }

  @Get('/:admin/accommodation')
  public async getAdminAccommodation(@Param('admin') admin: number, @Query('page') page: string): Promise<{ count: number, rows: AccommodationList[] }> {
    return await this.accommodationService.getAdminAccommodation(admin, page)
  }

  @Get('/:admin/accommodation/rooms')
  public async getAdminRooms(@Param('admin') admin: number, @Query('page') page: string): Promise<{ count: number, rows: RoomsList[] }> {
    return await this.roomsService.getAdminRooms(admin, page)
  }

  @Post('/:admin/accommodation/:accommodation_id/delete')
  public async deleteAccommodation(@Param('accommodation_id') accommodation_id: number) {
    return await this.accommodationService.deleteAccommodation(accommodation_id)
  }

  @Post('/:admin/accommodation/:accommodation_id/season')
  public async updateSeasons(@Param('accommodation_id') accommodation_id: number, @Body('season') season: CreateAccommodationPeakSeasonDto[]) {
    return await this.accommodationPeakSeasonService.updateSeasons(accommodation_id, season)
  }

  @Post('/:admin/accommodation/:accommodation_id/info')
  public async updateAccommodation(@Param('accommodation_id') accommodation_id: number, @Body() update_data: UpdateAccommodationDto) {
    return await this.accommodationService.updateAccommodation(accommodation_id, update_data)
  }

  @Post('/:admin/accommodation/:accommodation_id/rooms')
  public async addRooms(@Param('accommodation_id') accommodation_id: number, @Body() rooms_data: CreateRoomsDto[]) {
    return await this.roomsService.addAdminRooms(accommodation_id, rooms_data)
  }

  @Post('/:admin/accommodation/:accommodation_id/rooms/order')
  public async updateRoomsOrder(@Body() rooms_data: UpdateRoomsDto[]) {
    return await this.roomsService.updateRoomsOrder(rooms_data)
  }

  @Post('/:admin/accommodation/:accommodation_id/rooms/:room_id/info')
  public async updateRooms(@Param('room_id') room_id: number, @Body() update_data: UpdateRoomsDto) {
    return await this.roomsService.updateRooms(room_id, update_data)
  }

  @Post('/:admin/accommodation/:accommodation_id/rooms/:room_id/delete')
  public async deleteRooms(@Param('room_id') room_id: number) {
    return await this.roomsService.deleteRooms(room_id)
  }

  // ========================== 숙박업소 관리자 끝

  // ========================== 음식점 관리자 시작
  @Post('/:admin/restaurant')
  public async createRestaurant(@Param('admin') admin: number, @Body() data: CreateAdminRestaurantDto) {
    return await this.adminService.createRestaurant(admin, data);
  }

  @Get('/:admin/restaurant')
  public async getAdminRestaurant(@Param('admin') admin: number, @Query('page') page: string): Promise<{ count: number, rows: RestaurantList[] }> {
    return await this.restaurantService.getAdminRestaurant(admin, page)
  }

  @Post('/:admin/restaurant/:restaurant_id/info')
  public async updateRestaurant(@Param('restaurant_id') restaurant_id: number, @Body() update_data: UpdateRestaurantDto) {
    return await this.restaurantService.updateRestaurant(restaurant_id, update_data)
  }

  @Post('/:admin/restaurant/:restaurant_id/entire_menu/order')
  public async updateEntireMenuOrder(@Body() menu_data: UpdateEntireMenuDto[]) {
    return await this.entireMenuService.updateEntireMenuOrder(menu_data)
  }

  @Post('/:admin/restaurant/:restaurant_id/category/order')
  public async updateEntireMenuCategoryOrder(@Body() menu_data: UpdateEntireMenuCategoryDto[]) {
    return await this.entireMenuCategoryService.updateEntireMenuCategoryOrder(menu_data)
  }

  @Post('/:admin/restaurant/:restaurant_id/exposure_menu/order')
  public async updateExposureMenuOrder(@Body() menu_data: UpdateExposureMenuyDto[]) {
    return await this.exposureMenuService.updateExposureMenuOrder(menu_data)
  }
  // ========================== 음식점 관리자 끝
}
