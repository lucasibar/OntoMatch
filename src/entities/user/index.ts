// Modelo de dominio para User
export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  bio?: string;
  photos: string[];
  interests: string[];
  location: {
    latitude: number;
    longitude: number;
    city: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  isOnline: boolean;
  lastSeen: Date;
  distance?: number;
} 