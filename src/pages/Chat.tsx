import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Avatar, 
  Button,
  CircularProgress,
  TextField,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetChatQuery, useGetChatByMatchIdQuery } from '../features/chat/chatApi';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useWebSocket } from '../features/chat/useWebSocket';

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  createdAt: string;
}

const ChatPage = () => {
  const { chatId, matchId } = useParams<{ chatId?: string; matchId?: string }>();
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Usar el hook apropiado según si tenemos chatId o matchId
  const { data: chatById, isLoading: isLoadingById, isError: isErrorById } = useGetChatQuery(chatId!, { skip: !chatId });
  const { data: chatByMatchId, isLoading: isLoadingByMatchId, isError: isErrorByMatchId } = useGetChatByMatchIdQuery(matchId!, { skip: !matchId });

  const chat = chatId ? chatById : chatByMatchId;
  const isLoading = chatId ? isLoadingById : isLoadingByMatchId;
  const isError = chatId ? isErrorById : isErrorByMatchId;

  // WebSocket hook
  const { joinChat, leaveChat, sendMessage: sendWebSocketMessage, isConnected } = useWebSocket({
    onNewMessage: (newMessage) => {
      console.log('📨 Nuevo mensaje recibido en tiempo real:', newMessage);
      setMessages(prev => {
        // Verificar si es un mensaje temporal que debemos reemplazar
        const tempMessageIndex = prev.findIndex(msg => 
          msg.id.startsWith('temp-') && 
          msg.content === newMessage.content && 
          msg.senderId === newMessage.senderId
        );

        let updatedMessages;
        if (tempMessageIndex !== -1) {
          // Reemplazar mensaje temporal con el real
          console.log('🔄 Reemplazando mensaje temporal con mensaje real');
          updatedMessages = [...prev];
          updatedMessages[tempMessageIndex] = newMessage;
        } else {
          // Verificar si el mensaje ya existe para evitar duplicados
          const exists = prev.find(msg => msg.id === newMessage.id);
          if (exists) {
            return prev;
          }
          // Agregar el nuevo mensaje
          updatedMessages = [...prev, newMessage];
        }

        // Ordenar por fecha
        return updatedMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      });
    },
    onError: (error) => {
      console.error('Error de WebSocket:', error);
    },
    onChatJoined: (data) => {
      if (data.success) {
        console.log(`✅ Unido exitosamente al chat ${data.chatId}`);
      } else {
        console.error(`❌ Error al unirse al chat: ${data.error}`);
      }
    }
  });

  // Debugging del estado (solo cuando cambian valores importantes)
  useEffect(() => {
    console.log('🔍 Estado actual:', {
      isConnected,
      currentChatId,
      messagesCount: messages.length,
      user: user?.name,
      token: token ? 'Presente' : 'Ausente'
    });
  }, [isConnected, currentChatId, messages.length, user?.name, token]);

  // Debugging específico del input (solo cuando cambia la conexión)
  useEffect(() => {
    console.log('📝 Estado del input:', {
      isConnected,
      inputDisabled: !isConnected,
      canSend: message.trim() && isConnected
    });
  }, [isConnected]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (chat?.id) {
      setCurrentChatId(chat.id);
    }
  }, [chat?.id]);

  useEffect(() => {
    if (chat?.messages) {
      console.log('📋 Cargando mensajes del chat:', chat.messages);
      // Ordenar mensajes por fecha de creación
      const sortedMessages = [...chat.messages].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setMessages(sortedMessages);
    }
  }, [chat?.messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (currentChatId && isConnected) {
      joinChat(currentChatId);
    }

    return () => {
      if (currentChatId) {
        leaveChat(currentChatId);
      }
    };
  }, [currentChatId, isConnected]);

  const handleSendMessage = async () => {
    if (!message.trim() || !currentChatId) return;

    try {
      const messageContent = message.trim();
      console.log(`📤 Enviando mensaje: "${messageContent}" al chat ${currentChatId}`);
      
      // Crear un mensaje temporal para mostrar inmediatamente
      const tempMessage: Message = {
        id: `temp-${Date.now()}`,
        content: messageContent,
        senderId: user?.id || '',
        senderName: user?.name || '',
        createdAt: new Date().toISOString()
      };

      // Agregar el mensaje temporal al estado inmediatamente
      setMessages(prev => {
        const updatedMessages = [...prev, tempMessage];
        return updatedMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      });

      // Limpiar el input
      setMessage('');
      
      // Enviar mensaje por WebSocket
      sendWebSocketMessage(currentChatId, messageContent);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBackToMatches = () => {
    navigate('/matches');
  };

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !chat) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body1" color="error">
          Error al cargar el chat
        </Typography>
        <Button onClick={handleBackToMatches} sx={{ mt: 2 }}>
          Volver a Matches
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header del chat */}
      <AppBar position="static">
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={handleBackToMatches}
            sx={{ mr: 2 }}
          >
            ←
          </IconButton>
          <Avatar
            src={chat.otherUser.profilePhoto}
            alt={chat.otherUser.name}
            sx={{ mr: 2 }}
          >
            {!chat.otherUser.profilePhoto && chat.otherUser.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">
              {chat.otherUser.name}
            </Typography>
            <Chip 
              label={isConnected ? 'En línea' : 'Desconectado'} 
              size="small" 
              color={isConnected ? 'success' : 'default'}
              variant="outlined"
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Área de mensajes */}
      <Box sx={{ 
        flexGrow: 1, 
        overflow: 'auto', 
        p: 2, 
        bgcolor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {messages.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            mt: 4,
            color: 'text.secondary'
          }}>
            <Typography variant="h6" gutterBottom>
              ¡Empieza la conversación!
            </Typography>
            <Typography variant="body2">
              Escribe un mensaje para romper el hielo
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {messages.map((msg) => {
              const isOwnMessage = msg.senderId === user?.id;
              return (
                <Box
                  key={msg.id}
                  sx={{
                    display: 'flex',
                    justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                    mb: 1
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isOwnMessage ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        bgcolor: isOwnMessage ? 'primary.main' : 'white',
                        color: isOwnMessage ? 'white' : 'text.primary',
                        borderRadius: 2,
                        wordBreak: 'break-word',
                        position: 'relative'
                      }}
                    >
                      <Typography variant="body1" sx={{ mb: 0.5 }}>
                        {msg.content}
                      </Typography>
                    </Paper>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        mt: 0.5,
                        opacity: 0.7,
                        fontSize: '0.75rem'
                      }}
                    >
                      {formatMessageTime(msg.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
            <div ref={messagesEndRef} />
          </Box>
        )}
      </Box>

      {/* Área de input */}
      <Box sx={{ 
        p: 2, 
        bgcolor: 'white', 
        borderTop: 1, 
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        {/* Debug info */}
        <Box sx={{ 
          p: 1, 
          bgcolor: '#f0f0f0', 
          borderRadius: 1, 
          fontSize: '0.8rem',
          fontFamily: 'monospace'
        }}>
          Estado: {isConnected ? '✅ Conectado' : '❌ Desconectado'} | 
          Chat: {currentChatId || 'No asignado'} | 
          Input: "{message}" ({message.length} chars) |
          Mensajes: {messages.length}
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={message}
            onChange={(e) => {
              console.log('📝 Input cambiado:', e.target.value);
              setMessage(e.target.value);
            }}
            onKeyPress={handleKeyPress}
            placeholder="Escribe un mensaje..."
            variant="outlined"
            size="small"
            disabled={!isConnected}
            sx={{ 
              '& .MuiInputBase-root': {
                backgroundColor: isConnected ? 'white' : '#f5f5f5'
              }
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              console.log('🔘 Botón Enviar clickeado');
              handleSendMessage();
            }}
            disabled={!message.trim() || !isConnected}
            sx={{ minWidth: 80 }}
          >
            Enviar
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              if (currentChatId) {
                console.log('🧪 Enviando mensaje de prueba...');
                sendWebSocketMessage(currentChatId, `Mensaje de prueba - ${new Date().toLocaleTimeString()}`);
              }
            }}
            disabled={!isConnected}
            sx={{ minWidth: 80 }}
          >
            Prueba
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              console.log('🔄 Forzando reconexión...');
              window.location.reload();
            }}
            sx={{ minWidth: 80 }}
            color="warning"
          >
            Reconectar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage; 