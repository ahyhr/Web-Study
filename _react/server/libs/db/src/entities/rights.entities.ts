import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Rights {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', comment: '名称' })
  label: string;

  @Column({ type: 'varchar', comment: '路由' })
  key: string;

  @Column({ type: 'int', comment: '关系' })
  parent_id: number;

  @Column({ type: 'int', comment: '显示' })
  pagepermisson: number;
}
