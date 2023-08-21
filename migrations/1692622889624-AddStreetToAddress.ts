import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStreetToAddress1692622889624 implements MigrationInterface {
    name = 'AddStreetToAddress1692622889624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "street" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "street"`);
    }

}
