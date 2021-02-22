/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import fs from 'fs';
import path from 'path';
import AppError from '../errors/AppError';

const filePath = path.join(__dirname, '../database', 'database.json');

const WriteOnFileFunction = async (content: any) => {
  try {
    const contentString = JSON.stringify(content);
    return fs.writeFileSync(filePath, contentString);
  } catch (error) {
    throw new AppError({ message: `${error.message}`, statusCode: 400 });
  }
};

export default WriteOnFileFunction;
