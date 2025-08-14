import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Tag extends AbstractEntity<Tag> {
  @Column()
  content: string;
}
