export type CheckHomeworkDto = {
  solution: string;
  homeworkContent: string;
};

export type CheckPracticeDto = {
  userId: string;
  lessonName: string;
  subjectName: string;
  practiceContent: string;
  solutionContent: string;
};

export type Solution = {
  id: string;
  lesson_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};
