import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
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
        id integer PRIMARY KEY AUTO_INCREMENT,
        task VARCHAR(255) NOT NULL,
        creator TEXT NOT NULL,
        created DATE NOT NULL DEFAULT(CURDATE())
    );
    `)
}

createTable();