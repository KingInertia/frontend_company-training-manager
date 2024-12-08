import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

const COMPANIES_URL = '/api/v1/companies/';

export const getCompaniesList = createAsyncThunk(
  'companies/companiesList',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(COMPANIES_URL);
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

export const getCurrentCompany = createAsyncThunk(
  'companies/getCompany',
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${COMPANIES_URL}${id}/`);
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

export const updateCurrentCompany = createAsyncThunk(
  'company/updateCompany',
  async ({ updatedFields, id }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(
        `${COMPANIES_URL}${id}/`,
        updatedFields,
      );
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

export const getMyCompaniesList = createAsyncThunk(
  'companies/myCompaniesList',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${COMPANIES_URL}my-companies`);
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

export const getUserMembershipCompanies = createAsyncThunk(
  'companies/userMembershipCompanies',
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `${COMPANIES_URL}user-companies/?user=${id}`,
      );
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

export const createNewCompany = createAsyncThunk(
  'companies/createCompany',
  async ({ companyProperties }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        COMPANIES_URL,
        companyProperties,
      );
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

export const delCurrentCompany = async id => {
  try {
    await axiosInstance.delete(`${COMPANIES_URL}${id}/`);
  } catch (error) {
    throw error;
  }
};

export const isCompanyMember = async id => {
  try {
    const response = await axiosInstance.get(
      '/api/v1/company-members/member-role/',
      {
        params: { company: id },
      },
    );
    return response.data.role;
  } catch (error) {
    throw error;
  }
};

export const leaveCompany = async id => {
  try {
    const response = await axiosInstance.delete(
      '/api/v1/company-members/leave/',
      {
        data: { company: id },
      },
    );
    return response.data.detail;
  } catch (error) {
    throw error;
  }
};
