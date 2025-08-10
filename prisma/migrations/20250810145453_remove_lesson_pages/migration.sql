/*
  Warnings:

  - You are about to drop the `lesson_pages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."lesson_pages" DROP CONSTRAINT "lesson_pages_lesson_id_fkey";

-- DropTable
DROP TABLE "public"."lesson_pages";
