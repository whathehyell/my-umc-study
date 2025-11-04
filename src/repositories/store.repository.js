import { pool } from "../db.config.js";

export const checkStoreExists = async (storeId) => {
    const conn = await pool.getConnection();
    
    try {
        const [rows] = await conn.query(`SELECT id FROM store WHERE id = ?`, [storeId]);
        return rows.length > 0;
    } finally {
        conn.release();
    }
};

// ✅ 리뷰 등록
export const addReviewRepo = async (storeId, content, rating) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            `INSERT INTO review (store_id, content, rating) VALUES (?, ?, ?)`,
            [storeId, content, rating]
        );
        return result.insertId;
    } finally {
        conn.release();
    }
};
