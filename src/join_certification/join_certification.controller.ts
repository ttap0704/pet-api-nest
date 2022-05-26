import { Body, Controller, Post } from '@nestjs/common';
import { CompareJoinCertificationDto } from './dto/compare-join_certification.dto';
import { JoinCertificationService } from './join_certification.service';

@Controller('join-certification')
export class JoinCertificationController {

  constructor(private joinCertificationService: JoinCertificationService) { }

  @Post('')
  public async compareCertNum(@Body() data: CompareJoinCertificationDto) {
    return await this.joinCertificationService.compareCertNum(data)
  }
}
