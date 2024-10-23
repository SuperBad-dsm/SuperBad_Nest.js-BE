import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { ProductsModel } from './products.entity';

@Entity()
export class UsersModel {
  @PrimaryColumn({ type: 'varchar' })
  userId: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @OneToMany(() => ProductsModel, (product) => product.seller)
  products: ProductsModel[];
}
