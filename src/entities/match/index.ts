// Modelo de dominio para Match
export interface Match {
  id: string;
  users: string[];
  createdAt: Date;
  isActive: boolean;
  lastInteraction?: Date;
}

export interface MatchRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  respondedAt?: Date;
} 