import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNullableFieldsToAddress1692265879502
  implements MigrationInterface
{
  name = 'AddNullableFieldsToAddress1692265879502';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "address" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "postalCode" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "postalCode" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "address" SET NOT NULL`,
    );
  }
}
