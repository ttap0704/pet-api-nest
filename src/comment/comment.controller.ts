import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(
    private commentService: CommentService
  ) { }

  @Post('')
  public async createComment(@Body() create_data: CreateCommentDto) {
    return this.commentService.createComment(create_data);
  }

  @Get('/category/:category/target/:target_id')
  public async getComments(@Param('category') category: number, @Param('target_id') target_id: number, @Query('skip') skip: number) {
    return this.commentService.getComments(category, target_id, skip)
  }
}
