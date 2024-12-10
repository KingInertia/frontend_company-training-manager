import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';

const URL = '/api/v1/quizzes/';

export const createNewQuiz = createAsyncThunk(
  'quizzes/createQuiz',
  async ({ quiz }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(URL, quiz);
      return data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(Object.values(error.response.data).join(' '));
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const getCompanyQuizzes = createAsyncThunk(
  'quizzes/getCompanyQuizzes',
  async ({ companyId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${URL}company-quizzes/`, {
        params: { company: companyId },
      });
      return data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(Object.values(error.response.data).join(' '));
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const editQuiz = createAsyncThunk(
  'quizzes/editQuiz',
  async ({ quiz, id }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`${URL}${id}/`, quiz);
      return data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(Object.values(error.response.data).join(' '));
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const removeQuiz = createAsyncThunk(
  'quizzes/removeQuiz',
  async ({ id }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${URL}${id}/`);
      return id;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(Object.values(error.response.data).join(' '));
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const getQuizInfo = createAsyncThunk(
  'quizzes/getQuizInfo',
  async ({ quiz }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${URL}quiz-info/`, {
        params: { quiz },
      });
      return data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(Object.values(error.response.data).join(' '));
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const startQuizSession = createAsyncThunk(
  'quizzes/startQuiz',
  async ({ quiz }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${URL}start-quiz/`, {
        params: { quiz },
      });
      return data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(Object.values(error.response.data).join(' '));
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const finishQuizSession = createAsyncThunk(
  'quizzes/finishQuiz',
  async ({ answers, session }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`${URL}finish-quiz/`, {
        answers,
        session,
      });
      return data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(Object.values(error.response.data).join(' '));
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
