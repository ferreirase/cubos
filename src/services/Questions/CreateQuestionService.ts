import { getRepository } from 'typeorm';
import Exam from '../../models/Exam';
import Question from '../../models/Question';
import AppError from '../../errors/AppError';
import QuestionInterface from '../../interfaces/question';

interface QuestionInterfaceWithExamID extends QuestionInterface {
  exam_id: string;
}

class CreateQuestionService {
  public async execute({
    statement,
    exam_id,
  }: QuestionInterfaceWithExamID): Promise<QuestionInterface> {
    const examRepository = getRepository(Exam);
    const questionRepository = getRepository(Question);

    try {
      const examExists = await examRepository.findOne({
        where: {
          id: exam_id,
        },
      });

      const questionExists = await questionRepository.findOne({
        where: {
          statement,
        },
      });

      if (!examExists) {
        throw new AppError({ message: 'Exam not found', statusCode: 400 });
      }

      if (questionExists) {
        throw new AppError({
          message: 'Question statement already exists',
          statusCode: 400,
        });
      }

      const newQuestion = questionRepository.create({
        exam_id,
        statement,
      });

      await questionRepository.save(newQuestion);

      return newQuestion;
    } catch (error) {
      throw new AppError({ message: `${error.message}`, statusCode: 401 });
    }
  }
}

export default CreateQuestionService;
