import { configureStore } from '@reduxjs/toolkit';
import testStrReducer from './testStr/testStrSlice';

const store = configureStore({
  reducer: {
    testStr: testStrReducer,
  },
});

export default store;
