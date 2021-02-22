import Question from './question';

export type ExamType = 'ONLINE' | 'OFFLINE';

export default interface Exam {
  name: string;
  description: string;
  type: ExamType;
  questions?: Question[];
}
