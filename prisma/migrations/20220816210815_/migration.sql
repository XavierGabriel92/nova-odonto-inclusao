/*
  Warnings:

  - You are about to drop the `MovimentacaoUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `UserDraft` MODIFY `nascimento` VARCHAR(191) NOT NULL,
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
    MODIFY `updatedAt` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `MovimentacaoUser`;
