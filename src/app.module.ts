import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CollectionModule } from './collection/collection.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import {ConfigModule} from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    CollectionModule,
    ProductModule,
    ReviewModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
