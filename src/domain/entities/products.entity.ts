import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersModel } from './users.entity';

@Entity()
export class ProductsModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column()
  heartCount: number;

  @Column({ type: 'varchar', default: 'ONSALES' })
  status: string;

  productImage: string;

  // 판매한사람 매매매매핑
  @ManyToOne(() => UsersModel, (user) => user.products)
  seller: UsersModel;
}
