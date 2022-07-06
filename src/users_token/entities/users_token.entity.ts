import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class UsersToken {
  @Column({
    type: 'int',
    primary: true
  })
  user_id: number;

  @Column({
    type: 'varchar',
    length: 300,
    primary: true
  })
  access_token: string;

  @Column({
    type: 'varchar',
    length: 300
  })
  refresh_token: string;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: false,
    primary: true
  })
  ip: string;

  @CreateDateColumn()
  created_at!: Date;
}

