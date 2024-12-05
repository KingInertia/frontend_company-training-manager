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

export const getCompanyAdmins = createAsyncThunk(
  'companies/getCompanyAdmins',
  async ({ companyId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${URL}admins/`, {
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

export const appointCompanyAdmin = async ({ companyId, userId }) => {
  try {
    await axiosInstance.patch(`${URL}appoint-admin/`, {
      company: companyId,
      user: userId,
    });
  } catch (error) {
    throw error;
  }
};

export const removeCompanyAdmin = async ({ companyId, userId }) => {
  try {
    await axiosInstance.post(`${URL}remove-admin/`, {
      company: companyId,
      user: userId,
    });
  } catch (error) {
    throw error;
  }
};
