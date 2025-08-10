import { PrismaClient } from '../../generated/prisma';
const prisma = new PrismaClient();

/**
 * Helper to create a lesson with concrete child entities:
 * - 1..N lesson_pages
 * - 1..N practices
 * - optional homeworks
 */
async function createLessonWithChildren(args: {
  subjectId: string;
  topic: string;
  pages: string[]; // each entry -> one lesson_pages row (content)
  practices: { name: string; content: string }[];
  homework?: { name: string; content: string } | null;
}) {
  const lesson = await prisma.lessons.create({
    data: {
      subject_id: args.subjectId,
      topic: args.topic,
    },
  });

  // lesson_pages
  for (const pageContent of args.pages) {
    await prisma.lesson_pages.create({
      data: {
        lesson_id: lesson.id,
        content: pageContent,
      },
    });
  }

  // practices
  for (const p of args.practices) {
    await prisma.practices.create({
      data: {
        lesson_id: lesson.id,
        name: p.name,
        content: p.content,
      },
    });
  }

  // optional homework
  if (args.homework) {
    await prisma.homeworks.create({
      data: {
        lesson_id: lesson.id,
        name: args.homework.name,
        content: args.homework.content,
      },
    });
  }

  return lesson;
}

async function main() {
  // ---------- Optional: clean start for idempotent seeding ----------
  await prisma.$transaction([
    prisma.lesson_progress.deleteMany(),
    prisma.lesson_pages.deleteMany(),
    prisma.practices.deleteMany(),
    prisma.homeworks.deleteMany(),
    prisma.lessons.deleteMany(),
    prisma.users.deleteMany(),
    prisma.subjects.deleteMany(),
  ]);

  // ---------- Users ----------
  const [alice, bob] = await prisma.$transaction([
    prisma.users.create({ data: { username: 'alice', role: 'student' } }),
    prisma.users.create({ data: { username: 'bob', role: 'student' } }),
  ]);

  // ---------- Subjects ----------
  const subjectMath = await prisma.subjects.create({
    data: { name: 'Mathematics (RU) — База' },
  });

  const subjectAlgebra = await prisma.subjects.create({
    data: { name: 'Algebra Prep (RU) — Подготовка' },
  });

  // ---------- Lessons (+ lesson_pages, practices, homeworks) ----------
  const mathL1 = await createLessonWithChildren({
    subjectId: subjectMath.id,
    topic: 'Арифметика и отрицательные числа',
    pages: [
      'Целые числа: определение, сравнение, числовая прямая.',
      'Операции: сложение, вычитание, модуль числа. Примеры и типичные ошибки.',
    ],
    practices: [
      { name: 'Практика 1.1', content: 'Вычислить: -5+8; 7-(-3); |-12|.' },
      {
        name: 'Практика 1.2',
        content: 'Найти: (-4)+(-9); 15-22; упорядочить -7, -3, 0, 2.',
      },
    ],
    homework: {
      name: 'Домашняя работа 1',
      content:
        '10 примеров на сложение/вычитание отрицательных чисел; 5 задач на модуль.',
    },
  });

  const mathL2 = await createLessonWithChildren({
    subjectId: subjectMath.id,
    topic: 'Дроби и проценты',
    pages: [
      'Дроби: сокращение, приведение к общему знаменателю.',
      'Проценты: определение, пропорции, задачи на долю и процент.',
    ],
    practices: [
      { name: 'Практика 2.1', content: '3/4 + 5/6; 7/8 - 2/3; 5/12 + 1/3.' },
      {
        name: 'Практика 2.2',
        content: 'Найти 15% от 240; 7% от 900; перевести 0.375 в дробь.',
      },
    ],
    homework: {
      name: 'Домашняя работа 2',
      content: '8 примеров на дроби и 5 задач на проценты.',
    },
  });

  const mathL3 = await createLessonWithChildren({
    subjectId: subjectMath.id,
    topic: 'Повторение и мини-тест',
    pages: [
      'Сводный конспект по темам недели: арифметика, дроби, проценты.',
      'Разбор типичных ошибок и стратегии проверки решения.',
    ],
    practices: [
      {
        name: 'Практика 3.1',
        content: 'Смешанный набор из 10 заданий по всем темам.',
      },
    ],
    homework: {
      name: 'Мини-тест',
      content: 'Письменная работа из 10 заданий, время 25 минут.',
    },
  });

  const algL1 = await createLessonWithChildren({
    subjectId: subjectAlgebra.id,
    topic: 'Линейные уравнения',
    pages: [
      'Понятие уравнения, равносильные преобразования.',
      'Метод переноса и проверка решения.',
    ],
    practices: [
      { name: 'Практика A1.1', content: 'Решить: 2x+3=11; 5-3y=14.' },
      { name: 'Практика A1.2', content: 'Решить: 7z-4=2z+11; 3t+6=2t-1.' },
    ],
    homework: {
      name: 'Домашняя работа A1',
      content: '6 задач на линейные уравнения (разной сложности).',
    },
  });

  const algL2 = await createLessonWithChildren({
    subjectId: subjectAlgebra.id,
    topic: 'Системы линейных уравнений',
    pages: [
      'Метод подстановки: алгоритм и примеры.',
      'Метод сложения: алгоритм и примеры. Проверка решений.',
    ],
    practices: [
      { name: 'Практика A2.1', content: 'x+y=10, x−y=2; 2x+3y=7, 4x−y=5.' },
      {
        name: 'Практика A2.2',
        content: 'Построить систему и решить по графику (2 задачи).',
      },
    ],
    homework: {
      name: 'Домашняя работа A2',
      content: '8 задач на методы подстановки и сложения.',
    },
  });

  // ---------- Lesson progress (sample rows) ----------
  await prisma.lesson_progress.createMany({
    data: [
      { user_id: alice.id, lesson_id: mathL1.id, progress: 'done' },
      { user_id: alice.id, lesson_id: mathL2.id, progress: 'in_progress' },
      { user_id: alice.id, lesson_id: mathL3.id, progress: 'not_started' },
      { user_id: alice.id, lesson_id: algL1.id, progress: 'done' },

      { user_id: bob.id, lesson_id: mathL1.id, progress: 'in_progress' },
      { user_id: bob.id, lesson_id: mathL2.id, progress: 'not_started' },
      { user_id: bob.id, lesson_id: algL1.id, progress: 'done' },
      { user_id: bob.id, lesson_id: algL2.id, progress: 'not_started' },
    ],
  });

  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
