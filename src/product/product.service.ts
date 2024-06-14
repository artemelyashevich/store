import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core'
import { ProductDTO } from './dto/product.dto';
import { Collection } from '../collection/collection.schema';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private productRepository: mongoose.Model<Product>,
        @InjectModel(Collection.name)
        private collectionRepository: mongoose.Model<Collection>
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

    public async findByCollection(collectionName: string): Promise<Product[]> {
        const collection = await this.collectionRepository.findOne({name: collectionName})
        if (!collection) {
            throw new NotFoundException("No such collection")
        }
        const products = await this.productRepository.find({collection: collection.name})
        return products
    } 

    public async findByName(name: string): Promise<Product> {
        const product = await this.productRepository.findOne({ name: name })
        if (!product) {
            throw new NotFoundException()
        }
        return product
    }

    public async create(data: ProductDTO): Promise<Product> {
        const collection = await this.collectionRepository.findOne({ name: data.collection })
        if (!collection) {
            throw new NotFoundException("No such collection")
        }
        return this.productRepository.create({ ...data, collection: collection.name })
    }

    public async update(id: string, data: ProductDTO): Promise<Product> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundException("No such product");
        }
        const collection = await this.collectionRepository.findOne({ name: data.collection });
        if (!collection) {
            throw new NotFoundException("No such collection");
        }
        const updatedProduct = await this.productRepository.findOneAndUpdate({ _id: id }, data, { new: true });
        if (!updatedProduct) {
            throw new InternalServerErrorException("Failed to update product");
        }
        return updatedProduct;
    }

    public async delete(id: string) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundException("No such product");
        }
        await this.productRepository.deleteOne({ _id: id })
    }
}