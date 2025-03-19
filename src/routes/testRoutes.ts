import express from "express";
// ทำการ import class Request และ Response
import { Request, Response } from "express";

// create an instance of express
const router = express.Router();

// สร้าง route ที่ path /
router.get("/", (_: Request, res: Response): void => {
  res.send("Hello World!");
});

// สร้าง route ที่ path /about
router.get("/about", (_: Request, res: Response): void => {
  res.send("About Us!");
});

// สร้าง route ที่ path /contact
router.get("/contact", (_: Request, res: Response): void => {
  res.send("Contact Us!");
});

export default router;
