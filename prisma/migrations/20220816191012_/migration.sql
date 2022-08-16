/*
  Warnings:

  - You are about to alter the column `baixado` on the `MovimentacaoUser` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `MovimentacaoUser` MODIFY `movimento` VARCHAR(191) NOT NULL DEFAULT '1',
    MODIFY `nascimento` VARCHAR(191) NOT NULL,
    MODIFY `rgExpedicao` VARCHAR(191) NULL,
    MODIFY `parentesco` VARCHAR(191) NULL,
    MODIFY `dataAdimissao` VARCHAR(191) NULL,
    MODIFY `plano` VARCHAR(191) NOT NULL,
    MODIFY `dataVigencia` VARCHAR(191) NULL,
    MODIFY `dataCancelamento` VARCHAR(191) NULL,
    MODIFY `origemCarencia` VARCHAR(191) NULL,
    MODIFY `dataObito` VARCHAR(191) NULL,
    MODIFY `dataAposentadoria` VARCHAR(191) NULL,
    MODIFY `createdAt` VARCHAR(191) NOT NULL,
    MODIFY `baixado` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `nascimento` VARCHAR(191) NOT NULL,
    MODIFY `rgExpedicao` VARCHAR(191) NULL,
    MODIFY `parentesco` VARCHAR(191) NULL,
    MODIFY `dataAdimissao` VARCHAR(191) NULL,
    MODIFY `plano` VARCHAR(191) NOT NULL,
    MODIFY `dataVigencia` VARCHAR(191) NULL,
    MODIFY `dataCancelamento` VARCHAR(191) NULL,
    MODIFY `origemCarencia` VARCHAR(191) NULL,
    MODIFY `createdAt` VARCHAR(191) NOT NULL,
    MODIFY `updatedAt` VARCHAR(191) NOT NULL,
    MODIFY `dataAposentadoria` VARCHAR(191) NULL,
    MODIFY `dataObito` VARCHAR(191) NULL,
    MODIFY `movimento` VARCHAR(191) NOT NULL;
