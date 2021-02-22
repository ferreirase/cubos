import { getRepository } from 'typeorm';
import Question from '../../models/Question';
import AppError from '../../errors/AppError';

class DeleteQuestionService {
  public async execute(question_id: string): Promise<Question> {
    const questionRepository = getRepository(Question);

    try {
      const questionExists = await questionRepository.findOne({
        where: {
          id: question_id,
        },
      });

      if (!questionExists) {
        throw new AppError({ message: 'Question not found', statusCode: 401 });
      }

      await questionRepository.delete(questionExists.id);

      return questionExists;
    } catch (error) {
      throw new AppError({ message: `${error.message}`, statusCode: 401 });
    }
  }
}

export default DeleteQuestionService;
