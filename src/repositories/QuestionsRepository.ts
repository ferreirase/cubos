import { EntityRepository, Repository, getRepository } from 'typeorm';
import Question from '../models/Question';
import Exam from '../models/Exam';
import AppError from '../errors/AppError';
import shuffleArray from '../functions/shuffleArray';

@EntityRepository(Question)
class QuestionsRepository extends Repository<Question> {
  public async findOptionsByQuestion(question_id: string): Promise<Object | null> {

    try {
      const questionExists = await this.findOne({
        where: {
          id: question_id,
        },
      });

      if (!questionExists) {
        throw new AppError({ message: 'Question not found', statusCode: 400 });
      }


      const question = await this.createQueryBuilder('question')
        .where('question.id = :id', { id: question_id })
        .select(['question.id', 'question.statement'])
        .addSelect([
          'option.id',
          'option.key',
          'option.value',
          'option.correct',
        ])
        .leftJoin('question.options', 'option')
        .getOne();


      return (
        {
          question_id,
          statement: question?.statement,
          options: shuffleArray(question?.options.sort(() => Math.random() - 0.5)),
        } || null
      );
    } catch (error) {
      throw new AppError({ message: `${error.message}`, statusCode: 400 });
    }
  }
}

export default QuestionsRepository;
