/*
  Warnings:

  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `role`,
    ADD COLUMN `bussinessAddress` VARCHAR(191) NULL,
    ADD COLUMN `bussinessName` VARCHAR(191) NULL,
    ADD COLUMN `bussinessRegistrationNumber` VARCHAR(191) NULL,
    ADD COLUMN `bussinessType` ENUM('INDIVIDUAL', 'COMPANY') NULL,
    ADD COLUMN `isSeller` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `isVerified` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `phoneNumber` INTEGER NULL,
    ADD COLUMN `terms` BOOLEAN NULL DEFAULT false;

-- CreateTable
CREATE TABLE `BussinessCategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BussinessCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_bussinessCategory` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_bussinessCategory_AB_unique`(`A`, `B`),
    INDEX `_bussinessCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_bussinessCategory` ADD CONSTRAINT `_bussinessCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `BussinessCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_bussinessCategory` ADD CONSTRAINT `_bussinessCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
