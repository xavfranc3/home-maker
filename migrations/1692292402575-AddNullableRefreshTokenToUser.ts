import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNullableRefreshTokenToUser1692292402575
  implements MigrationInterface
{
  name = 'AddNullableRefreshTokenToUser1692292402575';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "refreshToken" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "refreshToken" SET NOT NULL`,
    );
  }
}
