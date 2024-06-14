import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core'
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private productRepository: mongoose.Model<Product>
    ) { }

    public async findAll(query: Query): Promise<Product[]> {
        try {
            const limit = Number(query.limit) || 10
            const currentPage = Number(query.page) || 1
            const skip = limit * (currentPage - 1)
            const keyword = query.keyword ? {
                $regex: query.keyword,
                $options: 'i'
            } : {}
            const products = await this.productRepository.find(keyword).limit(limit).skip(skip)
            return products
        } catch (err) {
            console.log(err)
            throw new InternalServerErrorException()
        }
    }

    public async findByName(name: string): Promise<Product> {
        try {
            const product = await this.productRepository.find({ name })[0]
            if (!product) {
                throw new NotFoundException()
            }
            return product
        }
        catch (err) {
            console.log(err)
            throw new InternalServerErrorException()
        }
    }

    public async create(data: ProductDTO): Promise<Product> {
        try {
            return this.productRepository.create(data)
        } catch (err) {
            console.log(err)
            throw new InternalServerErrorException()
        }
    }
}