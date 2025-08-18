/*
  Warnings:

  - You are about to drop the column `name` on the `Homework` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Practice` table. All the data in the column will be lost.
  - Added the required column `path` to the `Homework` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Practice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Homework" DROP COLUMN "name",
ADD COLUMN     "path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Practice" DROP COLUMN "name",
ADD COLUMN     "path" TEXT NOT NULL;
