import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from './review.schema';
import { AuthModule } from '../auth/auth.module';
import { ProductSchema } from 'src/product/product.schema';
import { UserSchema } from 'src/auth/user.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: "Review",
        schema: ReviewSchema
      },
      {
        name: "Product",
        schema: ProductSchema
      },
      {
        name: "User",
        schema: UserSchema
      }
    ])
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule { }
