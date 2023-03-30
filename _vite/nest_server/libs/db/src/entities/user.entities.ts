import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', comment: '名称' })
  name: string;

  @Column({ type: 'varchar', comment: '密码', default: '123456' })
  pass_word: string;

  @Column({ type: 'varchar', comment: '描述' })
  desc: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;
}
