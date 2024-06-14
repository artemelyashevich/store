import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private productRepository: mongoose.Model<Product>
    ) {}

    public async findAll(): Promise<Product []> {
        const products = await this.productRepository.find()
        return products
    }
}