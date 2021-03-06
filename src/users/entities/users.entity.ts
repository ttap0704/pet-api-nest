import { Accommodation } from 'src/accommodation/entities/accommodation.entity';
import { Business } from 'src/business/entities/business.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Users {
  @Column({
    type: 'int',
    unsigned: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true
  })
  login_id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: true
  })
  phone: string;

  @Column({
    type: 'smallint',
    nullable: true,
    default: 0,
  })
  wrong_num: number;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  nickname: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100
  })
  profile_path: string

  @Column({
    // super 0
    // restaurant 1
    // accommodation 2
    type: 'smallint',
    nullable: false
  })
  type: number

  @Column({
    type: 'tinyint',
    default: 0,
    nullable: false
  })
  certification: number;

  @Column({
    type: 'tinyint',
    default: 0,
    nullable: true
  })
  kakao: number;

  @Column({
    type: 'tinyint',
    default: 0,
    nullable: true
  })
  naver: number;

  @Column({
    type: 'tinyint',
    default: 0,
    nullable: true
  })
  male: number;

  @Column({
    type: 'int',
    default: 0,
    nullable: true
  })
  birth_year: number;

  @Column({
    type: 'tinyint',
    default: 0,
    nullable: false
  })
  warning: number;

  @Column({
    type: 'int',
    nullable: true
  })
  business_id: number;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null
  })
  refresh_token: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @OneToOne(() => Business, (business: Business) => business.id)
  @JoinColumn({ name: 'business_id' })
  business: Business
}