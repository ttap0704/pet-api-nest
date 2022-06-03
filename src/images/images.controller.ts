import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('images')
export class ImagesController {
  @Get('/:type/:folder/:file_name')
  public async sendImages(@Param('type') type: string, @Param('folder') folder: string, @Param('file_name') file_name: string) {
    const file = createReadStream(join(process.cwd(), `image/${type}/${folder}/${file_name}`));
    return new StreamableFile(file);
  }
}
