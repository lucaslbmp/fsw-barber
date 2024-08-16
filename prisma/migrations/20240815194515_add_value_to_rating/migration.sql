/*
  Warnings:

  - Added the required column `value` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "value" DECIMAL(10,1) NOT NULL;
