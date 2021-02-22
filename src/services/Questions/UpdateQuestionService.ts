import { getRepository } from 'typeorm';
import Exam from '../../models/Exam';
import Question from '../../models/Question';
import AppError from '../../errors/AppError';
import QuestionInterface from '../../interfaces/question';

interface QuestionReturn {
  id: string;
  statement: string;
}

class UpdateQuestionService {
  public async execute(
    question_id: string,
    exam_id: string,
    { statement }: QuestionInterface,
  ): Promise<QuestionReturn> {
    const examRepository = getRepository(Exam);
    const questionRepository = getRepository(Question);

    try {
      const questionExists = await questionRepository.findOne({
        where: {
          id: question_id,
        },
      });

      if (
        !(await examRepository.findOne({
          where: {
            id: exam_id,
          },
        }))
      ) {
        throw new AppError({ message: 'Exam not found', statusCode: 401 });
      }

      if (!questionExists) {
        throw new AppError({ message: 'Question not found', statusCode: 401 });
      }

      questionExists.statement = statement;
      questionExists.exam_id = exam_id;

      await questionRepository.save(questionExists);

      return questionExists;
    } catch (error) {
      throw new AppError({ message: `${error.message}`, statusCode: 401 });
    }
  }
}

export default UpdateQuestionService;
