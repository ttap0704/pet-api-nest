import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikesRepository } from './entities/likes.repository';
import { CATEGORY_LIST_LOW } from '../../constant'

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikesRepository)
    private likesRepository: LikesRepository
  ) { }

  public async getUserLikeProducts(user_id: number) {
    const find_list = await this.likesRepository.find({
      where: {
        user_id
      },
    })

    const list: { [key: string]: number[] } = {};
    for (const item of find_list) {
      if (!list[CATEGORY_LIST_LOW[item.category]]) {
        list[CATEGORY_LIST_LOW[item.category]] = [];
      }

      list[CATEGORY_LIST_LOW[item.category]].push(item.target_id)
    }

    return list;
  }

  public async likeProduct(data: CreateLikeDto) {
    const check = await this.likesRepository.findOne({
      where: {
        ...data
      }
    });

    if (check && check.id > 0) {
      return { id: check.id };
    } else {
      return await this.likesRepository.save(data);
    }
  }

  public async cancelLikeProduct(data: CreateLikeDto) {
    const check = await this.likesRepository.findOne({
      where: {
        ...data
      }
    });

    if (check && check.id > 0) {
      const delete_res = await this.likesRepository.delete({ ...data })
      return delete_res.affected == 1;
    } else {
      return true;
    }
  }
}
