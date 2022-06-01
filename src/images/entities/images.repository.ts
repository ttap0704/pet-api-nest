import { EntityRepository, Repository } from 'typeorm';
import { CreateImagesDto } from '../dto/create-images.dto';
import { Images } from './images.entity';

@EntityRepository(Images)
export class ImagesRepository extends Repository<Images> {
  public async createImages(data: CreateImagesDto[]): Promise<Images[]> {
    const images: Images[] = []

    for (const image_data of data) {
      const image = await this.save(image_data);
      images.push(image)
    }

    return images;
  }
}