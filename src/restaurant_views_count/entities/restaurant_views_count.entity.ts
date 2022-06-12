import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RestaurantViewsCount {
  @Column({
    type: 'int',
    unsigned: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: false,
  })
  views: number;

  @Column({
    type: 'date',
    nullable: false,
  })
  postdate: string;

  @Column({
    type: 'int',
    nullable: false
  })
  restaurant_id: number

  @ManyToOne(() => Restaurant, (restaurant: Restaurant) => restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant
}

