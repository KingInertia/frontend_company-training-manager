import { createSlice } from '@reduxjs/toolkit';
import {
  createNewQuiz,
  getCompanyQuizzes,
  editQuiz,
  removeQuiz,
  startQuizSession,
  getQuizInfo,
  finishQuizSession,
} from './quizzesActions';

const initialState = {
  companyQuizzes: [],
  loading: false,
  error: null,
  success: false,
  currentQuiz: null,
  quizSession: null,
  quizResult: null,
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
        state.companyQuizzes.push(payload);
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
      })

      .addCase(removeQuiz.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(removeQuiz.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.companyQuizzes = state.companyQuizzes.filter(
          quiz => quiz.id !== payload,
        );
        state.success = true;
      })
      .addCase(removeQuiz.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(getQuizInfo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuizInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentQuiz = payload;
      })
      .addCase(getQuizInfo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(startQuizSession.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startQuizSession.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.quizResult = null;
        state.quizSession = payload;
      })
      .addCase(startQuizSession.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(finishQuizSession.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(finishQuizSession.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.quizResult = payload;
        state.quizSession = null;
      })
      .addCase(finishQuizSession.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default quizzesSlice.reducer;
