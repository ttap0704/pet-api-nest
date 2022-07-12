import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Likes {
  @Column({
    type: 'int',
    unsigned: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  user_id: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: '1: Restaurant / 2: Accommodation/ 100: Notice / 50: daily'
  })
  category: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  target_id: number;

  @CreateDateColumn()
  created_at!: Date;
}

