import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { EntityManager } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { CreateListingDto } from './dto/create-listing.dto';

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
        {
          provide: EntityManager,
          useValue: {
            save: jest.fn(),
            transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an item', async () => {
    const listing = new CreateListingDto();
    listing.rating = 5;
    listing.description = 'Test Description';
    const itemData: CreateItemDto = {
      name: 'Test Item',
      listing: listing,
      comments: [],
      tags: [],
    };

    jest.spyOn(service, 'create').mockResolvedValue({
      id: 1,
      name: 'Test Item',
      listing: {
        id: 1,
        description: 'Test Description',
        rating: 5,
      },
      comments: [],
      tags: [],
      public: true,
    });

    const result = await service.create(itemData);
    expect(result).toEqual({
      id: 1,
      name: 'Test Item',
      listing: {
        id: 1,
        description: 'Test Description',
        rating: 5,
      },
      comments: [],
      tags: [],
      public: true,
    });
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      const result = [
        {
          id: 1,
          name: 'Test Item',
          listing: {
            id: 1,
            description: 'Test Description',
            rating: 5,
          },
          comments: [],
          tags: [],
          public: true,
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single item', async () => {
      const result = {
        id: 1,
        name: 'Test Item',
        listing: {
          id: 1,
          description: 'Test Description',
          rating: 5,
        },
        comments: [],
        tags: [],
        public: true,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await service.findOne(1)).toEqual(result);
    });
  });
});
