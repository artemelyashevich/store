import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core'

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private productRepository: mongoose.Model<Product>
    ) { }

    public async findAll(query: Query): Promise<Product[]> {
        const perPage = 10
        const currentPage = Number(query.page) || 1
        const skip = perPage * (currentPage - 1)
        const keyword = query.keyword ? {
            $regex: query.keyword,
            $options: 'i'
        } : {}
        const products = await this.productRepository.find(keyword).limit(perPage).skip(skip)
        return products
    }

    
}