import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateEntireMenuDto } from './dto/update-entire_menu.dto';
import { EntireMenuRepository } from './entities/entire_menu.repository';

@Injectable()
export class EntireMenuService {
  constructor(
    @InjectRepository(EntireMenuRepository)
    private entireMenuRepository: EntireMenuRepository
  ) { }

  public async updateEntireMenuOrder(update_data: UpdateEntireMenuDto[]) {
    let update_length = 0;
    for (const data of update_data) {
      const update_res = await this.entireMenuRepository.update({ id: data.id }, { seq: data.seq })
      update_length += update_res.affected
    }

    return update_length == update_data.length ? true : false;
  }
}
