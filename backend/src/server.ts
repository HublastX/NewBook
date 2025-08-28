import express from "express";
import userRoutes from './routes/User.routes';
import dotenv from 'dotenv';
import bookRoutes from "./routes/bookRoutes";

dotenv.config();

const app = express();
const port = 4004;


app.use(express.json());

app.use('/api', userRoutes);
app.use("/books", bookRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})