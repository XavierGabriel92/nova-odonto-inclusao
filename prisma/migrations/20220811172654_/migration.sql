-- AlterTable
ALTER TABLE `MovimentacaoUser` ADD COLUMN `baixado` BOOLEAN NULL,
    MODIFY `rg` VARCHAR(191) NULL,
    MODIFY `rgExpedicao` DATE NULL,
    MODIFY `rgEmissor` VARCHAR(191) NULL,
    MODIFY `rgUf` VARCHAR(191) NULL,
    MODIFY `parentesco` INTEGER NULL,
    MODIFY `fone` VARCHAR(191) NULL,
    MODIFY `doencasPre` VARCHAR(191) NULL,
    MODIFY `codMotivo` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `rgExpedicao` DATE NULL;

-- CreateTable
CREATE TABLE `UserDraft` (
    `companyId` INTEGER NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titular` VARCHAR(191) NOT NULL,
    `matricula` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `nascimento` DATE NOT NULL,
    `rg` VARCHAR(191) NULL,
    `rgExpedicao` DATE NULL,
    `rgEmissor` VARCHAR(191) NULL,
    `rgUf` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `sexo` VARCHAR(191) NOT NULL,
    `parentesco` INTEGER NULL,
    `dataAdimissao` DATE NULL,
    `estadoCivil` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `logradouro` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `complemento` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `fone` VARCHAR(191) NULL,
    `plano` INTEGER NOT NULL,
    `nomeMae` VARCHAR(191) NOT NULL,
    `doencasPre` VARCHAR(191) NULL,
    `dataVigencia` DATE NULL,
    `dataCancelamento` DATE NULL,
    `email` VARCHAR(191) NULL,
    `celular` VARCHAR(191) NULL,
    `nomePai` VARCHAR(191) NULL,
    `cns` VARCHAR(191) NOT NULL,
    `nomeTitular` VARCHAR(191) NOT NULL,
    `origemCarencia` INTEGER NULL,
    `cid` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `codMotivo` VARCHAR(191) NULL,
    `codBeneficiarioDependente` VARCHAR(191) NULL,
    `dataObito` DATE NULL,
    `nroObito` VARCHAR(191) NULL,
    `nroNascido` VARCHAR(191) NULL,
    `dataAposentadoria` DATE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;