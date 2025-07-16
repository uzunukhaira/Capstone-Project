/*
  Warnings:

  - You are about to drop the column `name_produk` on the `Pembelian` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pembelian" DROP COLUMN "name_produk",
ADD COLUMN     "nameproduk" TEXT;
