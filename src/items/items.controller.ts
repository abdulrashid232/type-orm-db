import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    const item = await this.itemsService.create(createItemDto);
    return {
      message: 'Item created successfully',
      status: 'success',
      data: item,
    };
  }

  @Get()
  async findAll() {
    const items = await this.itemsService.findAll();
    return {
      message: 'Items retrieved successfully',
      status: 'success',
      data: items,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const item = await this.itemsService.findOne(+id);
    return {
      message: 'Item retrieved successfully',
      status: 'success',
      data: item,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    const updatedItem = await this.itemsService.update(+id, updateItemDto);
    return {
      message: 'Item updated successfully',
      status: 'success',
      data: updatedItem,
    };
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.itemsService.remove(+id);
    return { message: 'Item removed successfully', status: 'success' };
  }
}
