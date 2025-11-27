// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  // Verifica se o header existe e começa com "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Valida o token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    // Guarda o userId dentro da requisição para usar nos controllers
    (req as any).userId = decoded.userId;

    next(); // segue para a rota
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
