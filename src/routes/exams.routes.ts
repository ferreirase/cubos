/* eslint-disable array-callback-return */
import { Router, Request, Response } from 'express';
import * as Yup from 'yup';
import { getCustomRepository } from 'typeorm';
import CreateExamService from '../services/Exams/CreateExamService';
import UpdateExamService from '../services/Exams/UpdateExamService';
import DeleteExamService from '../services/Exams/DeleteExamService';
import AppError from '../errors/AppError';
import ExamRepository from '../repositories/ExamRepository';

const examRoutes = Router();

examRoutes.get('/', async (_: Request, res: Response) => {
  const examRepository = getCustomRepository(ExamRepository);

  const exams = await examRepository.findAllWithRelations();

  return res.status(200).json(exams);
});

examRoutes.post('/', async (req: Request, res: Response) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('Name field is required'),
    description: Yup.string().required('Description field is required'),
    type: Yup.string().required('Type field is required'),
  });

  await schema.isValid(req.body).then((valid) => {
    if (!valid) {
      throw new AppError({ message: 'Check fields submited', statusCode: 404 });
    }
  });

  const createExam = new CreateExamService();

  const newExam = await createExam.execute({
    name: req.body?.name,
    description: req.body?.description,
    type: req.body?.type,
    questions: [],
  });

  return res.status(200).json(newExam);
});

examRoutes.put('/', async (req: Request, res: Response) => {
  const updateExam = new UpdateExamService();

  const schema = Yup.object().shape({
    exam_id: Yup.string().required('Exam ID is required'),
    name: Yup.string().required('Name field is required'),
    description: Yup.string().required('Description field is required'),
    type: Yup.string().required('Type field is required'),
  });

  await schema.isValid(req.body).then((valid) => {
    if (!valid) {
      throw new AppError({ message: 'Check fields submited', statusCode: 404 });
    }
  });

  const updatedExam = await updateExam.execute(
    {
      name: req.body?.name,
      description: req.body?.description,
      type: req.body?.type,
      questions: [],
    },
    req.body?.exam_id,
  );

  return res.status(200).json(updatedExam);
});

examRoutes.delete('/', async (req: Request, res: Response) => {
  const deleteExam = new DeleteExamService();

  const schema = Yup.object().shape({
    exam_id: Yup.string().required('Exam ID is required'),
  });

  await schema.isValid(req.body).then((valid) => {
    if (!valid) {
      throw new AppError({ message: 'Check fields submited', statusCode: 404 });
    }
  });

  const examDeleted = await deleteExam.execute(req.body?.exam_id);

  return res.status(200).json(examDeleted);
});

export default examRoutes;
