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

export const addMissionRepo = async (storeId, title, description, point, deadline) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            `INSERT INTO mission (store_id, title, description, point, deadline) VALUES (?, ?, ?, ?, ?)`,
            [storeId, title, description, point, deadline]
        );
        return result.insertId;
    } finally {
        conn.release();
    }
};
export const checkMissionExists = async (missionId) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT id FROM mission WHERE id = ?`, [missionId]);
        return rows.length > 0;
    } finally {
        conn.release();
    }
};

export const checkAlreadyChallenged = async (userId, missionId) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(
            `SELECT id FROM user_mission WHERE user_id = ? AND mission_id = ? AND status = 'ONGOING'`,
            [userId, missionId]
        );
    return rows.length > 0;
} finally {
    conn.release();
}
};

// ✅ 도전 추가
export const addUserMissionRepo = async (userId, missionId) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            `INSERT INTO user_mission (user_id, mission_id) VALUES (?, ?)`,
            [userId, missionId]
        );
        return result.insertId;
    } finally {
        conn.release();
    }
};
