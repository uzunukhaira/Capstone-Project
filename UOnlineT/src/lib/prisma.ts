// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Membuat instance PrismaClient
const prisma = new PrismaClient();

// Mengekspor PrismaClient untuk digunakan di file lain
export default prisma;
