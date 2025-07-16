-- DropForeignKey
ALTER TABLE "Pembelian" DROP CONSTRAINT "Pembelian_id_fkey";

-- CreateTable
CREATE TABLE "_PembelianToStatus" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PembelianToStatus_AB_unique" ON "_PembelianToStatus"("A", "B");

-- CreateIndex
CREATE INDEX "_PembelianToStatus_B_index" ON "_PembelianToStatus"("B");

-- AddForeignKey
ALTER TABLE "_PembelianToStatus" ADD CONSTRAINT "_PembelianToStatus_A_fkey" FOREIGN KEY ("A") REFERENCES "Pembelian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PembelianToStatus" ADD CONSTRAINT "_PembelianToStatus_B_fkey" FOREIGN KEY ("B") REFERENCES "Status"("id") ON DELETE CASCADE ON UPDATE CASCADE;
