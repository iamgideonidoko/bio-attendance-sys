/*
  Warnings:

  - You are about to drop the column `Date` on the `Attendance` table. All the data in the column will be lost.
  - Added the required column `date` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Attendance` DROP COLUMN `Date`,
    ADD COLUMN `date` VARCHAR(191) NOT NULL;
