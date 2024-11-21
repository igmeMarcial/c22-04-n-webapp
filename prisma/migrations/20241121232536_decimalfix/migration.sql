/*
  Warnings:

  - You are about to alter the column `age` on the `pets` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to alter the column `weight` on the `pets` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.

*/
-- AlterTable
ALTER TABLE `pets` MODIFY `age` INTEGER NOT NULL,
    MODIFY `weight` INTEGER NOT NULL;
