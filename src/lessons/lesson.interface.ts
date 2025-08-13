import { Subject } from '../subject/subject.interface';

export type JoinedLessonEntity = {
  id: string;
  topic: string;
  created_at: Date;
  updated_at: Date;
  subject: Subject;
};
