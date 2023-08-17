import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAddress1692203653449 implements MigrationInterface {
  name = 'CreateAddress1692203653449';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "postalCode" character varying NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "addressId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization" ADD CONSTRAINT "UQ_63c0d3f228775d613e037b94e25" UNIQUE ("addressId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization" ADD CONSTRAINT "FK_63c0d3f228775d613e037b94e25" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization" DROP CONSTRAINT "FK_63c0d3f228775d613e037b94e25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization" DROP CONSTRAINT "UQ_63c0d3f228775d613e037b94e25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization" DROP COLUMN "addressId"`,
    );
    await queryRunner.query(`DROP TABLE "address"`);
  }
}
