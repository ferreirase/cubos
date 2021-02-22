import { Brackets, getRepository } from 'typeorm';
import Question from '../../models/Question';
import Option from '../../models/Option';
import AppError from '../../errors/AppError';
import OptionInterface from '../../interfaces/option';

interface OptionInterfaceWithQuestionID extends OptionInterface {
  question_id: string;
}

class CreateOptionService {
  public async execute({
    key,
    value,
    correct,
    question_id,
  }: OptionInterfaceWithQuestionID): Promise<Option> {
    const questionRepository = getRepository(Question);
    const optionRepository = getRepository(Option);

    try {
      const questionExists = await questionRepository.findOne({
        where: {
          id: question_id,
        },
      });

      const optionExists = await optionRepository
        .createQueryBuilder('option')
        .where('option.key = :key', { key })
        .andWhere(
          new Brackets(qb => {
            qb.where('option.value = :value', { value });
          }),
        )
        .getOne();

      if (!questionExists) {
        throw new AppError({ message: 'Question not found', statusCode: 400 });
      }

      if (optionExists) {
        throw new AppError({
          message: 'Option already exists with these fields',
          statusCode: 400,
        });
      }

      const newOption = optionRepository.create({
        key,
        value,
        correct,
        question_id,
      });

      await optionRepository.save(newOption);

      return newOption;
    } catch (error) {
      throw new AppError({ message: `${error.message}`, statusCode: 401 });
    }
  }
}

export default CreateOptionService;
