import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { UPLOAD_PATH_ENG } from 'constant';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';

export const multerOptions: MulterOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      // 이미지 형식은 jpg, jpeg, png만 허용합니다.
      callback(null, true);
    } else {
      callback(
        new HttpException(
          {
            message: 1,
            error: '지원하지 않는 이미지 형식입니다.',
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination: (request, file, callback) => {
      const name_splited = file.originalname.split('_');
      const type_path = UPLOAD_PATH_ENG[name_splited[0]]
      const target_path = Math.floor(Number(name_splited[1]) / 50) * 50
      const upload_path = `image`;

      if (!existsSync(upload_path)) {
        mkdirSync(upload_path);
      }
      if (!existsSync(`${upload_path}${type_path}`)) {
        mkdirSync(`${upload_path}${type_path}`);
      }
      if (!existsSync(`${upload_path}${type_path}${target_path}`)) {
        mkdirSync(`${upload_path}${type_path}${target_path}`);
      }
      callback(null, `${upload_path}${type_path}${target_path}`);
    },
    filename: (request, file, callback) => {
      const name_splited = file.originalname.split('_');
      const file_name = name_splited.slice(2).join('_');
      callback(null, `${file_name}`);
    },
  }),
  limits: {
    fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
    fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
  },
};