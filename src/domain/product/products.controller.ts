import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //모든 상품 가져오기
  @Get()
  getProducts() {
    return this.productsService.getAllProducts();
  }

  //특정 상품 정보 가져오기
  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProductById(+id);
  }
}
