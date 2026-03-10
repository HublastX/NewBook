import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { routerBook } from "./routes/book.routes";
import { routerUser } from "./routes/user.routes";
import swaggerUi from "swagger-ui-express";
import SwaggerParser from "@apidevtools/swagger-parser";
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function startServer() {
  const swaggerDocument = await SwaggerParser.bundle(
    path.resolve(__dirname, "./docs/swagger.json")
  );

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(routerBook);
  app.use(routerUser)

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Tudo ok" });
  });

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Swagger em http://localhost:${port}/docs`);
  });
}

startServer();
