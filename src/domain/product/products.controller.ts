import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //모든 상품 가져오기
  @Get()
  @UseGuards(JwtAuthGuard)
  getProducts() {
    return this.productsService.getAllProducts();
  }

  //특정 상품 정보 가져오기
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getProduct(@Param('id') id: string) {
    return this.productsService.getProductById(+id);
  }
}
