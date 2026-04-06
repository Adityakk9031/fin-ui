import React, { useReducer, useEffect } from 'react';
import { AppContext } from './AppContext';
import { initialState, appReducer } from './stateReducer';

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Simulate initial "Mock API" fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Sync with localStorage if external changes happen
  useEffect(() => {
    const handleStorageChange = () => {
      // Logic could be expanded here if needed
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Using export default for the main component to satisfy strict HMR plugins
export default AppProvider;
