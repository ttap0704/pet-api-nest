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
  views: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  postdate: string;

  @ManyToOne(() => Restaurant, (Restaurant: Restaurant) => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  Restaurant: Restaurant
}

