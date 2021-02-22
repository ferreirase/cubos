import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iad: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError({
      message: 'JWT token is missing',
      statusCode: 400,
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    // forçando um tipo de uma variável pela interface acima
    const { sub } = decodedToken as TokenPayload;

    // incluindo o id do usuário em todas as rotas depois do middleware
    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError({
      message: 'JWT token invalid',
      statusCode: 400,
    });
  }
}
