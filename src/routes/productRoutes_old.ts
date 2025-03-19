import express from "express";
// ทำการ import class Request และ Response
import { Request, Response } from "express";

// create an instance of express
const router = express.Router();

// กำหนด interface สำหรับ product

interface Product {
  id: string;
  name: string;
  price: number;
}

// สร้างตัวแปรชนิด array ที่มีข้อมูลเป็น object
const products: Product[] = [];

//GET /products ดึงสินค้าทั้งหมด

router.get("/products", (_: Request, res: Response): void => {
  res.json(products);
});

//GET /products/:id ดึงสินค้าตาม id
router.get("/products/:id", (req: Request, res: Response): void => {
  // console.log(req.params.id);
  // รับค่า id จาก params
  const id = req.params.id; // parseInt แปลง string เป็น number
  // ค้นหาข้อมูลจาก array ตาม id ที่รับมา
  const product = products.find((product) => product.id === id);

  // ถ้าไม่พบข้อมูลให้ส่ง status code 404 กลับไป
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  // ส่ง response กลับไปที่ client
  res.json(product);
});

// POST /products เพิ่มสินค้าใหม่
router.post("/products", (req: Request, res: Response): void => {
  // รับค่า request body จาก client
  if (!req.body) {
    res.status(400).json({ message: "Missing request body" });
    return;
  }
  const { id, name, price } = req.body;

  // ถ้าไม่มีข้อมูลให้ส่ง status code 400 กลับไปที่ client
  if (!id || !name || !price) {
    res
      .status(400)
      .json({ message: "Missing require fields: id, name, price" });
    return;
  }

  // เพิ่มข้อมูลใหม่ลงใน array
  products.push({ id, name, price });
  // ส่ง response กลับไปที่ client
  res.json({ message: "Product added successfully" });
});

// PUT /products/:id แก้ไขข้อมูลสินค้า
router.put("/products/:id", (req: Request, res: Response): void => {
  // รับค่า id จาก params
  const id = req.params.id;
  // รับค่า request body จาก client
  if (!req.body) {
    res.status(400).json({ message: "Missing request body" });
    return;
  }
  // รับค่า request body จาก client
  const { name, price } = req.body;
  // ค้นหาข้อมูลจาก array ตาม id ที่รับมา
  const product = products.find((product) => product.id === id);

  // ถ้าไม่พบข้อมูลให้ส่ง status code 404 กลับไป
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  // แก้ไขข้อมูลใน array
  product.name = name;
  product.price = price;
  // ส่ง response กลับไปที่ client
  res.json({ message: "Product updated successfully" });
});

// DELETE /products/:id ลบข้อมูลสินค้า
router.delete("/products/:id", (req: Request, res: Response): void => {
  // รับค่า id จาก params
  const id = req.params.id;
  // ค้นหาข้อมูลจาก array ตาม id ที่รับมา
  const productIndex = products.findIndex((product) => product.id === id);
  // ถ้าไม่พบข้อมูลให้ส่ง status code 404 กลับไป
  if (productIndex === -1) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  // ลบข้อมูลใน array ตาม index ที่ค้นหาได้
  products.splice(productIndex, 1);
  // ส่ง response กลับไปที่ client
  res.json({ message: "Product deleted successfully" });
});

export default router;
