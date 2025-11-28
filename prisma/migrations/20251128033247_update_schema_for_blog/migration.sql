/*
  Warnings:

  - You are about to drop the column `learning` on the `DailyReport` table. All the data in the column will be lost.
  - Added the required column `title` to the `DailyReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DailyReport" DROP COLUMN "learning",
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "yomoyama" TEXT;
