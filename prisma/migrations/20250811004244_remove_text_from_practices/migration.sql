/*
  Warnings:

  - You are about to drop the column `content` on the `homeworks` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `practices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."homeworks" DROP COLUMN "content";

-- AlterTable
ALTER TABLE "public"."practices" DROP COLUMN "content";
