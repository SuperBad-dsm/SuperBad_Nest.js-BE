import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsModel } from '../entities/products.entity';
import { UsersModel } from '../entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsModel, UsersModel])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
