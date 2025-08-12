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
  practices: { name: string }[];
  homework: { name: string }[];
}) {
  const lesson = await prisma.lessons.create({
    data: {
      subject_id: args.subjectId,
      topic: args.topic,
    },
  });

  for (const { name } of args.practices) {
    await prisma.practices.create({
      data: {
        name,
        lesson_id: lesson.id,
      },
    });
  }

  for (const { name } of args.homework) {
    await prisma.homeworks.create({
      data: {
        name,
        lesson_id: lesson.id,
      },
    });
  }

  return lesson;
}

async function main() {
  // ---------- Optional: clean start for idempotent seeding ----------
  await prisma.$transaction([
    prisma.lesson_progress.deleteMany(),
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
    data: { name: 'Precalculus month' },
  });

  // ---------- Lessons (+ lesson_pages, practices, homeworks) ----------
  await createLessonWithChildren({
    subjectId: subjectMath.id,
    topic: 'Numbers and algebra',
    practices: [
      {
        name: 'practice_1.adoc',
      },
    ],
    homework: [
      {
        name: 'homework_1.adoc',
      },
    ],
  });

  // ---------- Lesson progress (sample rows) ----------
  await prisma.lesson_progress.createMany({
    data: [],
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
