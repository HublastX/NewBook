import express, { Request, Response } from "express";
import dotenv from "dotenv";


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Rota teste
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Tudo ok" });
});



app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
