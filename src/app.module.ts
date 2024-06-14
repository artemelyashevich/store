import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CollectionModule } from './collection/collection.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [UserModule, CollectionModule, ProductModule, ReviewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
