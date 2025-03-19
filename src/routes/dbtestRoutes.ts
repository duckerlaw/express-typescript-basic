import express from "express";
import { Request, Response } from "express";
import pool from "../utils/db";

const router = express.Router();

router.get("/testdb", async (_: Request, res: Response) => {
  try {
    // ทดสอบการเชื่อมต่อฐานข้อมูล
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    client.release(); // คืน connection ให้กับ pool เพื่อให้ connection สามารถใช้งานได้อีก
    
    res.status(200).json({
        message: 'Database connection successful'        
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
        message: 'Database connection failed',
        error: error
    });
  }
});

export default router;