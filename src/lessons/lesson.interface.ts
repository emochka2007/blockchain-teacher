import { Subject } from '../subject/subject.interface';

export type JoinedLessonEntity = {
  id: string;
  topic: string;
  subject: Subject;
};

export enum LESSON_STATUS {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
