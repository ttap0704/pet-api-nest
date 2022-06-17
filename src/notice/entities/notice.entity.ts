import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notice {
  @Column({
    type: 'int',
    unsigned: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 2000,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 10000,
    nullable: false,
  })
  contents: string;

  @Column({
    type: 'int',
    nullable: false,
    comment: '1: User / 2: Admin'
  })
  target: number;

  @Column({
    type: 'smallint',
    nullable: false,
    default: 1
  })
  status: number;

  @CreateDateColumn()
  created_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

