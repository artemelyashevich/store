import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { CollectionSchema } from './collection.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: "Collection",
        schema: CollectionSchema
      }
    ])
  ],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule { }
