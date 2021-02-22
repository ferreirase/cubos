import Option from './option';

export default interface Question {
  id?: string;
  statement: string;
  options?: Option[];
}
