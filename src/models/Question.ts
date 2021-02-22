/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import Exam from './Exam';
import Option from './Option';

@Entity('questions')
class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  exam_id: string;

  @Column()
  statement: string;

  @ManyToOne(() => Exam, exam => exam.questions)
  @JoinColumn({ name: 'exam_id' })
  exam: Exam;

  @OneToMany(() => Option, option => option.question)
  options: Option[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Question;
