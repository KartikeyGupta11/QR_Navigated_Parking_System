import express from "express";
import cors from "cors";
import parkingRoutes from "./modules/parking/parking.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/parking", parkingRoutes);

export default app;
