import { configureStore } from '@reduxjs/toolkit';
import testStrReducer from './testStr/testStrSlice';
import authReducer from './auth/authSlice';
import userProfileReducer from './userProfile/userProfileSlice';
import userReducer from './users/userSlice';
import usersReducer from './users/usersSlice';

const store = configureStore({
  reducer: {
    testStr: testStrReducer,
    auth: authReducer,
    userProfile: userProfileReducer,
    user: userReducer,
    users: usersReducer,
  },
});

export default store;
