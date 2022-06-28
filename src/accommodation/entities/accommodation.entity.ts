import { AccommodationPeakSeason } from 'src/accommodation_peak_season/entities/accommodation_peak_season.entity';
import { AccommodationViewsCount } from 'src/accommodation_views_count/entities/accommodation_views_count.entity';
import { Rooms } from 'src/rooms/entities/rooms.entity';
import { Users } from 'src/users/entities/users.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Accommodation {
  @Column({
    type: 'int',
    unsigned: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  contact: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  site: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  kakao_chat: string;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  bname: string;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  building_name: string;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  detail_address: string;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: false,
  })
  label: string;

  @Column({
    type: 'tinyint',
    nullable: false,
    comment: `
    1. 펜션
    2. 호텔 / 리조트
    3. 캠핑 / 글램핑
    4. 기타
    `
  })
  type: number;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  sido: string;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  sigungu: string;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  zonecode: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  road_address: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  introduction: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 0
  })
  warning: number;

  @Column({
    type: 'smallint',
    nullable: false,
    default: 1
  })
  status: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  admin_id: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @ManyToOne(() => Users, (admin: Users) => admin.id)
  @JoinColumn({ name: 'admin_id' })
  admin: Users

  @OneToMany(() => Rooms, (rooms) => rooms.accommodation)
  accommodation_rooms: Rooms[];

  @OneToMany(() => AccommodationPeakSeason, (accommodation_peak_season) => accommodation_peak_season.accommodation)
  accommodation_peak_season: AccommodationPeakSeason[];

  @OneToMany(() => AccommodationViewsCount, (accommodation_views_count) => accommodation_views_count.id)
  accommodation_views_count: AccommodationViewsCount[];
}

