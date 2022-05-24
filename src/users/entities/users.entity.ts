import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    nullable: false
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
    nullable: false
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
  type: string

  @Column({
    type: 'tinyint',
    default: 0,
    nullable: false
  })
  certification: number;
}