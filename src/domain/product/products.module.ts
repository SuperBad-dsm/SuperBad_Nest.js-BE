import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsModel } from 'src/domain/entities/products.entity';
import { UsersModel } from 'src/domain/entities/users.entity';
import { S3Module } from 'src/global/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsModel, UsersModel]), S3Module],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
