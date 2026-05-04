import express from "express";
import cors from "cors";
import parkingRoutes from "./modules/parking/parking.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import adminRoutes from "./modules/admin/admin.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// app.use(cors());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   }),
// );
app.use(express.json());

app.use("/api/parking", parkingRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);

export default app;
