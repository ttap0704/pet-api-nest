import { EntireMenu } from 'src/entire_menu/entities/entire_menu.entity';
import { EntireMenuCategory } from 'src/entire_menu_category/entities/entire_menu_category.entity';
import { ExposureMenu } from 'src/exposure_menu/entities/exposure_menu.entity';
import { Users } from 'src/users/entities/users.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Restaurant {
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
    length: 5,
    nullable: false,
  })
  open: string;

  @Column({
    type: 'varchar',
    length: 5,
    nullable: false,
  })
  close: string;

  @Column({
    type: 'varchar',
    length: 5,
    nullable: false,
  })
  last_order: string;


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
    1. 음식점
    2. 카페
    3. 주점/술집
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
    type: 'smallint',
    nullable: false,
    default: 1
  })
  status: number;

  @Column({
    type: 'int',
    nullable: false,
    default: 0
  })
  warning: number;

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

  @OneToMany(() => EntireMenuCategory, (entire_menu_category) => entire_menu_category.restaurant)
  entire_menu_category: EntireMenuCategory[];

  @OneToMany(() => ExposureMenu, (exposure_menu) => exposure_menu.restaurant)
  exposure_menu: ExposureMenu[];

  @ManyToOne(() => Users, (admin: Users) => admin)
  @JoinColumn({ name: 'admin_id' })
  admin: Users
}

