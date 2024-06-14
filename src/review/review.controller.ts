import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDTO } from './dto/review.dto';
import { Review } from './review.schema';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/auth/user.schema';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Get()
  public async getAllReviews(): Promise<Review[]> {
    return this.reviewService.findAll()
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  public async create(@Body() data: ReviewDTO, @CurrentUser() user: User): Promise<Review> {
    return this.reviewService.create(data, user)
  }

  @Get("/product/:id")
  public async getReviewsByProduct(@Param("id") productId: string): Promise<Review[]> {
    return this.reviewService.findByProduct(productId)
  }

  @Delete("/:id")
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe())
  @HttpCode(204)
  public async delete(@Param("id") id: string): Promise<void> {
    return this.reviewService.delete(id)
  }
}
