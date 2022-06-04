import { Accommodation } from 'src/accommodation/entities/accommodation.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class AccommodationPeakSeason {
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
  start: string;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: false,
  })
  end: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  accommodation_id: number;

  @ManyToOne(() => Accommodation, (accommodation: Accommodation) => accommodation)
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation
}

