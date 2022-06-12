import { EntityRepository, Repository } from 'typeorm';
import { AccommodationViewsCount } from './accommodation_views_count.entity';

@EntityRepository(AccommodationViewsCount)
export class AccommodationViewsCountRepository extends Repository<AccommodationViewsCount> {
}