import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { AuthGuard } from '@nestjs/passport';
import { ProductDTO } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Get()
  public async getAllProducts(@Query() query: ExpressQuery): Promise<Product[]> {
    return this.productService.findAll(query)
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  public async createProduct(@Body() data: ProductDTO): Promise<Product> {
    return this.productService.create(data)
  }

  @Get('/:name')
  public async getProductByName(@Param("name") name: string): Promise<Product> {
    return this.productService.findByName(name)
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  public async updateProduct(@Param("id") id: string, @Body() data: ProductDTO): Promise<Product> {
    return this.productService.update(id, data)
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe())
  @HttpCode(204)
  public async removeProduct(@Param("id") id: string): Promise<void> {
    return this.productService.delete(id)
  }

  @Get('/collection/:name')
  public async getProductsByCollection(@Param("name") name: string): Promise<Product[]> {
    return this.productService.findByCollection(name)
  }
}
