import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from './review.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: "Review",
        schema: ReviewSchema
      }
    ])
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule { }
