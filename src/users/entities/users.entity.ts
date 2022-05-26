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
    nullable: false
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
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
    type: 'int',
    nullable: true
  })
  business_id: number;

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