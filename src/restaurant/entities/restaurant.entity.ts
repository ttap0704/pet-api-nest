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

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @ManyToOne(() => Users, (admin: Users) => admin)
  @JoinColumn({ name: 'admin_id' })
  admin: Users
}

