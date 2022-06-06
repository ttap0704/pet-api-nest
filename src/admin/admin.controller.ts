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

interface AccommodationList extends Accommodation {
  accommodation_images: Images[]
}

interface RoomsList extends Rooms {
  rooms_images: Images[],
  accommodation_label: string
}

@Controller('admin')
// @UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(
    private adminService: AdminService,
    private accommodationService: AccommodationService,
    private roomsService: RoomsService,
    private accommodationPeakSeasonService: AccommodationPeakSeasonService
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
  public async updateRoomsSeq(@Body() rooms_data: UpdateRoomsDto[]) {
    return await this.roomsService.updateRoomsSeq(rooms_data)
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
  // ========================== 음식점 관리자 끝
}
