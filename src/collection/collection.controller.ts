import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { AuthGuard } from '@nestjs/passport';
import { CollectionDto } from './dto/collection.dto';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {
  }

  @Get()
  public async getAllCollections() {
    return this.collectionService.findAll()
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe())
  public async create(@Body() collectionDto: CollectionDto) {
    return this.collectionService.create(collectionDto)
  }
}
