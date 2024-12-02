import { configureStore } from '@reduxjs/toolkit';
import testStrReducer from './testStr/testStrSlice';
import authReducer from './auth/authSlice';
import userProfileReducer from './userProfile/userProfileSlice';
import usersReducer from './users/usersSlice';
import companiesReducer from './companies/companiesSlice';
import snackbarReducer from './UI/snackbarSlice';

const store = configureStore({
  reducer: {
    testStr: testStrReducer,
    auth: authReducer,
    userProfile: userProfileReducer,
    users: usersReducer,
    companies: companiesReducer,
    snackbar: snackbarReducer,
  },
});

export default store;
