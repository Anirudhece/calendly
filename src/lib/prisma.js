import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
// This file initializes a PrismaClient instance for interacting with the database.
// In development, it caches the client in the global scope to avoid recreating it on every request.
// In production, a new client is created for each request.
