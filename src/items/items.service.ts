import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comments.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      ...createItemDto.listing,
      rating: 0,
    });
    const tags = createItemDto.tags.map(
      (tag) => new Tag({ content: tag.content }),
    );
    const item = new Item({
      ...createItemDto,
      listing,
      comments: [],
      tags,
    });
    await this.entityManager.save(item);
    return item;
  }

  async findAll() {
    return await this.itemRepository.find();
  }

  async findOne(id: number) {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['listing', 'comments', 'tags'],
    });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    await this.entityManager.transaction(async (entityManager) => {
      const item = await this.itemRepository.findOneBy({ id });
      if (!item) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      const newComments = updateItemDto.comments?.map(
        (comment) => new Comment({ content: comment }),
      );

      item.comments = newComments || item.comments;
      item.name = updateItemDto.name || item.name;
      item.public = updateItemDto.public ?? item.public;

      await entityManager.save(item);
      const tagContent = `${Math.random().toString(36).substring(2, 15)}`;
      const tag = new Tag({ content: tagContent });
      await entityManager.save(tag);
    });
  }

  async remove(id: number) {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return await this.itemRepository.remove(item);
  }
}
