import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/entities/users.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from './entities/comment.repository';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,

    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository
  ) { }

  public async createComment(create_data: CreateCommentDto) {
    const data = {
      ...create_data,
      writer: await this.usersRepository.findOne({ where: { id: create_data.writer_id } })
    }

    return await this.commentRepository.save(data)
  }

  public async getComments(category: number, target_id: number, skip: number) {
    const skip_obj = {};
    if (Number(skip) >= 0) {
      skip_obj['take'] = 1000
      skip_obj['skip'] = skip
    }

    const list = await this.commentRepository.find({
      where: {
        category,
        target_id
      },
      order: {
        id: 'ASC'
      },
      ...skip_obj,
      relations: ['writer']
    })

    const final_list = [];
    for (const item of list) {
      final_list.push({
        id: item.id,
        comment: item.comment,
        writer_id: item.writer_id,
        nickname: item.writer.nickname,
        created_at: item.created_at,
        target_id: item.target_id
      })
    }

    return final_list;
  }

  public async getCommentDetail(comment_id: number) {
    const comment = await this.commentRepository.findOne({ where: { id: comment_id } });
    return comment ?? { id: null }
  }

  public async deleteComment(id: number) {
    return await this.commentRepository.delete({ id })
  }
}
