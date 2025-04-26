import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the Event type directly in the eventSlice file
interface Event {
    _id: string;
    name: string;
    category: string;
    date: string;  // You can add other fields as necessary
  }
  
  interface EventState {
    events: Event[];
    totalPages: number;
    currentPage: number;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: EventState = {
    events: [],
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
  };
  

// Fetch events with pagination, sorting, and filtering
export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async ({ page, limit, sortBy, category }: { page: number, limit: number, sortBy: string, category: string }) => {
    const response = await axios.get('http://localhost:5000/events', {
      params: {
        page,
        limit,
        sortBy
      }
    });
    return response.data;
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload.events;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch events';
      });
  }
});

export default eventSlice.reducer;
