import { Body, Controller, Get, Post } from '@nestjs/common';
import { Users } from 'src/users/entities/users.entity';
import { CreateManagerDto } from './dto/create-manager.dto';
import { ManagerService } from './manager.service';

@Controller('manager')
export class ManagerController {
  constructor(private managerService: ManagerService) { }

  @Get('')
  public getManager() {
    return 'hihi'
  }

  @Post('/join')
  public async joinManager(@Body() data: CreateManagerDto) {
    return await this.managerService.joinManager(data)
  }
}
