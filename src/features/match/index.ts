// Funcionalidades de matching (Swipe, perfiles, lógica de like)
export { default as matchSlice } from './matchSlice';
export { default as SwipeList } from './SwipeList';

export const useMatch = () => {
  // Hook personalizado para matching
  return {
    profiles: [],
    currentProfile: null,
    like: () => {},
    dislike: () => {},
  };
}; 