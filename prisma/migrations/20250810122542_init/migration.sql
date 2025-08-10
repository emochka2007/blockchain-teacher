/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."subjects" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."lectures" (
    "id" UUID NOT NULL,
    "topic" TEXT NOT NULL,
    "subject_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lectures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."lessons" (
    "id" UUID NOT NULL,
    "lecture_id" UUID NOT NULL,
    "lesson_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."lesson_pages" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "lesson_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lesson_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."practices" (
    "id" UUID NOT NULL,
    "lesson_id" UUID NOT NULL,
    "task_name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "practices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."homeworks" (
    "id" UUID NOT NULL,
    "lesson_id" UUID NOT NULL,
    "homework_name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "homeworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "role" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."lesson_progress" (
    "user_id" UUID NOT NULL,
    "lesson_id" UUID NOT NULL,
    "progress" VARCHAR(16) NOT NULL,

    CONSTRAINT "lesson_progress_pkey" PRIMARY KEY ("user_id","lesson_id")
);

-- CreateIndex
CREATE INDEX "lectures_subject_id_idx" ON "public"."lectures"("subject_id");

-- CreateIndex
CREATE INDEX "lessons_lecture_id_idx" ON "public"."lessons"("lecture_id");

-- CreateIndex
CREATE INDEX "lesson_pages_lesson_id_idx" ON "public"."lesson_pages"("lesson_id");

-- CreateIndex
CREATE INDEX "practices_lesson_id_idx" ON "public"."practices"("lesson_id");

-- CreateIndex
CREATE INDEX "homeworks_lesson_id_idx" ON "public"."homeworks"("lesson_id");

-- CreateIndex
CREATE INDEX "lesson_progress_lesson_id_idx" ON "public"."lesson_progress"("lesson_id");

-- CreateIndex
CREATE INDEX "lesson_progress_user_id_idx" ON "public"."lesson_progress"("user_id");

-- AddForeignKey
ALTER TABLE "public"."lectures" ADD CONSTRAINT "lectures_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lessons" ADD CONSTRAINT "lessons_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "public"."lectures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson_pages" ADD CONSTRAINT "lesson_pages_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."practices" ADD CONSTRAINT "practices_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."homeworks" ADD CONSTRAINT "homeworks_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson_progress" ADD CONSTRAINT "lesson_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson_progress" ADD CONSTRAINT "lesson_progress_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
