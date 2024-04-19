// src/redux/slices/filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define initial state for filter
const initialFilterState = '';

// Create slice for filter
export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilterState,
  reducers: {
    setFilter(state, action) {
      console.log('Setting filter:', action.payload); // Debugging line
      return action.payload;
    },
  },
});

// Export actions
export const { setFilter } = filterSlice.actions;