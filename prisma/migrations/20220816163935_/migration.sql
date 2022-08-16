/*
  Warnings:

  - Added the required column `movimento` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MovimentacaoUser` MODIFY `movimento` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `movimento` INTEGER NOT NULL;
