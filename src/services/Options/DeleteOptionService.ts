import { getRepository } from 'typeorm';
import Option from '../../models/Option';
import AppError from '../../errors/AppError';

class DeleteOptionService {
  public async execute(option_id: string): Promise<Option> {
    const optionRepository = getRepository(Option);

    try {
      const optionExists = await optionRepository.findOne({
        where: {
          id: option_id,
        },
      });

      if (!optionExists) {
        throw new AppError({ message: 'Option not found', statusCode: 401 });
      }

      await optionRepository.delete(optionExists.id);

      return optionExists;
    } catch (error) {
      throw new AppError({ message: `${error.message}`, statusCode: 401 });
    }
  }
}

export default DeleteOptionService;
