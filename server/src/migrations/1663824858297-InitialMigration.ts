import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1663824858297 implements MigrationInterface {
  name = 'InitialMigration1663824858297';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`access_token\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`song\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`artist\` varchar(255) NOT NULL, \`lyrics\` longtext NOT NULL, \`user_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), FULLTEXT INDEX \`IDX_75669bae45c450fe7d011fad22\` (\`title\`), FULLTEXT INDEX \`IDX_ca742d54ca40f760eff79094c2\` (\`artist\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`song\` ADD CONSTRAINT \`FK_d3d3c3bb3980d5575dd5bfef302\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`song\` DROP FOREIGN KEY \`FK_d3d3c3bb3980d5575dd5bfef302\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ca742d54ca40f760eff79094c2\` ON \`song\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_75669bae45c450fe7d011fad22\` ON \`song\``
    );
    await queryRunner.query(`DROP TABLE \`song\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
