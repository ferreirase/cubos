import { getRepository } from 'typeorm';
import Exam from '../../models/Exam';
import AppError from '../../errors/AppError';

class DeleteExamService {
  public async execute(exam_id: string): Promise<Exam> {
    const examRepository = getRepository(Exam);

    try {
      const examExists = await examRepository.findOne({
        where: {
          id: exam_id,
        },
      });

      if (!examExists) {
        throw new AppError({ message: 'Exam not found', statusCode: 401 });
      }

      await examRepository.delete(examExists.id);

      return examExists;
    } catch (error) {
      throw new AppError({ message: `${error.message}`, statusCode: 401 });
    }
  }
}

export default DeleteExamService;
