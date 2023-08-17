import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrganizationUniqueName1692263709523
  implements MigrationInterface
{
  name = 'AddOrganizationUniqueName1692263709523';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization" ADD CONSTRAINT "UQ_c21e615583a3ebbb0977452afb0" UNIQUE ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization" DROP CONSTRAINT "UQ_c21e615583a3ebbb0977452afb0"`,
    );
  }
}
