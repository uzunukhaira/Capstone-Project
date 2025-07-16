-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pembelian" ADD CONSTRAINT "Pembelian_id_fkey" FOREIGN KEY ("id") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
