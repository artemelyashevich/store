import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './review.schema';
import { Model } from 'mongoose';
import { Product } from '../product/product.schema';
import { ReviewDTO } from './dto/review.dto';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name)
        private readonly reviewRepository: Model<Review>,
        @InjectModel(Product.name)
        private readonly productRepository: Model<Product>
    ) { }

    public async findAll(): Promise<Review[]> {
        return this.reviewRepository.find()
    }

    public async findByProduct(id: string): Promise<Review[]> {
        const product = await this.productRepository.findById(id)
        if (!product) {
            throw new NotFoundException("No such product")
        }
        const reviews = await this.reviewRepository.find({ productId: product._id })
        return reviews
    }

    public async create(data: ReviewDTO, user): Promise<Review> {
        return this.reviewRepository.create({ ...data, userId: user._id })
    }

    public async delete(id: string): Promise<void> {
        await this.reviewRepository.deleteOne({ _id: id })
    }
}
