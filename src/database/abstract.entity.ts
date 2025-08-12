import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }
}
