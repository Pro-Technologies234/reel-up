-- CreateTable
CREATE TABLE `SearchHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `keyword` VARCHAR(191) NOT NULL,
    `searchedById` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SearchHistory` ADD CONSTRAINT `SearchHistory_searchedById_fkey` FOREIGN KEY (`searchedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
