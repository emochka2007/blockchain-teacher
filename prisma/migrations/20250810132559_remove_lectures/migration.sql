/*
  Warnings:

  - You are about to drop the column `lecture_id` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `lesson_name` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `task_name` on the `practices` table. All the data in the column will be lost.
  - You are about to drop the `lectures` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subject_id` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `practices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."lectures" DROP CONSTRAINT "lectures_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."lessons" DROP CONSTRAINT "lessons_lecture_id_fkey";

-- DropIndex
DROP INDEX "public"."lessons_lecture_id_idx";

-- AlterTable
ALTER TABLE "public"."lessons" DROP COLUMN "lecture_id",
DROP COLUMN "lesson_name",
ADD COLUMN     "subject_id" UUID NOT NULL,
ADD COLUMN     "topic" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."practices" DROP COLUMN "task_name",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."lectures";

-- AddForeignKey
ALTER TABLE "public"."lessons" ADD CONSTRAINT "lessons_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
