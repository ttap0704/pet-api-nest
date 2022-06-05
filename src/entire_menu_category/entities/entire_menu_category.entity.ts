import { EntireMenu } from 'src/entire_menu/entities/entire_menu.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EntireMenuCategory {
  @Column({
    type: 'int',
    unsigned: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: false,
  })
  category: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  seq: number;

  @Column({
    type: 'int',
    nullable: false
  })
  restaurant_id: number;

  @OneToMany(() => EntireMenu, (entrie_menu: EntireMenu) => entrie_menu)
  entire_menu: EntireMenu

  @ManyToOne(() => Restaurant, (restaurant: Restaurant) => restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant
}