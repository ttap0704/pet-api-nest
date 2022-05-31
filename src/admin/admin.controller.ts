import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Users } from 'src/users/entities/users.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateAdminAccommodationDto } from './dto/create-admin_accommodation.dto';

@Controller('admin')
// @UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private adminService: AdminService) { }

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
}
