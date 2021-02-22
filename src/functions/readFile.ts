/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import fs from 'fs';
import path from 'path';
import AppError from '../errors/AppError';

const filePath = path.join(__dirname, '../database', 'database.json');

const ReadFileFunction = async () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');

    return JSON.parse(data);
  } catch (error) {
    throw new AppError({ message: `${error.message}`, statusCode: 400 });
  }
};

export default ReadFileFunction;
