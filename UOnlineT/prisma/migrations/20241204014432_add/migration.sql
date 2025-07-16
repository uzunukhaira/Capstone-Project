/*
  Warnings:

  - You are about to drop the `_PengirimanToStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PengirimanToStatus" DROP CONSTRAINT "_PengirimanToStatus_A_fkey";

-- DropForeignKey
ALTER TABLE "_PengirimanToStatus" DROP CONSTRAINT "_PengirimanToStatus_B_fkey";

-- DropTable
DROP TABLE "_PengirimanToStatus";

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_id_fkey" FOREIGN KEY ("id") REFERENCES "Pengiriman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
