import { EntityRepository, Repository } from 'typeorm';
import { Daily } from './daily.entity';

@EntityRepository(Daily)
export class DailyRepository extends Repository<Daily> {
}