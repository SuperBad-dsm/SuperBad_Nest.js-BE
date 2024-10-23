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
  ) {}

  async getAllProducts() {
    return this.productsRepository.find();
  }

  async getProductById(id: number) {
    const product = await this.productsRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
