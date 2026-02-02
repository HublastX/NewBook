

// __tests__/user.controller.test.ts
import { Request, Response } from 'express';
import { getUsers } from '../controllers/userController';
import { prisma } from '../prisma';

// mock do prisma
jest.mock('../prisma', () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
    },
  },
}));

describe('getUsers controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('deve retornar lista de usuários', async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([
      { id: 1, name: 'João', email: 'joao@example.com', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Maria', email: 'maria@example.com', createdAt: new Date(), updatedAt: new Date() },
    ]);

    await getUsers(req as Request, res as Response);

    expect(prisma.user.findMany).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ email: 'joao@example.com' }),
        expect.objectContaining({ email: 'maria@example.com' }),
      ])
    );
  });

  it('deve retornar erro 500 em caso de exceção', async () => {
    (prisma.user.findMany as jest.Mock).mockRejectedValue(new Error('DB error'));

    await getUsers(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao buscar usuários' });
  });
});
