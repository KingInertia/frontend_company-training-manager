import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';

const URL = '/api/v1/company-members/';

export const getCompanyMembers = createAsyncThunk(
  'companies/fetchCompanyMembers',
  async ({ companyId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${URL}members/`, {
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

export const kickCompanyMember = async ({ companyId, userId }) => {
  try {
    await axiosInstance.delete(`${URL}kick/`, {
      data: { company: companyId, user: userId },
    });
  } catch (error) {
    throw error;
  }
};
