import { EntireMenuCategory } from 'src/entire_menu_category/entities/entire_menu_category.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class EntireMenu {
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
  label: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  price: number;

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

  @Column({
    type: 'int',
    nullable: false
  })
  category_id: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @ManyToOne(() => Restaurant, (restaurant: Restaurant) => restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant

  @ManyToOne(() => EntireMenuCategory, (entire_menu_category: EntireMenuCategory) => entire_menu_category)
  @JoinColumn({ name: 'category_id' })
  entire_menu_category: EntireMenuCategory
}





