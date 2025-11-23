import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Player {
  _id?: string;
  playerId?: number;
  playerName?: string;
  teamId?: number;
  teamAbbreviation?: string;
  age?: number;
  gp?: number;
  w?: number;
  l?: number;
  min?: number;
  pts?: number;
  reb?: number;
  ast?: number;
  stl?: number;
  blk?: number;
  tov?: number;
  fgPct?: number;
  fg3Pct?: number;
  ftPct?: number;
}

interface PlayerState {
  items: Player[];
  loading: boolean;
  error: string | null;
}

const initialState: PlayerState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchPlayers = createAsyncThunk<Player[]>(
  'players/fetch',
  async () => {
    const res = await fetch('http://localhost:3000/players');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
);

// Create
export const createPlayer = createAsyncThunk<Player, Partial<Player>>(
  'players/create',
  async (payload) => {
    const res = await fetch('http://localhost:3000/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
);

// Update
export const updatePlayer = createAsyncThunk<Player, { id: string; data: Partial<Player> }>(
  'players/update',
  async ({ id, data }) => {
    const res = await fetch(`http://localhost:3000/players/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
);

// Delete
export const deletePlayer = createAsyncThunk<string, string>(
  'players/delete',
  async (id) => {
    const res = await fetch(`http://localhost:3000/players/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return id;
  }
);

const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    clearPlayers(state) {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // fetch
      .addCase(fetchPlayers.pending, s => { s.loading = true; s.error = null; })
      .addCase(fetchPlayers.fulfilled, (s, a: PayloadAction<Player[]>) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchPlayers.rejected, (s, a) => { s.loading = false; s.error = a.error.message || 'Failed to load'; })
      // create
      .addCase(createPlayer.fulfilled, (s, a: PayloadAction<Player>) => { s.items.push(a.payload); })
      .addCase(createPlayer.rejected, (s, a) => { s.error = a.error.message || 'Create failed'; })
      // update
      .addCase(updatePlayer.fulfilled, (s, a: PayloadAction<Player>) => {
        const i = s.items.findIndex(p => p._id === a.payload._id);
        if (i !== -1) s.items[i] = a.payload;
      })
      .addCase(updatePlayer.rejected, (s, a) => { s.error = a.error.message || 'Update failed'; })
      // delete
      .addCase(deletePlayer.fulfilled, (s, a: PayloadAction<string>) => {
        s.items = s.items.filter(p => p._id !== a.payload);
      })
      .addCase(deletePlayer.rejected, (s, a) => { s.error = a.error.message || 'Delete failed'; });
  },
});

export const { clearPlayers } = playerSlice.actions;
export const playerReducer = playerSlice.reducer;

export const selectPlayers = (s: any) => s.players.items as Player[];
export const selectPlayersLoading = (s: any) => s.players.loading as boolean;
export const selectPlayersError = (s: any) => s.players.error as string | null;