import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collection } from './collection.schema';
import { CollectionDto } from './dto/collection.dto';
import { NotFoundError } from 'rxjs';

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

    public async update(id: string, data: CollectionDto): Promise<Collection> {
        const updatedProduct = await this.collectionRepository.findOneAndUpdate({ _id: id }, data, { new: true })
        if (!updatedProduct) {
            throw new InternalServerErrorException("Failed to update collection")
        }
        return updatedProduct
    }

    public async delete(name: string): Promise<void> {
        const collection = await this.collectionRepository.findOne({name: name})
        if (!collection) {
            throw new NotFoundException("No such collection")
        }
        await this.collectionRepository.deleteOne({id: collection._id})
    }
}
