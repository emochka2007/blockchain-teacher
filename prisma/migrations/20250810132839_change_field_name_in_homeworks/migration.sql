/*
  Warnings:

  - You are about to drop the column `homework_name` on the `homeworks` table. All the data in the column will be lost.
  - Added the required column `name` to the `homeworks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."homeworks" DROP COLUMN "homework_name",
ADD COLUMN     "name" TEXT NOT NULL;
