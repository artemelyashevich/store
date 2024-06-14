import { Module } from '@nestjs/common';
import { CollectionModule } from './collection/collection.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import {ConfigModule} from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    CollectionModule,
    ProductModule,
    ReviewModule,
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
