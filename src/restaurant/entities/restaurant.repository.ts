import { EntityRepository, Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> { }