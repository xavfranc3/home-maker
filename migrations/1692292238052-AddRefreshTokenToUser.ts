import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenToUser1692292238052 implements MigrationInterface {
  name = 'AddRefreshTokenToUser1692292238052';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "refreshToken" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
  }
}
