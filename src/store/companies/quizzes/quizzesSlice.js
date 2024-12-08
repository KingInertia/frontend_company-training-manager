import { createSlice } from '@reduxjs/toolkit';
import { createNewQuiz, getCompanyQuizzes, editQuiz } from './quizzesActions';

const initialState = {
  companyQuizzes: [],
  loading: false,
  error: null,
  success: false,
};

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getCompanyQuizzes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanyQuizzes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.companyQuizzes = payload;
      })
      .addCase(getCompanyQuizzes.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(createNewQuiz.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createNewQuiz.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createNewQuiz.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(editQuiz.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(editQuiz.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(editQuiz.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default quizzesSlice.reducer;
