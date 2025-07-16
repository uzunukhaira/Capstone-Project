-- DropForeignKey
ALTER TABLE "Pembelian" DROP CONSTRAINT "Pembelian_id_produk_fkey";

-- DropForeignKey
ALTER TABLE "Pengiriman" DROP CONSTRAINT "Pengiriman_id_produk_fkey";

-- AlterTable
ALTER TABLE "Pembelian" ADD COLUMN     "nama_produk" TEXT,
ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Pengiriman" ADD COLUMN     "name_produk" TEXT;
