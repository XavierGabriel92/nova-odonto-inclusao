/*
  Warnings:

  - You are about to drop the column `codigoEmpresa` on the `MovimentacaoUser` table. All the data in the column will be lost.
  - You are about to drop the column `codigoEmpresa` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `movimento` on the `User` table. All the data in the column will be lost.
  - Made the column `cns` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `MovimentacaoUser` DROP COLUMN `codigoEmpresa`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `codigoEmpresa`,
    DROP COLUMN `movimento`,
    ADD COLUMN `codBeneficiarioDependente` VARCHAR(191) NULL,
    ADD COLUMN `codMotivo` VARCHAR(191) NULL,
    ADD COLUMN `dataAposentadoria` DATE NULL,
    ADD COLUMN `dataObito` DATE NULL,
    ADD COLUMN `nroNascido` VARCHAR(191) NULL,
    ADD COLUMN `nroObito` VARCHAR(191) NULL,
    MODIFY `cns` VARCHAR(191) NOT NULL;
