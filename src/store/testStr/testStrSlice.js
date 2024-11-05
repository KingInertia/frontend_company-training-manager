import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  strValue: 'test1',
};

const testStrSlice = createSlice({
  name: 'testStr',
  initialState: initialState,
  reducers: {
    setStrValue: (state, action) => {
      state.strValue = action.payload;
    },
  },
});

export const { setStrValue } = testStrSlice.actions;
export default testStrSlice.reducer;
