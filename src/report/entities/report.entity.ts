import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Report {
  @Column({
    type: 'int',
    unsigned: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: '1: 스팸 / 2: 광고성 게시물 / 3: 욕설 및 비방 / 4: 음란물 배포 / 5: 지적 재산권 침해 / 6: 거짓 정보 / 7: 불법 상품 판매'
  })
  reason: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: '1: Restaurant / 2: Accommodation / 50: daily'
  })
  category: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  target_id: number;

  @Column({
    type: 'int',
    nullable: true
  })
  reporter: number

  @Column({
    type: 'varchar',
    length: '100',
    nullable: false,
  })
  ip: string;

  @CreateDateColumn()
  created_at!: Date;
}

