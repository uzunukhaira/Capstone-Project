-- CreateTable
CREATE TABLE "Produk" (
    "id" SERIAL NOT NULL,
    "nama_produk" TEXT NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "stok" INTEGER NOT NULL,
    "deskripsi" TEXT,

    CONSTRAINT "Produk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "nama_supplier" TEXT NOT NULL,
    "kontak" TEXT,
    "alamat" TEXT,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pembelian" (
    "id" SERIAL NOT NULL,
    "id_produk" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "total_harga" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pembelian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengiriman" (
    "id" SERIAL NOT NULL,
    "id_produk" INTEGER NOT NULL,
    "tanggal_pengiriman" TIMESTAMP(3) NOT NULL,
    "alamat_pengiriman" TEXT NOT NULL,
    "status_pengiriman" TEXT NOT NULL,

    CONSTRAINT "Pengiriman_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pembelian" ADD CONSTRAINT "Pembelian_id_produk_fkey" FOREIGN KEY ("id_produk") REFERENCES "Produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengiriman" ADD CONSTRAINT "Pengiriman_id_produk_fkey" FOREIGN KEY ("id_produk") REFERENCES "Produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
