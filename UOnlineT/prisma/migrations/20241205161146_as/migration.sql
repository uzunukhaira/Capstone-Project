/*
  Warnings:

  - Made the column `name_produk` on table `Pembelian` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pembelian" ALTER COLUMN "name_produk" SET NOT NULL;
