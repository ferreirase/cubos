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

class CreateExamService {
  public async execute({
    name,
    type,
    description,
  }: ExamInterface): Promise<ExamReturn> {
    const examRepository = getRepository(Exam);

    try {
      const examExists = await examRepository.findOne({
        where: {
          name,
        },
      });

      if (examExists) {
        throw new AppError({ message: 'Exam already exists', statusCode: 401 });
      }

      const newExam = examRepository.create({
        name,
        type,
        description,
      });

      await examRepository.save(newExam);

      return {
        id: newExam.id,
        name: newExam.name,
        description: newExam.description,
        type: newExam.type,
      };
    } catch (error) {
      throw new AppError({ message: `${error.message}`, statusCode: 401 });
    }
  }
}

export default CreateExamService;
