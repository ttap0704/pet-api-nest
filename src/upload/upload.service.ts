import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateImagesDto } from "src/images/dto/create-images.dto";
import { Images } from "src/images/entities/images.entity";
import { ImagesRepository } from "src/images/entities/images.repository";
import { UsersRepository } from "src/users/entities/users.repository";

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(ImagesRepository)
    private imagesRepository: ImagesRepository,

    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository
  ) { }

  public async uploadImages(file_names: string[], category: string): Promise<Images[]> {
    const images: Images[] = [];

    for (const file_name of file_names) {
      const file_name_split = file_name.split('_');

      const seq = Number(file_name_split[file_name_split.length - 2]);
      let target_id = Number(file_name_split[0])
      const target_path = Math.floor(Number(target_id) / 50) * 50

      const insert_data: CreateImagesDto = {
        file_name,
        seq,
        category: Number(category),
        target_id
      }

      const cur_image = await this.imagesRepository.save(insert_data)
      images.push(cur_image);

      if (category == '0') {
        await this.usersRepository.update({ id: target_id }, { profile_path: `/images/profile/${target_path}/${file_name}` })
      }
    }


    return images;
  }
}