import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

interface SocketContextType {
    socket: Socket | null;
    connected: boolean;
}

const SocketContext = createContext<SocketContextType>({ socket: null, connected: false });

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const socketRef = useRef<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const socket = io(SOCKET_URL, {
            auth: { token },
            transports: ['websocket'],
            reconnection: true,
            reconnectionDelay: 2000,
        });

        socketRef.current = socket;

        socket.on('connect', () => setConnected(true));
        socket.on('disconnect', () => setConnected(false));

        // Real-time notification: invalidate cache + show toast
        socket.on('notification:new', (notification: any) => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['unreadNotifications'] });
            queryClient.invalidateQueries({ queryKey: ['unreadCount'] });

            const typeEmoji: Record<string, string> = {
                like: '❤️', comment: '💬', follow: '👤',
                mention: '@', reply: '↩️', message: '✉️',
            };
            const emoji = typeEmoji[notification.type] || '🔔';
            const senderName = notification.sender?.username || 'Someone';
            const messages: Record<string, string> = {
                like: `${emoji} ${senderName} liked your drop`,
                comment: `${emoji} ${senderName} commented on your drop`,
                follow: `${emoji} ${senderName} started following you`,
                mention: `${emoji} ${senderName} mentioned you`,
                reply: `${emoji} ${senderName} replied to your comment`,
                message: `${emoji} New message from ${senderName}`,
            };
            toast.info(messages[notification.type] || `${emoji} New notification`);
        });

        // Real-time message: invalidate conversation messages
        socket.on('message:new', (message: any) => {
            const convId = message.conversation?.toString?.() ?? message.conversation;
            queryClient.invalidateQueries({ queryKey: ['messages', convId] });
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        });

        // Conversation updated (e.g. new message from other user)
        socket.on('conversation:updated', () => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        });

        // Message deleted
        socket.on('message:deleted', ({ messageId: _messageId }: { messageId: string }) => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
        });

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    // Re-connect when token changes (login/logout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SocketContext.Provider value={{ socket: socketRef.current, connected }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);

export default SocketContext;
