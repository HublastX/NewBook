// src/utils/jwt.ts
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret"; // chave secreta
const JWT_EXPIRES_IN = "7d"; // tempo de expiração do token

// Função para gerar token
export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Função para verificar token
export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
