import * as Yup from 'yup';
import { Router, Request, Response } from 'express';
import { startOfDay, parseISO, format } from 'date-fns';
import AppError from '../errors/AppError';
import CreateRuleService from '../services/CreateRuleByDayService';
import ReadFile from '../functions/readFile';

interface Interval {
  start: string;
  end: string;
}

interface RuleResponseInterface {
  intervals: [Interval];
  date: string;
  type: string;
}

const filesRoutes = Router();

filesRoutes.get('/', async (_, res: Response) => {
  const { rules } = await ReadFile();

  if (rules === undefined) {
    return res.status(200).json({
      message: 'None rule registered',
    });
  }

  const rulesFormatted = rules.map((rule: RuleResponseInterface) => ({
    type: rule.type,
    date: format(new Date(rule.date), 'dd-MM-yyyy'),
    intervals: rule.intervals,
  }));

  return res.json(rulesFormatted);
});

filesRoutes.post('/byday', async (req: Request, res: Response) => {
  const createRule = new CreateRuleService();

  const schema = Yup.object().shape({
    intervals: Yup.array().required('Intervals is required'),
    date: Yup.date().required('Date field is required'),
  });

  await schema.isValid(req.body).then((valid) => {
    if (!valid) {
      throw new AppError({ message: 'Check fields submited', statusCode: 404 });
    }
  });

  const result = await createRule.execute({
    date: req.body.date,
    intervals: req.body.intervals,
  });

  return res.status(200).json(result);
});

export default filesRoutes;
