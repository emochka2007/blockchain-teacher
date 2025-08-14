/*
  Warnings:

  - Added the required column `solution` to the `UserHomework` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solution` to the `UserPractice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."UserHomework" ADD COLUMN     "solution" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."UserPractice" ADD COLUMN     "solution" TEXT NOT NULL;
