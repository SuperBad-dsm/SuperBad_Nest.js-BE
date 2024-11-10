import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsModel } from 'src/domain/entities/products.entity';
import { UsersModel } from 'src/domain/entities/users.entity';

export interface ProductModel {
  id: number;
  title: string;
  content: string;
  price: number;
  category: string;
  createdDate: Date;
  heartCount: number;
  status: string;
  seller: UsersModel;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsModel)
    private readonly productsRepository: Repository<ProductsModel>,
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
  ) {}

  async getAllProducts() {
    return this.productsRepository.find({ relations: ['seller'] });
  }

  async getProductById(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['seller'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async createProduct(
    userId: string,
    title: string,
    content: string,
    price: number,
    category: string,
  ) {
    const seller = await this.usersRepository.findOne({
      where: { userId },
    });
    if (!seller) {
      throw new NotFoundException(`Seller with ID ${userId} not found`);
    }

    const product = this.productsRepository.create({
      title,
      content,
      price,
      category,
      createdDate: new Date(),
      heartCount: 0,
      status: 'available',
      seller,
    });

    return this.productsRepository.save(product);
  }
}
