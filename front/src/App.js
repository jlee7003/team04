import React, { useState, useEffect, useReducer, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as Api from './api';
import { loginReducer } from './reducer';
import AppLayout from './components/darkmode/AppLayout';
import Header from './components/Header';
import LoginForm from './components/user/LoginForm';
import Network from './components/user/Network';
import RegisterForm from './components/user/RegisterForm';
import Portfolio from './components/Portfolio';
import { ThemeProvider } from './components/darkmode/themeProvider';
import { GlobalStyle } from './components/darkmode/GlobalStyles';
import './styles/index.css';

import { ErrorModalContextProvider } from './components/stores/ErrorModalContext';
import ErrorModalAppLayout from './components/UI/ErrorModalAppLayout';

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);
function App() {
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const res = await Api.get('user/current');
      const currentUser = res.data;
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: currentUser,
      });

      console.log('%c sessionStorage에 토큰 있음.', 'color: #d93d1a;');
    } catch {
      console.log('%c SessionStorage에 토큰 없음.', 'color: #d93d1a;');
    }
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return 'loading...';
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Router>
          <ErrorModalContextProvider>
            <ErrorModalAppLayout>
              <ThemeProvider>
                <GlobalStyle />
                <Header />
                <div className="elice">
                  <AppLayout>
                    <Routes>
                      <Route path="/" exact element={<Portfolio />} />
                      <Route path="/login" element={<LoginForm />} />
                      <Route path="/register" element={<RegisterForm />} />
                      <Route path="/users/:userId" element={<Portfolio />} />
                      <Route path="/network" element={<Network />} />
                      <Route path="*" element={<Portfolio />} />
                    </Routes>
                  </AppLayout>
                </div>
              </ThemeProvider>
            </ErrorModalAppLayout>
          </ErrorModalContextProvider>
        </Router>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
