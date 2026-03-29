import { Request, Response, NextFunction } from 'express';
import { EchoService } from '../services/echo.service';

const echoService = new EchoService();

export const EchoPostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!;
        const { postId } = req.params;
        const echo = await echoService.echoPost(userId, postId);
        res.status(201).json({ message: 'Drop echoed', data: echo, success: true });
    } catch (error) { next(error); }
};

export const UndoEchoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!;
        const { echoId } = req.params;
        await echoService.undoEcho(userId, echoId);
        res.status(200).json({ message: 'Echo removed', success: true });
    } catch (error) { next(error); }
};

export const BoostPostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!;
        const { postId } = req.params;
        const { tier = 'flash', hours = 24 } = req.body;
        const post = await echoService.boostPost(userId, postId, tier, hours);
        res.status(200).json({ message: 'Signal boosted', data: post, success: true });
    } catch (error) { next(error); }
};
