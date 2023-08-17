import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrganization1692200562640 implements MigrationInterface {
  name = 'CreateOrganization1692200562640';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "organization" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "organization"`);
  }
}
