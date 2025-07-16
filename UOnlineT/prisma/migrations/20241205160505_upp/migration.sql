/*
  Warnings:

  - You are about to drop the column `nama_produk` on the `Pembelian` table. All the data in the column will be lost.
  - You are about to drop the column `name_produk` on the `Pengiriman` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pembelian" DROP COLUMN "nama_produk",
ADD COLUMN     "name_produk" TEXT;

-- AlterTable
ALTER TABLE "Pengiriman" DROP COLUMN "name_produk",
ADD COLUMN     "produk" TEXT;
