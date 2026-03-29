import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/helpers/jwt.helper';
import { UserRepository } from '../repositories/user.repository';
import { ForbiddenError, UnauthorizedError } from '../utils/errors/app.error';

const userRepository = new UserRepository();

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: string;
        }
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'] as string;

    if (!token) {
        throw new UnauthorizedError('No auth token provided');
    }

    const decoded = verifyJWT(token);

    if (!decoded) {
        throw new ForbiddenError('Invalid or expired auth token');
    }

    const user = await userRepository.getUserById(decoded.id);

    if (!user) {
        throw new ForbiddenError('User not found');
    }

    req.user = user._id.toString();
    next();
};

export const authMiddleware = isAuthenticated;

export const optionalAuthMiddleware = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers['x-access-token'] as string;
    if (token) {
        try {
            const decoded = verifyJWT(token);
            if (decoded) {
                const user = await userRepository.getUserById(decoded.id);
                if (user) { req.user = user._id.toString(); }
            }
        } catch (_) { /* ignore */ }
    }
    next();
};
