import { EntireMenu } from 'src/entire_menu/entities/entire_menu.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @OneToMany(() => EntireMenu, (entrie_menu: EntireMenu) => entrie_menu)
  menu: EntireMenu[]

  @ManyToOne(() => Restaurant, (restaurant: Restaurant) => restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant
}