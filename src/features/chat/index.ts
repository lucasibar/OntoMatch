// Funcionalidades de chat (Inbox, WebSocket, mensajes)
export const chatSlice = {
  // Aquí irá el slice de Redux para chat
};

export const useChat = () => {
  // Hook personalizado para chat
  return {
    conversations: [],
    currentConversation: null,
    sendMessage: () => {},
    receiveMessage: () => {},
  };
}; 