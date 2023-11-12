import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.PGSQL_HOST,
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    database: process.env.PGSQL_DATABASE,
    port: process.env.PGSQL_PORT
}).promise();

async function deleteContent() {
    await pool.query(`
    DELETE FROM tasks;
    `)
}

async function deleteTable() {
    await pool.query(`
    DROP table tasks;
    `)
}

async function createTable() {
    await pool.query(`
    CREATE table tasks (
        id integer PRIMARY KEY SERIAL,
        task VARCHAR(255) NOT NULL,
        creator TEXT NOT NULL,
        created DATE NOT NULL DEFAULT(CURDATE())
    );
    `)
}

createTable();