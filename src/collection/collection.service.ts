import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collection } from './collection.schema';
import { CollectionDto } from './dto/collection.dto';

@Injectable()
export class CollectionService {
    constructor(
        @InjectModel(Collection.name)
        private readonly collectionRepository: Model<Collection>
    ) { }

    public async findAll(): Promise<Collection[]> {
        return this.collectionRepository.find()
    }

    public async create(data: CollectionDto): Promise<Collection> {
        try {
            const collection = await this.collectionRepository.create(data)
            return collection
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException()
        }
    }
}
