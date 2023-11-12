import { Pool, Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
 
const pool = new Pool({
    host: process.env.PGSQL_HOST,
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    database: process.env.PGSQL_DATABASE,
    port: process.env.PGSQL_PORT,
}).promise();

export async function getTasks(){
    const [rows] = await pool.query("SELECT * from tasks");
    return rows;
}

export async function getTask(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM tasks
    WHERE id = ?
    `, [id])
    return rows[0]
}

export async function createTask(task, creator) {
    const [result] = await pool.query(`
    INSERT INTO tasks (task, creator) values (?, ?)
    `, [task, creator])
    return {
        id: result.insertId,
        task,
        creator
    }
}

export async function deleteTask(taskId) {
    const [result] = await pool.query(`
    DELETE FROM tasks WHERE id = ?
    `, [taskId])
    /* return {
        id: result.insertId,
        task,
        creator
    } */
}
