import { getRepository } from 'typeorm';
import Question from '../../models/Question';
import AppError from '../../errors/AppError';
import OptionInterface from '../../interfaces/option';
import Option from '../../models/Option';

class UpdateOptionService {
  public async execute(
    question_id: string,
    option_id: string,
    { key, value, correct }: OptionInterface,
  ): Promise<Option> {
    const optionRepository = getRepository(Option);
    const questionRepository = getRepository(Question);

    try {
      const optionExists = await optionRepository.findOne({
        where: {
          id: option_id,
        },
      });

      if (
        !(await questionRepository.findOne({
          where: {
            id: question_id,
          },
        }))
      ) {
        throw new AppError({ message: 'Question not found', statusCode: 401 });
      }

      if (!optionExists) {
        throw new AppError({ message: 'Option not found', statusCode: 401 });
      }

      optionExists.key = key;
      optionExists.value = value;
      optionExists.correct = correct;
      optionExists.question_id = question_id;

      await optionRepository.save(optionExists);

      return optionExists;
    } catch (error) {
      throw new AppError({ message: `${error.message}`, statusCode: 401 });
    }
  }
}

export default UpdateOptionService;
