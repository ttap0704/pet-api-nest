import { Accommodation } from 'src/accommodation/entities/accommodation.entity';
import { Transform } from 'stream';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class AccommodationViewsCount {
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
  accommodation_id: number;

  @ManyToOne(() => Accommodation, (accommodation: Accommodation) => accommodation)
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation
}

