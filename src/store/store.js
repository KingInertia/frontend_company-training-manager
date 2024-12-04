import { configureStore } from '@reduxjs/toolkit';
import testStrReducer from './testStr/testStrSlice';
import authReducer from './auth/authSlice';
import userProfileReducer from './userProfile/userProfileSlice';
import usersReducer from './users/usersSlice';
import companiesReducer from './companies/companiesSlice';
import invitationsReducer from './companies/invitations/invitationsSlice';
import requestsReducer from './companies/requests/requestsSlice';
import companyMembersReducer from './companies/members/companyMembersSlice';
import snackbarReducer from './UI/snackbarSlice';

const store = configureStore({
  reducer: {
    testStr: testStrReducer,
    auth: authReducer,
    userProfile: userProfileReducer,
    users: usersReducer,
    companies: companiesReducer,
    invitations: invitationsReducer,
    requests: requestsReducer,
    companyMembers: companyMembersReducer,
    snackbar: snackbarReducer,
  },
});

export default store;
