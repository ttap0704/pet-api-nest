import { Users } from 'src/users/entities/users.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Business {
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
  b_nm: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true
  })
  b_no: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  b_sector: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  b_type: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  p_nm: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  start_dt: string;
}