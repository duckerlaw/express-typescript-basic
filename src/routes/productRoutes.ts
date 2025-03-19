import express from "express";
// ทำการ import class Request และ Response
// import { Request, Response } from "express";
import * as productController from "../controllers/productController";

// create an instance of express
const router = express.Router();

//GET /products ดึงสินค้าทั้งหมด
// http://localhost:3001/api/products
router.get("/products", productController.getAllProducts);

//GET /products/:id สำหรับดึงสินค้าตาม id
// http://localhost:3001/api/products/1
router.get("/products/:id", productController.getProductById);

// POST /products สำหรับเพิ่มข้อมูลสินค้าใหม่
// http://localhost:3000/api/products
router.post("/products", productController.createProduct);

// PUT /products/:id สำหรับแก้ไขข้อมูลสินค้า
// http://localhost:3000/api/products/1
router.put("/products/:id", productController.updateProduct);

// DELETE /products/:id สำหรับลบข้อมูลสินค้า
// http://localhost:3000/api/products/1
router.delete("/products/:id", productController.deleteProduct);

export default router;
