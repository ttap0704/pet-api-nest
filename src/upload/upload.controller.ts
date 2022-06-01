import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Images } from 'src/images/entities/images.entity';
import { multerOptions } from '../../utils/multer_options'
import { UploadService } from './upload.service';

interface MulterFile extends File {
  filename: string;
}

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
  ) { }

  @Post('/image')
  @UseInterceptors(FilesInterceptor('files', undefined, multerOptions))
  public async uploadFiles(
    @UploadedFiles() files: MulterFile[],
    @Body() data: { category: string }
  ) {
    const file_names = files.map(item => item.filename);
    const uploadedFiles: Images[] = await this.uploadService.uploadImages(file_names, data.category);

    return uploadedFiles
  }
}
