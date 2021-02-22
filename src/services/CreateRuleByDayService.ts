import { startOfDay, parseISO, format } from 'date-fns';
import ReadFile from '../functions/readFile';
import WriteOnFile from '../functions/writeOnFile';
import AppError from '../errors/AppError';

interface Interval {
  start: string;
  end: string;
}

interface RuleInterface {
  intervals: [Interval];
  date: string;
}

class CreateRuleByDayService {
  public async execute({
    intervals,
    date,
  }: RuleInterface): Promise<any> {
    try {
      const { rules } = await ReadFile();
      const newRule = {
        type: 'BYDAY',
        date: startOfDay(parseISO(`${date}`)),
        intervals,
      };

      if (!rules || rules.length === 0) {
        await WriteOnFile({
          rules: [
            newRule,
          ],
        });

        return newRule;
      }

      const ruleExists = rules
        .filter(
          (rule: RuleInterface) => format(new Date(rule.date), 'dd-MM-yyyy')
            === format(newRule.date, 'dd-MM-yyyy'),
        );

      if (ruleExists && ruleExists.length > 0) {
        const result = ruleExists.map((rule: RuleInterface) => rule.intervals);

        console.log(newRule.intervals, result);

        throw new AppError({ message: 'Rule already exists', statusCode: 400 });
      }

      await WriteOnFile({
        rules: [
          ...rules,
          newRule,
        ],
      });

      return newRule;
    } catch (error) {
      throw new AppError({ message: `${error.message}`, statusCode: 400 });
    }
  }
}

export default CreateRuleByDayService;
