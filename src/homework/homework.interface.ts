export type JoinedHomeworkEntity = {
  homeworkName: string;
  lessonName: string;
  subjectName: string;
  solution: string;
};

export type Solution = {
  id: string;
  lesson_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};
