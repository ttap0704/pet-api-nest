import { Controller, Get, Param, Query } from '@nestjs/common';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
  constructor(
    private noticeService: NoticeService
  ) { }

  @Get('')
  public async getNotice(@Query('target') target: string, @Query('page') page: number) {
    return await this.noticeService.getNotice(target, page);
  }

  @Get('/:id')
  public async getNoticeDetail(@Param('id') id: number) {
    return await this.noticeService.getNoticeDetail(id);
  }
}
