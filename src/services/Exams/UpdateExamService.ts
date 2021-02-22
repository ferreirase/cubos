import { getRepository } from 'typeorm';
import Exam from '../../models/Exam';
import AppError from '../../errors/AppError';
import ExamInterface from '../../interfaces/exam';

interface ExamReturn {
  id: string;
  name: string;
  description: string;
  type: string;
}

class UpateExamService {
  public async execute(
    { name, type, description }: ExamInterface,
    exam_id: string,
  ): Promise<ExamReturn> {
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

      examExists.name = name;
      examExists.description = description;
      examExists.type = type;

      await examRepository.save(examExists);

      return {
        id: examExists.id,
        name: examExists.name,
        description: examExists.description,
        type: examExists.type,
      };
    } catch (error) {
      throw new AppError({ message: `${error.message}`, statusCode: 401 });
    }
  }
}

export default UpateExamService;
