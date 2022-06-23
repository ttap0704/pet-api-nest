import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/entities/users.repository';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './entities/comment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, CommentRepository])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule { }
