import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateEntireMenuCategoryDto } from './dto/update-entire_menu_category.dto';
import { EntireMenuCategoryRepository } from './entities/entire_menu_category.repository';

@Injectable()
export class EntireMenuCategoryService {
  constructor(
    @InjectRepository(EntireMenuCategoryRepository)
    private entireMenuCategoryRepository: EntireMenuCategoryRepository
  ) { }

  public async updateEntireMenuCategoryOrder(update_data: UpdateEntireMenuCategoryDto[]) {
    let update_length = 0;
    for (const data of update_data) {
      const update_res = await this.entireMenuCategoryRepository.update({ id: data.id }, { seq: data.seq })
      update_length += update_res.affected
    }

    return update_length == update_data.length ? true : false;
  }
}
