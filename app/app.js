const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'StrongPassword123!',
  database: process.env.DB_NAME || 'appdb',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
        <h1 style="color: #2c3e50;">BÁO CÁO BÀI TẬP LỚN TRIỂN KHAI HỆ THỐNG</h1>
        <h2 style="color: #27ae60;">Sinh viên: Giáp Văn Hiếu - MSSV: DTC245200651</h2>
        <p style="font-size: 18px;">Status: <strong>Kết nối Database PostgreSQL thành công!</strong></p>
        <p>Thời gian hệ thống DB: <code>${result.rows[0].now}</code></p>
      </div>
    `);
  } catch (err) {
    res.status(500).send('Lỗi kết nối Database: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`Web app running on port ${port}`);
});
