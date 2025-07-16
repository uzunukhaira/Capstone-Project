/*
  Warnings:

  - You are about to drop the column `user` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `produk` on the `Pengiriman` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Log" DROP COLUMN "user",
ADD COLUMN     "statusid" INTEGER,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pengiriman" DROP COLUMN "produk";

-- CreateTable
CREATE TABLE "_SupplierProduk" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SupplierProduk_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SupplierProduk_B_index" ON "_SupplierProduk"("B");

-- AddForeignKey
ALTER TABLE "Pembelian" ADD CONSTRAINT "Pembelian_id_produk_fkey" FOREIGN KEY ("id_produk") REFERENCES "Produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengiriman" ADD CONSTRAINT "Pengiriman_id_produk_fkey" FOREIGN KEY ("id_produk") REFERENCES "Produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_statusid_fkey" FOREIGN KEY ("statusid") REFERENCES "Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SupplierProduk" ADD CONSTRAINT "_SupplierProduk_A_fkey" FOREIGN KEY ("A") REFERENCES "Produk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SupplierProduk" ADD CONSTRAINT "_SupplierProduk_B_fkey" FOREIGN KEY ("B") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
