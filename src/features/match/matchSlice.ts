import { createSlice } from '@reduxjs/toolkit';

interface MatchState {
  potentialMatches: { id: string; name: string; bio: string }[];
}

const initialState: MatchState = {
  potentialMatches: [
    { id: '1', name: 'Sofía', bio: 'Coach ontológica de Buenos Aires' },
    { id: '2', name: 'Lucía', bio: 'Coach de vida con alma viajera' },
  ],
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {},
});

export default matchSlice.reducer; 