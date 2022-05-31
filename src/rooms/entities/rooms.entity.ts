import { Accommodation } from 'src/accommodation/entities/accommodation.entity';
import { Images } from 'src/images/entities/images.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Rooms {
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
  normal_price: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  normal_weekend_price: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  peak_price: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  peak_weekend_price: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  standard_num: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  maximum_num: number;

  @Column({
    type: 'varchar',
    length: 5,
    nullable: false,
  })
  entrance: string;

  @Column({
    type: 'varchar',
    length: 5,
    nullable: false,
  })
  leaving: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  amenities: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  additional_info: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  seq: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @ManyToOne(() => Accommodation, (accommodation: Accommodation) => accommodation.id)
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation
}



