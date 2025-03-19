import { Request, Response } from "express";
import * as productService from "../services/productService";

// read and show all product list
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

// read and show product by id
export const getProductById = async (req: Request, res: Response) => {
  {
    try {
      const id = parseInt(req.params.id); // อ่านค่า id จาก params
      const product = await productService.getProductById(id);
      if (product === null) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }
};

// เพิ่มข้อมูลสินค้าใหม่ โดยสร้างฟังก์ชันชื่อ createProduct
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, price } = req.body;

  try {
    const product = await productService.createProduct(name, price);
    res.status(201).json(product);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: err.message,
    });
  }
};

// สร้างฟังก์ชันชื่อ updateProduct
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;

  try {
    const product = await productService.updateProduct(id, name, price);
    res.status(200).json(product);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: err.message,
    });
  }
};

// สร้างฟังก์ชันชื่อ deleteProduct
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);

  try {
    const product = await productService.deleteProduct(id);
    res.status(200).json({
      message: "Product deleted",
      product: product,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: err.message,
    });
  }
};
