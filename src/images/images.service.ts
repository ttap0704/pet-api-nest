import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImagesRepository } from './entities/images.repository';
import { CONTENTS_CODE, UPLOAD_PATH_ENG } from '../../constant'

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImagesRepository)
    private imagesRepository: ImagesRepository
  ) { }

  public async deleteImages(type: string, target_id: number) {
    const images = await this.imagesRepository.find({ category: CONTENTS_CODE[type], target_id })
    const type_path = UPLOAD_PATH_ENG[type];
    const target_path = Math.floor(Number(target_id) / 50) * 50
    if (images.length > 0) {
      for (const image of images) {
        await fs.unlink(`${__dirname}/../../../image${type_path}${target_path}/${image.file_name}`, (err) => {
          console.log(err);
        })
      }
    }

    return await this.imagesRepository.delete({ category: CONTENTS_CODE[type], target_id })
  }
}
