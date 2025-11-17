import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });
import { PrismaClient } from "@prisma/client";

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || "umc_9th",
    password: process.env.DB_PASSWORD || "password",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    });
export const prisma = new PrismaClient({ log: ["query"] });