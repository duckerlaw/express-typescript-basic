// import express
import express from "express";

// ทำการ import Routes มาใช้งาน
import testRoutes from "./routes/testRoutes";
import productRoutes from "./routes/productRoutes";

// create an instance of express
const app = express();

// ทำให้ express สามารถอ่าน request body จาก client ได้
app.use(express.json());

// ใช้งาน testRoutes ที่เรา import มา
app.use('/api', testRoutes);
app.use('/api',productRoutes);

// รัน server ที่ port 3000
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

export default app;
