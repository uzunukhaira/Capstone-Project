/*
  Warnings:

  - You are about to drop the `_PembelianToStatus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Pembelian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_pengiriman` to the `Pengiriman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_p` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Status" DROP CONSTRAINT "Status_id_fkey";

-- DropForeignKey
ALTER TABLE "_PembelianToStatus" DROP CONSTRAINT "_PembelianToStatus_A_fkey";

-- DropForeignKey
ALTER TABLE "_PembelianToStatus" DROP CONSTRAINT "_PembelianToStatus_B_fkey";

-- AlterTable
ALTER TABLE "Pembelian" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pengiriman" ADD COLUMN     "status_pengiriman" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Status" ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "status_p" TEXT NOT NULL;

-- DropTable
DROP TABLE "_PembelianToStatus";
