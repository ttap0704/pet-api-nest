import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntireMenuController } from './entire_menu.controller';
import { EntireMenuService } from './entire_menu.service';
import { EntireMenuRepository } from './entities/entire_menu.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EntireMenuRepository])],
  controllers: [EntireMenuController],
  providers: [EntireMenuService],
  exports: [EntireMenuService]
})
export class EntireMenuModule { }
