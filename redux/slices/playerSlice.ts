import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PlayerState = {
  isPlaying: boolean;
  tracks: string[];
  currentTrackIndex: number;
}

const initialState: PlayerState = {
  isPlaying: false,
  tracks: ['https://cdn.pixabay.com/audio/2023/10/03/audio_ff0e1ce26c.mp3'],
  currentTrackIndex: 0
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play(state) {
      state.isPlaying = !state.isPlaying;
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

export const { play, loadTracks, loadTrack } = playerSlice.actions;
export default playerSlice.reducer;
