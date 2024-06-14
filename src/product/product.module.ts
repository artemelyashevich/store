import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.schema';
import { AuthModule } from '../auth/auth.module';
import { CollectionSchema } from 'src/collection/collection.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: "Product",
        schema: ProductSchema
      },
      {
        name: "Collection",
        schema: CollectionSchema
      }
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
