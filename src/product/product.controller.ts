import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import {Query as ExpressQuery} from 'express-serve-static-core'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Get()
  public async getAllProducts(@Query() query: ExpressQuery): Promise<Product[]> {
    return this.productService.findAll(query)
  }
}
