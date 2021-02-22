import {
  QueryRunner,
  MigrationInterface,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateQuestion1612290258024 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'questions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'exam_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'statement',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'questions',
      new TableForeignKey({
        name: 'Exam',
        columnNames: ['exam_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'exams',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('questions');
  }
}
