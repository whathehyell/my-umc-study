import { pool } from "../db.config.js";

export const addStoreToRegionRepo = async (regionId, name, address) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            `INSERT INTO store (name, address, region_id) VALUES (?, ?, ?)`,
            [name, address, regionId]
        );
        return result.insertId;
    } finally {
        conn.release();
    }
};
