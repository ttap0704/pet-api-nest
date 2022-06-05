import { Controller, Get, Inject, Param, Post, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(
    @Inject(ImagesService)
    private imagesService: ImagesService
  ) { }

  @Get('/:type/:folder/:file_name')
  public async sendImages(@Param('type') type: string, @Param('folder') folder: string, @Param('file_name') file_name: string) {
    const file = createReadStream(join(process.cwd(), `image/${type}/${folder}/${file_name}`));
    return new StreamableFile(file);
  }

  @Post('/:type/:target_id/delete')
  public async deleteImages(@Param('type') type: string, @Param('target_id') target_id: number) {
    return await this.imagesService.deleteImages(type, target_id)
  }
}
