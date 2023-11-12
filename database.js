import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
 
const pool = new pg.Pool({
    host: process.env.PGSQL_HOST,
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    database: process.env.PGSQL_DATABASE,
    port: process.env.PGSQL_PORT,
});

export async function getTasks(){
    console.log('I am here!')
    const rows = await pool.query("SELECT * from tasks;");
    console.log(rows.rows)
    return rows.rows;
}

export async function getTask(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM tasks
    WHERE id = ?
    `, [id])
    return rows[0]
}

export async function createTask(taskEx, creatorEx) {
    const today = new Date().toLocaleDateString();
    console.log(today);
    await pool.query(`
    INSERT INTO tasks (task, creator, created) values (${taskEx}, ${creatorEx}, ${today})`)
    
}

export async function deleteTask(taskId) {
    const [result] = await pool.query(`
    DELETE FROM tasks WHERE id = ${taskId}`);
}
