import { EntityRepository, Repository } from 'typeorm';
import { Notice } from './notice.entity';

@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {
}