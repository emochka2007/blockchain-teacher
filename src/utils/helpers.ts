import * as fs from 'node:fs';
import { BadRequestException } from '@nestjs/common';

export const readSolutionFromFile = async (
  userId: string,
  homeworkId: string,
) => {
  const path = `./public/docs/solutions/${userId}/${homeworkId}.adoc`;
  if (await checkFileExists(path)) {
    return fs.promises.readFile(path, 'utf-8');
  }
  throw new BadRequestException(`Path ${path} does not exist`);
};
export const ensureUserDir = async (dirPath: string) => {
  try {
    await fs.promises.access(dirPath, fs.constants.F_OK);
  } catch {
    await fs.promises.mkdir(dirPath, { recursive: true });
  }
};

export const createSolutionFile = async (
  userId: string,
  homeworkId: string,
) => {
  const dirPath = `./public/docs/solutions/${userId}`;
  await ensureUserDir(dirPath);
  const path = `./public/docs/solutions/${userId}/${homeworkId}.adoc`;
  await fs.promises.writeFile(path, '## Add your solution below', 'utf-8');
};

export const createStartPracticeFile = async (
  userId: string,
  lessonName: string,
) => {
  const dirPath = `./public/docs/practices/${userId}`;
  await ensureUserDir(dirPath);
  const path = `./public/docs/practices/${userId}/${lessonName}.adoc`;
  await fs.promises.writeFile(path, '## Add your solution below', 'utf-8');
};

export const createReviewPracticeFile = async (
  userId: string,
  data: string,
  lessonName: string,
) => {
  const dirPath = `./public/docs/practices/${userId}`;
  await ensureUserDir(dirPath);
  const path = `./public/docs/practices/${userId}/review-${lessonName}.adoc`;
  await fs.promises.writeFile(path, data, 'utf-8');
  return path;
};

//todo refactor this funcs and do general match thing
export const createReviewHomeworkFile = async (
  userId: string,
  data: string,
  lessonName: string,
) => {
  const dirPath = `./public/docs/solutions/${userId}`;
  await ensureUserDir(dirPath);
  const path = `./public/docs/solutions/${userId}/review-${lessonName}.adoc`;
  await fs.promises.writeFile(path, data, 'utf-8');
  return path;
};

export const createLessonFiles = async (
  type: 'lesson' | 'practice' | 'homework',
  topic: string,
  data: string,
  subject: string,
) => {
  const dirPath = `./public/docs/${subject}/${topic}`;
  await ensureUserDir(dirPath);
  let path = `${dirPath}/${type}.adoc`;
  if (type != 'lesson') {
    // add prefix
    path = `${dirPath}/${topic}_${type}.adoc`;
  }
  await fs.promises.writeFile(path, data, 'utf-8');
  return path;
};

export const checkFileExists = async (path: string) => {
  try {
    // 4 is readable
    await fs.promises.access(path, 4);
    return true;
  } catch {
    return false;
  }
};

export const readFileContentAsync = async (path: string) => {
  return await fs.promises.readFile(`${path}`, 'utf-8');
};
