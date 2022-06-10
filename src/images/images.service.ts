import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImagesRepository } from './entities/images.repository';
import { CONTENTS_CODE } from '../../constant'

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImagesRepository)
    private imagesRepository: ImagesRepository
  ) { }

  public async deleteImages(type: string, target_id: number) {
    return await this.imagesRepository.delete({ category: CONTENTS_CODE[type], target_id })
  }
}
