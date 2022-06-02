import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Users } from 'src/users/entities/users.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateAdminAccommodationDto } from './dto/create-admin_accommodation.dto';
import { AccommodationService } from 'src/accommodation/accommodation.service';
import { Accommodation } from 'src/accommodation/entities/accommodation.entity';
import { Images } from 'src/images/entities/images.entity';

interface AccommodationList extends Accommodation {
  accommodation_images: Images[]
}

@Controller('admin')
// @UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(
    private adminService: AdminService,
    private accommodationService: AccommodationService
  ) { }

  @Get('')
  public getAdmin() {
    return 'hihi'
  }

  @Post('/join')
  public async joinAdmin(@Body() data: CreateAdminDto) {
    return await this.adminService.joinAdmin(data)
  }

  @Post('/:admin/accommodation')
  public async createAccommodation(@Param('admin') admin: number, @Body() data: CreateAdminAccommodationDto) {
    return await this.adminService.createAccommodation(admin, data);
  }

  @Get('/:admin/accommodation')
  public async getAdminAccommodation(@Param('admin') admin: number, @Query('page') page: string): Promise<{ count: number, rows: AccommodationList[] }> {
    return await this.accommodationService.getAdminAccommodation(admin, page)
  }
}
