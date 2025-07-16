/*
  Warnings:

  - You are about to drop the column `status_pengiriman` on the `Pengiriman` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pengiriman" DROP COLUMN "status_pengiriman";

-- CreateTable
CREATE TABLE "_PengirimanToStatus" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PengirimanToStatus_AB_unique" ON "_PengirimanToStatus"("A", "B");

-- CreateIndex
CREATE INDEX "_PengirimanToStatus_B_index" ON "_PengirimanToStatus"("B");

-- AddForeignKey
ALTER TABLE "_PengirimanToStatus" ADD CONSTRAINT "_PengirimanToStatus_A_fkey" FOREIGN KEY ("A") REFERENCES "Pengiriman"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PengirimanToStatus" ADD CONSTRAINT "_PengirimanToStatus_B_fkey" FOREIGN KEY ("B") REFERENCES "Status"("id") ON DELETE CASCADE ON UPDATE CASCADE;
