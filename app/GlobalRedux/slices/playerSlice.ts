import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PlayerState = {
  isPlaying: boolean;
  volume: number;
  tracks: string[];
  duration: number;
  currentTime: number; 
  currentTrackIndex: number | null;
}

const initialState: PlayerState = {
  isPlaying: false,
  volume: 50,
  duration: 0,
  currentTime: 0,
  tracks: [],
  currentTrackIndex: null
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play(state) {
      state.isPlaying = true;
    },
    pause(state) {
      state.isPlaying = false;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload;
    },
    loadTracks(state, action: PayloadAction<string[]>) {
      state.tracks = action.payload;
      state.currentTrackIndex = 0;
      state.isPlaying = true;
    },
    loadTrack(state, action: PayloadAction<string>) {
      state.tracks.push(action.payload);
    }
  }
});

export const { play, pause, setVolume, loadTracks, loadTrack, setCurrentTime, setDuration } = playerSlice.actions;
export default playerSlice.reducer;
