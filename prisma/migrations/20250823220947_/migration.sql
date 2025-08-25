/*
  Warnings:

  - You are about to drop the `searchhistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `searchhistory` DROP FOREIGN KEY `SearchHistory_searchedById_fkey`;

-- DropTable
DROP TABLE `searchhistory`;
