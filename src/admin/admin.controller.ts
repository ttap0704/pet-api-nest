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
import { UpdateRestaurantDto } from 'src/restaurant/dto/update-restaurant.dto';
import { UpdateEntireMenuDto } from 'src/entire_menu/dto/update-entire_menu.dto';
import { EntireMenuService } from 'src/entire_menu/entire_menu.service';
import { EntireMenuCategoryService } from 'src/entire_menu_category/entire_menu_category.service';
import { ExposureMenuService } from 'src/exposure_menu/exposure_menu.service';
import { UpdateEntireMenuCategoryDto } from 'src/entire_menu_category/dto/update-entire_menu_category.dto';
import { UpdateExposureMenuDto } from 'src/exposure_menu/dto/update-exposure_menu.dto';
import { CreateExposureMenuDto } from 'src/exposure_menu/dto/create-exposure_menu.dto';
import { AddEntireMenuCategoryDto } from 'src/entire_menu_category/dto/add-entire_menu_category.dto';
import { ExposureMenu } from 'src/exposure_menu/entities/exposure_menu.entity';
import { UpdateExposureMenuOrderDto } from 'src/exposure_menu/dto/update-exposure_menu_order.dto';
import { EntireMenuCategory } from 'src/entire_menu_category/entities/entire_menu_category.entity';
import { UpdateEntireMenuCategoryOrderDto } from 'src/entire_menu_category/dto/update-entire_menu_category_order.dto';
import { UpdateEntireMenuOrderDto } from 'src/entire_menu/dto/update-entire_menu_order.dto';
import { CreateEntireMenuDto } from 'src/entire_menu/dto/create-entire_menu.dto';
import { EntireMenu } from 'src/entire_menu/entities/entire_menu.entity';

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

interface EntireMenuList extends EntireMenu {
  category_label: string,
  restaurant_label: string
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

  // ========================== 관리자 공통 시작
  @Post('/join')
  public async joinAdmin(@Body() data: CreateAdminDto) {
    return await this.adminService.joinAdmin(data)
  }

  @Get('/:admin/product')
  public async getAdminProduct(@Param('admin') admin: number) {
    return await this.adminService.getAdminProduct(admin);
  }

  @Get('/:admin/:type/:id/views')
  public async getViewsCount(@Param('admin') admin: number, @Param('type') type: string, @Param('id') id: number, @Query('year') year: string, @Query('month') month: string) {
    return await this.adminService.getViewsCount(admin, type, id, year, month);
  }
  // ========================== 관리자 공통 끝

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

  @Get('/:admin/restaurant/exposure_menu')
  public async getAdminExposureMenu(@Param('admin') admin: number, @Query('page') page: string): Promise<{ count: number, rows: ExposureMenu[] }> {
    return await this.exposureMenuService.getAdminExposureMenu(admin, page)
  }

  @Get('/:admin/restaurant/category')
  public async getAdminEntireMenuCategory(@Param('admin') admin: number, @Query('page') page: string): Promise<{ count: number, rows: EntireMenuCategory[] }> {
    return await this.entireMenuCategoryService.getAdminEntireMenuCategory(admin, page)
  }

  @Get('/:admin/restaurant/:restaurant_id/category')
  public async getAdminRestaurantEntireMenuCategory(@Param('restaurant_id') restaurant_id: number): Promise<EntireMenuCategory[]> {
    return await this.entireMenuCategoryService.getAdminRestaurantEntireMenuCategory(restaurant_id)
  }

  @Get('/:admin/restaurant/entire_menu')
  public async getAdminEntireMenu(@Param('admin') admin: number, @Query('page') page: string): Promise<{ count: number, rows: EntireMenuList[] }> {
    return await this.entireMenuService.getAdminEntireMenu(admin, page)
  }

  @Post('/:admin/restaurant/:restaurant_id/delete')
  public async deleteRestaurant(@Param('restaurant_id') restaurant_id: number) {
    return await this.restaurantService.deleteRestaurant(restaurant_id);
  }

  @Post('/:admin/restaurant/:restaurant_id/info')
  public async updateRestaurant(@Param('restaurant_id') restaurant_id: number, @Body() update_data: UpdateRestaurantDto) {
    return await this.restaurantService.updateRestaurant(restaurant_id, update_data)
  }

