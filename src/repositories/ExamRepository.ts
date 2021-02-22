import { EntityRepository, Repository } from 'typeorm';
import Exam from '../models/Exam';
import AppError from '../errors/AppError';

@EntityRepository(Exam)
class QuestionsRepository extends Repository<Exam> {
  public async findAllWithRelations(): Promise<Object | null> {
    try {
      const exams = await this.createQueryBuilder('exam')
        .select(['exam.id', 'exam.name', 'exam.description', 'exam.type'])
        .addSelect(['question.id', 'question.statement'])
        .addSelect([
          'option.id',
          'option.key',
          'option.value',
          'option.correct',
        ])
        .leftJoin('exam.questions', 'question')
        .leftJoin('question.options', 'option')
        .getMany();

      return exams || null;
    } catch (error) {
      throw new AppError({ message: `${error.message}`, statusCode: 400 });
    }
  }
}

export default QuestionsRepository;
