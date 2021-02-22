/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Question from './Question';

@Entity('options')
class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question_id: string;

  @Column()
  key: string;

  @Column()
  value: string;

  @Column()
  correct: boolean;

  @ManyToOne(() => Question, question => question.options)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Option;
