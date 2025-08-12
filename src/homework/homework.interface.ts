import { JoinedLessonEntity } from '../lessons/lesson.interface';

export type JoinedHomeworkEntity = {
  id: string;
  lesson_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  lesson: JoinedLessonEntity;
};

export type Solution = {
  id: string;
  lesson_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};
