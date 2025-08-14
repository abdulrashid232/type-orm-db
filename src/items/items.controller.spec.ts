import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { EntityManager } from 'typeorm';

describe('ItemsController', () => {
  let controller: ItemsController;

  beforeEach(async () => {
    const mockItemRepository = {};
    const mockEntityManager = {};

    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ItemsController],
      providers: [
        {
          provide: getRepositoryToken(Item),
          useValue: mockItemRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
        ItemsService,
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
