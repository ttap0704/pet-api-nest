import { Accommodation } from 'src/accommodation/entities/accommodation.entity';
import { Rooms } from 'src/rooms/entities/rooms.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Images {
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
  file_name: string;

  @Column({
    type: 'int',
    nullable: false,
    comment: '1: Restaurant / 11: ExposureMenu / 2: Accommodation / 21: Rooms'
  })
  category: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  target_id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  seq: number;

  @CreateDateColumn()
  created_at!: Date;
}

