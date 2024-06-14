import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { CollectionSchema } from './collection.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
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
export class CollectionModule {}
