import { Server, Socket } from 'socket.io';
import { verifyJWT } from '../utils/helpers/jwt.helper';

let io: Server | null = null;

// Map of userId -> Set of socketIds (a user can have multiple tabs open)
const userSockets = new Map<string, Set<string>>();

export const initSocket = (httpServer: any): Server => {
    io = new Server(httpServer, {
        cors: {
            origin: ['http://localhost:5173', 'http://localhost:3000'],
            credentials: true,
        },
    });

    io.use((socket: Socket, next) => {
        const token = socket.handshake.auth?.token || socket.handshake.headers['x-access-token'];
        if (!token) return next(new Error('Authentication error'));
        const payload = verifyJWT(token as string);
        if (!payload) return next(new Error('Invalid token'));
        (socket as any).userId = (payload as any).id;
        next();
    });

    io.on('connection', (socket: Socket) => {
        const userId: string = (socket as any).userId;

        // Track socket -> user mapping
        if (!userSockets.has(userId)) {
            userSockets.set(userId, new Set());
        }
        userSockets.get(userId)!.add(socket.id);

        // Join a personal room
        socket.join(`user:${userId}`);

        socket.on('disconnect', () => {
            const sockets = userSockets.get(userId);
            if (sockets) {
                sockets.delete(socket.id);
                if (sockets.size === 0) userSockets.delete(userId);
            }
        });

        // Typing indicators for messages
        socket.on('typing:start', ({ conversationId }: { conversationId: string }) => {
            socket.to(`conv:${conversationId}`).emit('typing:start', { userId, conversationId });
        });

        socket.on('typing:stop', ({ conversationId }: { conversationId: string }) => {
            socket.to(`conv:${conversationId}`).emit('typing:stop', { userId, conversationId });
        });

        socket.on('join:conversation', ({ conversationId }: { conversationId: string }) => {
            socket.join(`conv:${conversationId}`);
        });

        socket.on('leave:conversation', ({ conversationId }: { conversationId: string }) => {
            socket.leave(`conv:${conversationId}`);
        });
    });

    return io;
};

export const getIO = (): Server | null => io;

export const emitToUser = (userId: string, event: string, data: any): void => {
    io?.to(`user:${userId}`).emit(event, data);
};

export const emitToConversation = (conversationId: string, event: string, data: any): void => {
    io?.to(`conv:${conversationId}`).emit(event, data);
};
