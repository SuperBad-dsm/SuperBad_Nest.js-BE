import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsModel } from 'src/domain/entities/products.entity';
import { UsersModel } from 'src/domain/entities/users.entity';
import { S3Service } from 'src/global/s3/s3.service';

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
  imageUrl: string | null;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsModel)
    private readonly productsRepository: Repository<ProductsModel>,
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
    private readonly s3Service: S3Service,
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
    image: Express.Multer.File,
  ) {
    const seller = await this.usersRepository.findOne({
      where: { userId },
    });
    if (!seller) {
      throw new NotFoundException(`Seller with ID ${userId} not found`);
    }

    const uploadResult = await this.s3Service.uploadImage(image);

    const imageUrl = this.s3Service.getFileUrl(uploadResult.key);

    const product = this.productsRepository.create({
      title,
      content,
      price,
      category,
      createdDate: new Date(),
      heartCount: 0,
      status: 'ONSALES',
      seller,
      imageUrl,
    });

    return this.productsRepository.save(product);
  }

  async addHeart(productId: number) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`상품업슴`);
    }

    product.heartCount += 1;
    return this.productsRepository.save(product);
  }

  async removeHeart(productId: number) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`상품업슴`);
    }

    if (product.heartCount > 0) {
      product.heartCount -= 1;
    }
    return this.productsRepository.save(product);
  }
}
