import { IsNumber, IsOptional } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {
  @IsOptional()
  @IsNumber()
  status: number;

  @IsOptional()
  @IsNumber()
  warning: number;
}