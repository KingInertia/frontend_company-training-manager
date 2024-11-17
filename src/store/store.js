import { configureStore } from '@reduxjs/toolkit';
import testStrReducer from './testStr/testStrSlice';
import authReducer from './auth/authSlice';
import loginReducer from './auth/loginSlice';
import userProfileReducer from './userProfile/userProfileSlice';

const store = configureStore({
  reducer: {
    testStr: testStrReducer,
    auth: authReducer,
    login: loginReducer,
    userProfile: userProfileReducer,
  },
});

export default store;
