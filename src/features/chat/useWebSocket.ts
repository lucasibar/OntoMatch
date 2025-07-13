import { useEffect, useRef, useCallback, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  createdAt: string;
  chatId: string;
}

interface UseWebSocketProps {
  onNewMessage?: (message: Message) => void;
  onMessageNotification?: (notification: any) => void;
  onError?: (error: any) => void;
  onChatJoined?: (data: { chatId: string; success: boolean; error?: string }) => void;
}

export const useWebSocket = ({ 
  onNewMessage, 
  onMessageNotification, 
  onError,
  onChatJoined
}: UseWebSocketProps = {}) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { token } = useSelector((state: RootState) => state.auth);

  const connect = useCallback(() => {
    if (!token) {
      console.log('❌ No hay token, no se puede conectar al WebSocket');
      setIsConnected(false);
      return;
    }

    console.log('🔌 Intentando conectar al WebSocket...');
    console.log('🔑 Token disponible:', token ? 'Sí' : 'No');
    console.log('🌐 URL de conexión: http://localhost:3000');
    
    socketRef.current = io('http://localhost:3000', {
      auth: {
        token: token
      },
      transports: ['websocket', 'polling'],
      timeout: 5000,
      forceNew: true
    });

    socketRef.current.on('connect', () => {
      console.log('✅ Conectado al WebSocket exitosamente');
      console.log('🆔 Socket ID:', socketRef.current?.id);
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', (reason) => {
      console.log('❌ Desconectado del WebSocket. Razón:', reason);
      setIsConnected(false);
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('❌ Error de conexión WebSocket:', error);
      console.error('🔍 Detalles del error:', {
        message: error.message,
        type: error.name
      });
      setIsConnected(false);
      onError?.(error);
    });

    socketRef.current.on('error', (error) => {
      console.error('❌ Error general del WebSocket:', error);
      setIsConnected(false);
      onError?.(error);
    });

    socketRef.current.on('chatJoined', (data) => {
      console.log('🔗 Confirmación de unión al chat:', data);
      onChatJoined?.(data);
    });

    socketRef.current.on('newMessage', (message: Message) => {
      console.log('📨 Nuevo mensaje recibido:', message);
      onNewMessage?.(message);
    });

    socketRef.current.on('messageNotification', (notification) => {
      console.log('🔔 Notificación de mensaje:', notification);
      onMessageNotification?.(notification);
    });

    socketRef.current.on('messageError', (error) => {
      console.error('❌ Error en mensaje:', error);
      onError?.(error);
    });
  }, [token]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      console.log('Desconectando WebSocket...');
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    }
  }, []);

  const joinChat = useCallback((chatId: string) => {
    if (socketRef.current) {
      console.log(`🔗 Uniéndose al chat: ${chatId}`);
      socketRef.current.emit('joinChat', chatId);
    } else {
      console.log('❌ No hay conexión WebSocket para unirse al chat');
    }
  }, []);

  const leaveChat = useCallback((chatId: string) => {
    if (socketRef.current) {
      console.log(`🚪 Saliendo del chat: ${chatId}`);
      socketRef.current.emit('leaveChat', chatId);
    }
  }, []);

  const sendMessage = useCallback((chatId: string, content: string) => {
    if (socketRef.current) {
      console.log(`📤 Enviando mensaje al chat ${chatId}: ${content}`);
      socketRef.current.emit('sendMessage', { chatId, content });
    } else {
      console.log('❌ No hay conexión WebSocket para enviar mensaje');
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    socket: socketRef.current,
    joinChat,
    leaveChat,
    sendMessage,
    isConnected
  };
}; 