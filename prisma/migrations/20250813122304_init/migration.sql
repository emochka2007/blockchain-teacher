-- CreateTable
CREATE TABLE "public"."Subject" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Lesson" (
    "id" UUID NOT NULL,
    "subject_id" UUID NOT NULL,
    "topic" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Practice" (
    "id" UUID NOT NULL,
    "lesson_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Practice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Homework" (
    "id" UUID NOT NULL,
    "lesson_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Homework_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" UUID NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "role" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LessonProgress" (
    "user_id" UUID NOT NULL,
    "lesson_id" UUID NOT NULL,
    "progress" VARCHAR(16) NOT NULL,

    CONSTRAINT "LessonProgress_pkey" PRIMARY KEY ("user_id","lesson_id")
);

-- CreateTable
CREATE TABLE "public"."UserHomework" (
    "user_id" UUID NOT NULL,
    "task_id" UUID NOT NULL,
    "deadline" VARCHAR(16) NOT NULL,

    CONSTRAINT "UserHomework_pkey" PRIMARY KEY ("user_id","task_id")
);

-- CreateTable
CREATE TABLE "public"."UserPractice" (
    "user_id" UUID NOT NULL,
    "task_id" UUID NOT NULL,
    "deadline" VARCHAR(16) NOT NULL,

    CONSTRAINT "UserPractice_pkey" PRIMARY KEY ("user_id","task_id")
);

-- CreateIndex
CREATE INDEX "Practice_lesson_id_idx" ON "public"."Practice"("lesson_id");

-- CreateIndex
CREATE INDEX "Homework_lesson_id_idx" ON "public"."Homework"("lesson_id");

-- CreateIndex
CREATE INDEX "LessonProgress_lesson_id_idx" ON "public"."LessonProgress"("lesson_id");

-- CreateIndex
CREATE INDEX "LessonProgress_user_id_idx" ON "public"."LessonProgress"("user_id");

-- CreateIndex
CREATE INDEX "UserHomework_user_id_idx" ON "public"."UserHomework"("user_id");

-- CreateIndex
CREATE INDEX "UserHomework_task_id_idx" ON "public"."UserHomework"("task_id");

-- CreateIndex
CREATE INDEX "UserPractice_user_id_idx" ON "public"."UserPractice"("user_id");

-- CreateIndex
CREATE INDEX "UserPractice_task_id_idx" ON "public"."UserPractice"("task_id");

-- AddForeignKey
ALTER TABLE "public"."Lesson" ADD CONSTRAINT "Lesson_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "public"."Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Practice" ADD CONSTRAINT "Practice_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Homework" ADD CONSTRAINT "Homework_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LessonProgress" ADD CONSTRAINT "LessonProgress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LessonProgress" ADD CONSTRAINT "LessonProgress_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserHomework" ADD CONSTRAINT "UserHomework_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserHomework" ADD CONSTRAINT "UserHomework_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "public"."Homework"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPractice" ADD CONSTRAINT "UserPractice_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPractice" ADD CONSTRAINT "UserPractice_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "public"."Practice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
