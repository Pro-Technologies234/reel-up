/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "avatarUrl",
DROP COLUMN "isVerified",
ADD COLUMN     "idsVerified" BOOLEAN DEFAULT false;
