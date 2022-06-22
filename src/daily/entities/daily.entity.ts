import { Users } from 'src/users/entities/users.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Daily {
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
  contents: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  writer_id: number;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => Users, (writer: Users) => writer)
  @JoinColumn({ name: 'writer_id' })
  writer: Users
}

