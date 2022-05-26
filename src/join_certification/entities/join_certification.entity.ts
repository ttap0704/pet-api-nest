import { Users } from 'src/users/entities/users.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JoinCertification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  cert_num: string;

  @Column({
    type: 'int',
    nullable: false
  })
  admin_id: number;
}