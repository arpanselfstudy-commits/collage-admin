import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import httpsCall from '../service/httpsCall';

// Define User type to match table columns
export interface User {
  name: string;
  email: string;
  company: string;
  jobRole: string;
  jobTitle: string;
  jobType: string;
  location: string;
  experience: string;
  status: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

// Async thunk to fetch all users
export const fetchAllUsers = createAsyncThunk<User[]>('users/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await httpsCall.get('/users.json');
    const data = response.data;

    const usersArray = data ? (Object.values(data) as User[]) : [];

    return usersArray;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch users');
  }
});

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    removeUserByEmail: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.email !== action.payload);
    },
    clearUsers: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addUser, removeUserByEmail, clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
