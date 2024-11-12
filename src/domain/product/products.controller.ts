import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Patch,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/global/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getProduct(@Param('id') id: string) {
    return this.productsService.getProductById(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @Body()
    createProductDto: {
      title: string;
      content: string;
      price: number;
      category: string;
    },
    @Request() req,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const { userId } = req.user;
    const { title, content, price, category } = createProductDto;

    return this.productsService.createProduct(
      userId,
      title,
      content,
      price,
      category,
      image,
    );
  }

  @Patch(':id/heart')
  @UseGuards(JwtAuthGuard)
  async addHeart(@Param('id') id: string) {
    return this.productsService.addHeart(+id);
  }

  @Patch(':id/unheart')
  @UseGuards(JwtAuthGuard)
  async removeHeart(@Param('id') id: string) {
    return this.productsService.removeHeart(+id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id') productId: number,
    @Body('status') newStatus: string,
  ) {
    return await this.productsService.updateStatus(productId, newStatus);
  }
}
