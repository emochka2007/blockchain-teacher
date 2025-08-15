/*
  Warnings:

  - A unique constraint covering the columns `[topic]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Lesson_topic_key" ON "public"."Lesson"("topic");
