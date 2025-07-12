// Modelo de dominio para Message
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'audio';
  timestamp: Date;
  isRead: boolean;
  isDelivered: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
} 