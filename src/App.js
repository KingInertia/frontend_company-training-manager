import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import PrivateRoute from './utils/router/PrivateRoute';

const StartPage = lazy(() => import('./components/Pages/StartPage'));
const AboutPage = lazy(() => import('./components/Pages/AboutPage'));
const UsersProfilePage = lazy(
  () => import('./components/Pages/UsersProfilePage'),
);
const CompanyProfilePage = lazy(
  () => import('./components/Pages/CompanyProfilePage'),
);
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const NotFound = lazy(() => import('./components/Pages/NotFound'));
const UsersPage = lazy(() => import('./components/Pages/UsersPage'));
const CompaniesPage = lazy(() => import('./components/Pages/CompaniesPage'));
const LoginPage = lazy(
  () => import('./components/Pages/Authorization/LoginPage'),
);
const RegistrationPage = lazy(
  () => import('./components/Pages/Authorization/RegistrationPage'),
);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<StartPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/users" element={<UsersPage />} />
                <Route path="/companies" element={<CompaniesPage />} />

                <Route path="/users/:slug" element={<UsersProfilePage />} />
                <Route
                  path="/companies/:slug"
                  element={<CompanyProfilePage />}
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
