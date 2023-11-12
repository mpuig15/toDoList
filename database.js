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
    console.log(`La task es ${taskEx}`);
    console.log(`El creator es ${creatorEx}`);
    const query = 'INSERT INTO tasks (task, creator, created) values ($1, $2, $3)';
    const values = [taskEx, creatorEx, today]
    pool.query(query, values).then(res => console.log(res))
    .catch(err => console.error(err))

    
}

export async function deleteTask(taskId) {
    await pool.query(`
    DELETE FROM tasks WHERE id = ${taskId}`);
}
