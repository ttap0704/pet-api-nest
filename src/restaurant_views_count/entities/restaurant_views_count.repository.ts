import { EntityRepository, Repository } from 'typeorm';
import { RestaurantViewsCount } from './restaurant_views_count.entity';

@EntityRepository(RestaurantViewsCount)
export class RestaurantViewsCountRepository extends Repository<RestaurantViewsCount> {
}