  @Post('/:admin/restaurant/:restaurant_id/category')
  public async addEntireMenuCategory(@Param('restaurant_id') restaurant_id: number, @Body() menu_data: AddEntireMenuCategoryDto[]) {
    return await this.entireMenuCategoryService.addEntireMenuCategory(restaurant_id, menu_data)
  }

  @Post('/:admin/restaurant/:restaurant_id/exposure_menu')
  public async addExposureMenu(@Param('restaurant_id') restaurant_id: number, @Body() menu_data: CreateExposureMenuDto[]) {
    return await this.exposureMenuService.addExposureMenu(restaurant_id, menu_data)
  }

  @Post('/:admin/restaurant/:restaurant_id/category/order')
  public async updateEntireMenuCategoryOrder(@Body() menu_data: UpdateEntireMenuCategoryOrderDto[]) {
    return await this.entireMenuCategoryService.updateEntireMenuCategoryOrder(menu_data)
  }

  @Post('/:admin/restaurant/:restaurant_id/exposure_menu/order')
  public async updateExposureMenuOrder(@Body() menu_data: UpdateExposureMenuOrderDto[]) {
    return await this.exposureMenuService.updateExposureMenuOrder(menu_data)
  }

  @Post('/:admin/restaurant/:restaurant_id/entire_menu/order')
  public async updateEntireMenuOrder(@Body() menu_data: UpdateEntireMenuOrderDto[]) {
    return await this.entireMenuService.updateEntireMenuOrder(menu_data)
  }

  @Post('/:admin/restaurant/:restaurant_id/entire_menu/:entire_menu_id/category')
  public async updateEntireMenuCategory(@Param('entire_menu_id') entire_menu_id: number, @Body() data: { category_id: number }) {
    return await this.entireMenuService.updateEntireMenuCategory(entire_menu_id, data)
  }

  @Post('/:admin/restaurant/:restaurant_id/exposure_menu/:exposure_menu_id/info')
  public async updateExposureMenu(@Param('exposure_menu_id') exposure_menu_id: number, @Body() update_data: UpdateExposureMenuDto) {
    return await this.exposureMenuService.updateExposureMenu(exposure_menu_id, update_data)
  }

  @Post('/:admin/restaurant/:restaurant_id/exposure_menu/:exposure_menu_id/delete')
  public async deleteExposureMenu(@Param('exposure_menu_id') exposure_menu_id: number,) {
    return await this.exposureMenuService.deleteExposureMenu(exposure_menu_id)
  }

  @Post('/:admin/restaurant/:restaurant_id/category/:category_id/info')
  public async updateEntireMenuCategoryInfo(@Param('category_id') category_id: number, @Body() update_data: UpdateEntireMenuCategoryDto) {
    return await this.entireMenuCategoryService.updateEntireMenuCategory(category_id, update_data)
  }

  @Post('/:admin/restaurant/:restaurant_id/category/:category_id/delete')
  public async deleteEntireMenuCategoryInfo(@Param('category_id') category_id: number,) {
    return await this.entireMenuCategoryService.deleteEntireMenuCategory(category_id)
  }

  @Post('/:admin/restaurant/:restaurant_id/category/:category_id/menu')
  public async addEntireMenu(@Param('restaurant_id') restaurant_id: number, @Param('category_id') category_id: number, @Body() menu_data: CreateEntireMenuDto[]) {
    return await this.entireMenuService.addEntireMenu(restaurant_id, category_id, menu_data)
  }

  @Post('/:admin/restaurant/:restaurant_id/entire_menu/:entire_menu_id/info')
  public async updateEntireMenuInfo(@Param('entire_menu_id') entire_menu_id: number, @Body() update_data: UpdateEntireMenuDto) {
    return await this.entireMenuService.updateEntireMenu(entire_menu_id, update_data)
  }

  @Post('/:admin/restaurant/:restaurant_id/entire_menu/:entire_menu_id/delete')
  public async deleteEntireMenu(@Param('entire_menu_id') entire_menu_id: number,) {
    return await this.entireMenuService.deleteEntireMenu(entire_menu_id)
  }

  // ========================== 음식점 관리자 끝
}
