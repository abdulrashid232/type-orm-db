import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
  DataSource,
} from 'typeorm';
import { Item } from '../entities/item.entity';

@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item> {
  constructor(private readonly dataSource: DataSource) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return Item;
  }

  afterInsert(event: InsertEvent<Item>) {
    const item = event.entity;
    console.log(`Item inserted: ${item.id}`);
  }

  afterUpdate(event: UpdateEvent<Item>) {
    const item = event.entity;
    console.log(`Item updated: ${item?.id}`);
  }

  afterRemove(event: RemoveEvent<Item>) {
    const item = event.entity;
    console.log(`Item removed: ${item?.id}`);
  }
}
