import { Subject } from '../subject/subject.interface';

export type JoinedLessonEntity = {
  id: string;
  topic: string;
  subject: Subject;
};
