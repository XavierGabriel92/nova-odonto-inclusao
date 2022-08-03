/*
  Warnings:

  - You are about to alter the column `name` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - Added the required column `cpnj` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Company` ADD COLUMN `cpnj` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `companyId` INTEGER NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titular` VARCHAR(191) NOT NULL,
    `movimento` INTEGER NOT NULL,
    `matricula` VARCHAR(191) NOT NULL,
    `codigoEmpresa` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `nascimento` DATETIME(3) NOT NULL,
    `rg` VARCHAR(191) NOT NULL,
    `rgExpedicao` DATETIME(3) NOT NULL,
    `rgEmissor` VARCHAR(191) NOT NULL,
    `rgUf` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `sexo` VARCHAR(191) NOT NULL,
    `parentesco` INTEGER NOT NULL,
    `dataAdimissao` DATETIME(3) NULL,
    `estadoCivil` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `logradouro` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `complemento` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `fone` VARCHAR(191) NOT NULL,
    `plano` INTEGER NOT NULL,
    `nomeMae` VARCHAR(191) NOT NULL,
    `doencasPre` VARCHAR(191) NOT NULL,
    `dataVigencia` DATETIME(3) NULL,
    `dataCancelamento` DATETIME(3) NULL,
    `email` VARCHAR(191) NULL,
    `celular` VARCHAR(191) NULL,
    `nomePai` VARCHAR(191) NULL,
    `cns` VARCHAR(191) NOT NULL,
    `nomeTitular` VARCHAR(191) NOT NULL,
    `origemCarencia` INTEGER NULL,
    `cid` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovimentacaoUser` (
    `userId` INTEGER NOT NULL,
    `companyId` INTEGER NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titular` VARCHAR(191) NOT NULL,
    `movimento` INTEGER NOT NULL,
    `matricula` VARCHAR(191) NOT NULL,
    `codigoEmpresa` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `nascimento` DATETIME(3) NOT NULL,
    `rg` VARCHAR(191) NOT NULL,
    `rgExpedicao` DATETIME(3) NOT NULL,
    `rgEmissor` VARCHAR(191) NOT NULL,
    `rgUf` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `sexo` VARCHAR(191) NOT NULL,
    `parentesco` INTEGER NOT NULL,
    `dataAdimissao` DATETIME(3) NULL,
    `estadoCivil` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `logradouro` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `complemento` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `fone` VARCHAR(191) NOT NULL,
    `plano` INTEGER NOT NULL,
    `nomeMae` VARCHAR(191) NOT NULL,
    `doencasPre` VARCHAR(191) NOT NULL,
    `dataVigencia` DATETIME(3) NULL,
    `dataCancelamento` DATETIME(3) NULL,
    `email` VARCHAR(191) NULL,
    `celular` VARCHAR(191) NULL,
    `nomePai` VARCHAR(191) NULL,
    `cns` VARCHAR(191) NOT NULL,
    `nomeTitular` VARCHAR(191) NOT NULL,
    `origemCarencia` INTEGER NULL,
    `cid` VARCHAR(191) NULL,
    `codMotivo` VARCHAR(191) NOT NULL,
    `codBeneficiarioDependente` VARCHAR(191) NULL,
    `dataObito` DATETIME(3) NULL,
    `nroObito` VARCHAR(191) NULL,
    `nroNascido` VARCHAR(191) NULL,
    `dataAposentadoria` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
