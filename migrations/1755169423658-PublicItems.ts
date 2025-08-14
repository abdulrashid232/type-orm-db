import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PublicItems1755169423658 implements MigrationInterface {
  private readonly logger = new Logger(PublicItems1755169423658.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Adding public column to item table');
    await queryRunner.query(`
      UPDATE item
      SET public = true
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Removing public column from item table');
    await queryRunner.query(`
      UPDATE item
      SET public = false
    `);
  }
}
